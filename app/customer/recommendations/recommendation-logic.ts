import type { CustomerCar } from "../../components/auth";
import { createSupabaseBrowserClient } from "../../lib/supabase/client";

export type RecommendationKind = "oil" | "part";

export type RecommendationRow = {
  id: string;
  kind: RecommendationKind;
  make: string | null;
  model: string | null;
  year_from: number | null;
  year_to: number | null;
  km_from: number | null;
  km_to: number | null;
  title: string;
  details: string | null;
  url: string | null;
  priority: number | null;
};

export type RecommendationItem = RecommendationRow & {
  source: "database" | "fallback";
};

type CarSelection = Pick<CustomerCar, "make" | "model" | "year" | "km">;
type Translate = (key: string, options?: Record<string, unknown>) => string;

type FallbackRule = {
  id: string;
  kind: RecommendationKind;
  minKm: number;
  maxKm: number | null;
  priority: number;
};

type PersistedValue<T> = {
  timestamp: number;
  value: T;
};

type QueryResponse<T> = {
  data: T[] | null;
  error: unknown;
};

const FALLBACK_RULES: FallbackRule[] = [
  { id: "firstOilService", kind: "oil", minKm: 0, maxKm: 14999, priority: 42 },
  { id: "initialInspection", kind: "part", minKm: 0, maxKm: 14999, priority: 34 },
  { id: "regularOilService", kind: "oil", minKm: 15000, maxKm: 39999, priority: 50 },
  { id: "airAndCabinFilter", kind: "part", minKm: 15000, maxKm: 39999, priority: 44 },
  { id: "brakeCheck", kind: "part", minKm: 15000, maxKm: 39999, priority: 40 },
  { id: "syntheticOilRefresh", kind: "oil", minKm: 40000, maxKm: 69999, priority: 58 },
  { id: "ignitionAndFilters", kind: "part", minKm: 40000, maxKm: 69999, priority: 49 },
  { id: "brakeFluidCheck", kind: "part", minKm: 40000, maxKm: 69999, priority: 47 },
  { id: "highMileageOilService", kind: "oil", minKm: 70000, maxKm: 99999, priority: 62 },
  { id: "coolingAndTransmission", kind: "part", minKm: 70000, maxKm: 99999, priority: 54 },
  { id: "suspensionCheck", kind: "part", minKm: 70000, maxKm: 99999, priority: 50 },
  { id: "highMileageOilService", kind: "oil", minKm: 100000, maxKm: null, priority: 66 },
  { id: "timingAndBelts", kind: "part", minKm: 100000, maxKm: null, priority: 58 },
  { id: "batteryAndSuspension", kind: "part", minKm: 100000, maxKm: null, priority: 56 },
];

let cachedPartRecommendations: RecommendationRow[] | null = null;
let partRecommendationsPromise: Promise<RecommendationRow[]> | null = null;

const PART_RECOMMENDATIONS_CACHE_KEY = "sayarati.cache.part-recommendations";
const PART_RECOMMENDATIONS_MAX_AGE_MS = 30 * 60 * 1000;

function normalizeValue(value: string | null) {
  return value?.trim().toLowerCase() ?? "";
}

function readPersistedValue<T>(key: string, maxAgeMs: number) {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.sessionStorage.getItem(key);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as PersistedValue<T>;
    if (!parsed?.timestamp || Date.now() - parsed.timestamp > maxAgeMs) {
      window.sessionStorage.removeItem(key);
      return null;
    }

    return parsed.value;
  } catch {
    return null;
  }
}

function writePersistedValue<T>(key: string, value: T) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const payload: PersistedValue<T> = {
      timestamp: Date.now(),
      value,
    };
    window.sessionStorage.setItem(key, JSON.stringify(payload));
  } catch {
    // Ignore persistence failures and keep using the in-memory cache.
  }
}

function inKmRange(km: number, minKm: number, maxKm: number | null) {
  if (km < minKm) return false;
  if (maxKm != null && km > maxKm) return false;
  return true;
}

function formatKmRange(rule: FallbackRule, t: Translate) {
  const unit = t("units.km");
  if (rule.maxKm == null) {
    return t("customer.recommendations.fallback.range.from", {
      from: rule.minKm,
      unit,
    });
  }

  return t("customer.recommendations.fallback.range.between", {
    from: rule.minKm,
    to: rule.maxKm,
    unit,
  });
}

function buildFallbackRecommendation(
  rule: FallbackRule,
  selection: CarSelection,
  t: Translate,
): RecommendationItem {
  return {
    id: `fallback-${rule.id}-${rule.minKm}`,
    kind: rule.kind,
    make: selection.make,
    model: selection.model,
    year_from: null,
    year_to: null,
    km_from: rule.minKm,
    km_to: rule.maxKm,
    title: t(`customer.recommendations.fallback.items.${rule.id}.title`, {
      make: selection.make,
      model: selection.model,
    }),
    details: t(`customer.recommendations.fallback.items.${rule.id}.details`, {
      make: selection.make,
      model: selection.model,
      year: selection.year,
      mileage: selection.km,
      unit: t("units.km"),
      range: formatKmRange(rule, t),
    }),
    url: null,
    priority: rule.priority,
    source: "fallback",
  };
}

function dedupeRecommendations(items: RecommendationItem[]) {
  const seen = new Set<string>();
  const result: RecommendationItem[] = [];

  for (const item of items) {
    const key = `${item.kind}:${normalizeValue(item.title)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(item);
  }

  return result;
}

export function matchesSelection(row: RecommendationRow, selection: CarSelection) {
  if (row.make && normalizeValue(row.make) !== normalizeValue(selection.make)) return false;
  if (row.model && normalizeValue(row.model) !== normalizeValue(selection.model)) return false;

  const year = Number(selection.year);
  if (Number.isFinite(year)) {
    if (row.year_from != null && year < row.year_from) return false;
    if (row.year_to != null && year > row.year_to) return false;
  }

  if (row.km_from != null && selection.km < row.km_from) return false;
  if (row.km_to != null && selection.km > row.km_to) return false;

  return true;
}

export function buildFallbackRecommendations(selection: CarSelection, t: Translate) {
  return FALLBACK_RULES
    .filter((rule) => inKmRange(selection.km, rule.minKm, rule.maxKm))
    .map((rule) => buildFallbackRecommendation(rule, selection, t))
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
}

export function getRecommendationGroups(
  rows: RecommendationRow[],
  selection: CarSelection,
  t: Translate,
) {
  const matchedRows: RecommendationItem[] = rows
    .filter((row) => matchesSelection(row, selection))
    .map((row) => ({ ...row, source: "database" as const }));

  const fallbackRows = buildFallbackRecommendations(selection, t);
  const all = dedupeRecommendations(
    [...matchedRows, ...fallbackRows].sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0)),
  );

  return {
    all,
    oils: all.filter((item) => item.kind === "oil"),
    parts: all.filter((item) => item.kind === "part"),
  } as const;
}

export async function getPartRecommendations() {
  if (cachedPartRecommendations) {
    return cachedPartRecommendations;
  }

  const persisted = readPersistedValue<RecommendationRow[]>(
    PART_RECOMMENDATIONS_CACHE_KEY,
    PART_RECOMMENDATIONS_MAX_AGE_MS,
  );
  if (persisted) {
    cachedPartRecommendations = persisted;
    return cachedPartRecommendations;
  }

  if (!partRecommendationsPromise) {
    const supabase = createSupabaseBrowserClient();
    partRecommendationsPromise = supabase
      .from("recommendations")
      .select("id, kind, make, model, year_from, year_to, km_from, km_to, title, details, url, priority")
      .eq("kind", "part")
      .then((response: QueryResponse<RecommendationRow>) => {
        const { data, error } = response;
        if (error) {
          throw error;
        }

        cachedPartRecommendations = (data ?? []) as RecommendationRow[];
        writePersistedValue(PART_RECOMMENDATIONS_CACHE_KEY, cachedPartRecommendations);
        return cachedPartRecommendations;
      })
      .finally(() => {
        partRecommendationsPromise = null;
      });
  }

  return partRecommendationsPromise!;
}
