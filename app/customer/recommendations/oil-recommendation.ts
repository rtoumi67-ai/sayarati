"use client";

import { createSupabaseBrowserClient } from "../../lib/supabase/client";

export type RecommendedOil = {
  brand: string | null;
  product_name: string | null;
  viscosity: string | null;
  image_url: string | null;
  explanation: string;
};

type VehicleSelection = {
  make: string;
  model: string;
  year: string | number;
};

export type VehicleCatalog = Record<string, string[]>;

type PersistedValue<T> = {
  timestamp: number;
  value: T;
};

type VehicleRow = {
  make: string | null;
  model: string | null;
  year: number | null;
  created_at?: string | null;
};

type QueryResponse<T> = {
  data: T[] | null;
  error: unknown;
};

let cachedVehicleCatalog: VehicleCatalog | null = null;
let vehicleCatalogPromise: Promise<VehicleCatalog> | null = null;
let cachedOilRows: OilRow[] | null = null;
let oilRowsPromise: Promise<OilRow[]> | null = null;

const VEHICLE_CATALOG_CACHE_KEY = "sayarati.cache.vehicle-catalog";
const VEHICLE_CATALOG_MAX_AGE_MS = 24 * 60 * 60 * 1000;
const OIL_ROWS_CACHE_KEY = "sayarati.cache.oil-rows";
const OIL_ROWS_MAX_AGE_MS = 60 * 60 * 1000;

function normalizeValue(value: string) {
  return value.trim().toLowerCase();
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

export async function getAvailableVehicleCatalog() {
  if (cachedVehicleCatalog) {
    return cachedVehicleCatalog;
  }

  const persisted = readPersistedValue<VehicleCatalog>(
    VEHICLE_CATALOG_CACHE_KEY,
    VEHICLE_CATALOG_MAX_AGE_MS,
  );
  if (persisted) {
    cachedVehicleCatalog = persisted;
    return cachedVehicleCatalog;
  }

  if (!vehicleCatalogPromise) {
    const supabase = createSupabaseBrowserClient();
    vehicleCatalogPromise = supabase
      .from("vehicles")
      .select("make, model")
      .order("make", { ascending: true })
      .order("model", { ascending: true })
      .then((response: QueryResponse<Pick<VehicleRow, "make" | "model">>) => {
        const { data, error } = response;
        if (error) {
          throw error;
        }

        const catalog: VehicleCatalog = {};

        for (const row of ((data ?? []) as Array<Pick<VehicleRow, "make" | "model">>)) {
          const make = row.make ? normalizeValue(row.make) : "";
          const model = row.model ? normalizeValue(row.model) : "";
          if (!make || !model) continue;

          catalog[make] ??= [];
          if (!catalog[make].includes(model)) {
            catalog[make].push(model);
          }
        }

        cachedVehicleCatalog = catalog;
        writePersistedValue(VEHICLE_CATALOG_CACHE_KEY, cachedVehicleCatalog);
        return catalog;
      })
      .finally(() => {
        vehicleCatalogPromise = null;
      });
  }

  return vehicleCatalogPromise!;
}

type OilRuleResult = {
  preferredViscosities: string[];
  explanation: string;
};

type OilRow = Omit<RecommendedOil, "explanation"> & {
  id: string;
  is_featured?: boolean | null;
};

function isDieselModel(model: string) {
  const normalized = normalizeValue(model);
  return ["diesel", "tdi", "hdi", "dci", "cdi", "crdi", "td", "bluehdi"].some((token) =>
    normalized.includes(token),
  );
}

function getOilRule(makeValue: string, selection: VehicleSelection): OilRuleResult {
  const make = normalizeValue(makeValue);
  const model = normalizeValue(selection.model);
  const parsedYear =
    typeof selection.year === "number" ? selection.year : Number.parseInt(selection.year, 10);
  const isOldCar = Number.isFinite(parsedYear) ? parsedYear <= 2010 : false;

  if (isDieselModel(model)) {
    return {
      preferredViscosities: ["5W40", "5W30", "10W40"],
      explanation: "Diesel engines usually need stronger protection, so 5W40 is recommended.",
    };
  }

  if (isOldCar) {
    return {
      preferredViscosities: ["10W40", "5W40", "5W30"],
      explanation: "Older cars are matched with 10W40 because it is better suited for higher engine wear.",
    };
  }

  if (["bmw", "audi", "mercedes", "mercedes-benz"].includes(make)) {
    return {
      preferredViscosities: ["5W30", "5W40", "10W40"],
      explanation: "BMW, Audi, and Mercedes prefer 5W30, with 5W40 as the next closest option.",
    };
  }

  if (["toyota", "hyundai", "kia"].includes(make)) {
    return {
      preferredViscosities: ["5W30", "5W40", "10W40"],
      explanation: "Toyota, Hyundai, and Kia are matched with 5W30 oil.",
    };
  }

  return {
    preferredViscosities: ["5W30", "5W40", "10W40"],
    explanation: "This vehicle is matched with 5W30 as the default recommendation.",
  };
}

function pickBestOil(oils: OilRow[], preferredViscosities: string[]) {
  return [...oils].sort((a, b) => {
    const aPriority = preferredViscosities.indexOf(a.viscosity ?? "");
    const bPriority = preferredViscosities.indexOf(b.viscosity ?? "");
    const safeAPriority = aPriority === -1 ? Number.MAX_SAFE_INTEGER : aPriority;
    const safeBPriority = bPriority === -1 ? Number.MAX_SAFE_INTEGER : bPriority;

    if (safeAPriority !== safeBPriority) {
      return safeAPriority - safeBPriority;
    }

    const aIsTotal = normalizeValue(a.brand ?? "") === "total";
    const bIsTotal = normalizeValue(b.brand ?? "") === "total";
    if (aIsTotal !== bIsTotal) {
      return Number(bIsTotal) - Number(aIsTotal);
    }

    if (Boolean(a.is_featured) !== Boolean(b.is_featured)) {
      return Number(Boolean(b.is_featured)) - Number(Boolean(a.is_featured));
    }

    return (a.product_name ?? "").localeCompare(b.product_name ?? "");
  })[0] ?? null;
}

async function getOilRows() {
  if (cachedOilRows) {
    return cachedOilRows;
  }

  const persisted = readPersistedValue<OilRow[]>(OIL_ROWS_CACHE_KEY, OIL_ROWS_MAX_AGE_MS);
  if (persisted) {
    cachedOilRows = persisted;
    return cachedOilRows;
  }

  if (!oilRowsPromise) {
    const supabase = createSupabaseBrowserClient();
    oilRowsPromise = supabase
      .from("oils")
      .select("id, brand, product_name, viscosity, image_url, is_featured")
      .limit(100)
      .then((response: QueryResponse<OilRow>) => {
        const { data, error } = response;
        if (error) {
          throw error;
        }

        cachedOilRows = (data ?? []) as OilRow[];
        writePersistedValue(OIL_ROWS_CACHE_KEY, cachedOilRows);
        return cachedOilRows;
      })
      .finally(() => {
        oilRowsPromise = null;
      });
  }

  return oilRowsPromise!;
}

export async function getRecommendedOil(selection: VehicleSelection) {
  const rule = getOilRule(selection.make, selection);
  const oils = await getOilRows();
  const matchingOils = oils.filter((oil) => rule.preferredViscosities.includes(oil.viscosity ?? ""));
  const oil = pickBestOil(matchingOils, rule.preferredViscosities) ?? oils[0] ?? null;
  if (!oil) {
    return {
      brand: "Total",
      product_name: "Recommended engine oil",
      viscosity: rule.preferredViscosities[0] ?? "5W30",
      image_url: null,
      explanation: rule.explanation,
    };
  }

  return {
    brand: oil.brand,
    product_name: oil.product_name,
    viscosity: oil.viscosity,
    image_url: oil.image_url,
    explanation: rule.explanation,
  };
}
