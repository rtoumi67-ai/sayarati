"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getCustomerCar, getRole, setCustomerCar, type CustomerCar } from "../../../components/auth";
import Reveal from "../../../components/Reveal";
import { useTranslation } from "react-i18next";
import { CAR_CATALOG, CAR_TYPES, DEFAULT_MAKE } from "./catalog";
import OilRecommendationCard from "../../recommendations/OilRecommendationCard";
import {
  getRecommendationGroups,
  getPartRecommendations,
  type RecommendationRow,
} from "../../recommendations/recommendation-logic";
import {
  getAvailableVehicleCatalog,
  getRecommendedOil,
  type RecommendedOil,
  type VehicleCatalog,
} from "../../recommendations/oil-recommendation";

const YEARS = Array.from({ length: 18 }, (_, i) => String(2026 - i));

function normalizeSearch(value: string) {
  return value.trim().toLowerCase();
}

function getInitialCustomerCar() {
  return getCustomerCar();
}

export default function CarOnboardingUI() {
  const router = useRouter();
  const { t } = useTranslation();
  const [availableVehicleCatalog, setAvailableVehicleCatalog] = useState<VehicleCatalog | null>(null);
  const makeNames = useMemo(
    () => Object.keys(availableVehicleCatalog ?? CAR_CATALOG),
    [availableVehicleCatalog],
  );

  const [type, setType] = useState<CustomerCar["type"]>(() => getInitialCustomerCar()?.type ?? "sedan");
  const [make, setMake] = useState<string>(() => getInitialCustomerCar()?.make ?? DEFAULT_MAKE);
  const [model, setModel] = useState<string>(
    () => getInitialCustomerCar()?.model ?? CAR_CATALOG[DEFAULT_MAKE][0],
  );
  const [year, setYear] = useState<string>(() => getInitialCustomerCar()?.year ?? YEARS[0]);
  const [km, setKm] = useState<string>(() => {
    const savedCar = getInitialCustomerCar();
    return savedCar ? String(savedCar.km) : "";
  });
  const [makeQuery, setMakeQuery] = useState("");
  const [modelQuery, setModelQuery] = useState("");
  const [recommendationRows, setRecommendationRows] = useState<RecommendationRow[]>([]);
  const [recommendationLoading, setRecommendationLoading] = useState(true);
  const [oilState, setOilState] = useState<{
    key: string;
    oil: RecommendedOil | null;
    error: string | null;
  }>({
    key: "",
    oil: null,
    error: null,
  });

  const filteredMakes = useMemo(() => {
    const query = normalizeSearch(makeQuery);
    if (!query) return makeNames;
    return makeNames.filter((x) => normalizeSearch(x).includes(query));
  }, [makeNames, makeQuery]);

  const selectedMake = filteredMakes.includes(make) ? make : (filteredMakes[0] ?? makeNames[0] ?? DEFAULT_MAKE);
  const models = useMemo(
    () => (availableVehicleCatalog ?? CAR_CATALOG)[selectedMake] ?? [],
    [availableVehicleCatalog, selectedMake],
  );
  const filteredModels = useMemo(() => {
    const query = normalizeSearch(modelQuery);
    if (!query) return models;
    return models.filter((x) => normalizeSearch(x).includes(query));
  }, [modelQuery, models]);
  const selectedModel = filteredModels.includes(model)
    ? model
    : (filteredModels[0] ?? models[0] ?? "");
  const parsedKm = Number(km);
  const kmOk = km.trim().length > 0 && Number.isFinite(parsedKm) && parsedKm >= 0;
  const currentKm = kmOk ? Math.round(parsedKm) : 0;
  const oilRequestKey = `${selectedMake}|${selectedModel}|${year}`;
  const oilLoading = oilState.key !== oilRequestKey;
  const recommendedOil = oilState.key === oilRequestKey ? oilState.oil : null;
  const oilError = oilState.key === oilRequestKey ? oilState.error : null;

  useEffect(() => {
    // حماية بسيطة: هذا المسار للزبون فقط
    const role = getRole();
    if (role && role !== "customer") router.replace("/mechanic");
  }, [router]);

  useEffect(() => {
    let cancelled = false;

    Promise.all([getAvailableVehicleCatalog(), getPartRecommendations()])
      .then(([catalog, rows]) => {
        if (cancelled) return;
        if (Object.keys(catalog).length) {
          setAvailableVehicleCatalog(catalog);
        }
        setRecommendationRows(rows);
        setRecommendationLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setRecommendationRows([]);
        setRecommendationLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    getRecommendedOil({
      make: selectedMake,
      model: selectedModel,
      year,
    })
      .then((oil) => {
        if (cancelled) return;
        setOilState({
          key: oilRequestKey,
          oil,
          error: null,
        });
      })
      .catch((nextError: unknown) => {
        if (cancelled) return;
        setOilState({
          key: oilRequestKey,
          oil: null,
          error:
            nextError instanceof Error ? nextError.message : t("customer.recommendations.loading"),
        });
      });

    return () => {
      cancelled = true;
    };
  }, [oilRequestKey, selectedMake, selectedModel, t, year]);

  const suggestionPreview = useMemo(() => {
    if (!kmOk) {
      return { all: [], oils: [], parts: [] } as const;
    }

    return getRecommendationGroups(
      recommendationRows,
      {
        make: selectedMake,
        model: selectedModel,
        year,
        km: currentKm,
      },
      t,
    );
  }, [currentKm, kmOk, recommendationRows, selectedMake, selectedModel, t, year]);

  return (
    <div className="relative overflow-hidden py-10 sm:py-14">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-garage opacity-90" />
      <div className="container-app max-w-3xl">
        <Reveal>
          <div className="hud-shell neon-border neon-ring p-6 sm:p-10">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-semibold sm:text-3xl">
                {t("customer.onboarding.title")}
              </h1>
              <p className="text-sm leading-7 text-muted">
                {t("customer.onboarding.subtitle")}
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm">
                <span className="font-semibold">{t("customer.onboarding.carType")}</span>
                <select
                  className="input"
                  value={type}
                  onChange={(e) => setType(e.target.value as CustomerCar["type"])}
                >
                  {CAR_TYPES.map((x) => (
                    <option key={x} value={x}>
                      {t(`customer.onboarding.types.${x}`)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm">
                <span className="font-semibold">{t("customer.onboarding.km")}</span>
                <input
                  className="input"
                  inputMode="numeric"
                  value={km}
                  onChange={(e) => setKm(e.target.value)}
                  placeholder={t("customer.onboarding.kmPlaceholder")}
                />
              </label>

              <label className="grid gap-2 text-sm">
                <span className="font-semibold">{t("customer.onboarding.year")}</span>
                <select
                  className="input"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                >
                  {YEARS.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm">
                <span className="font-semibold">{t("customer.onboarding.make")}</span>
                <input
                  className="input"
                  value={makeQuery}
                  onChange={(e) => setMakeQuery(e.target.value)}
                  placeholder={t("customer.onboarding.searchMake")}
                />
                <select
                  className="input"
                  value={selectedMake}
                  onChange={(e) => {
                    const nextMake = e.target.value;
                    setMake(nextMake);
                    const firstModel = (availableVehicleCatalog ?? CAR_CATALOG)[nextMake]?.[0];
                    if (firstModel) setModel(firstModel);
                    setModelQuery("");
                  }}
                >
                  {filteredMakes.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <span className="text-xs text-muted">
                  {t("customer.onboarding.catalogCount", {
                    count: filteredMakes.length,
                    total: makeNames.length,
                  })}
                </span>
              </label>

              <label className="grid gap-2 text-sm">
                <span className="font-semibold">{t("customer.onboarding.model")}</span>
                <input
                  className="input"
                  value={modelQuery}
                  onChange={(e) => setModelQuery(e.target.value)}
                  placeholder={t("customer.onboarding.searchModel")}
                />
                <select
                  className="input"
                  value={selectedModel}
                  onChange={(e) => setModel(e.target.value)}
                >
                  {filteredModels.map((x) => (
                    <option key={x} value={x}>
                      {x}
                    </option>
                  ))}
                </select>
                <span className="text-xs text-muted">
                  {t("customer.onboarding.modelCount", {
                    count: filteredModels.length,
                    total: models.length,
                  })}
                </span>
              </label>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                className="btn-primary disabled:opacity-60"
                disabled={!kmOk}
                onClick={() => {
                  setCustomerCar({
                    type,
                    make: selectedMake,
                    model: selectedModel,
                    year,
                    km: Math.round(parsedKm),
                  });
                  router.replace("/customer/recommendations?from=onboarding");
                }}
              >
                {t("customer.onboarding.saveContinue")}
              </button>
              <Link
                className="btn-secondary"
                href="/auth/login"
              >
                {t("customer.onboarding.back")}
              </Link>
            </div>

            <div className="mt-6 glass-panel neon-border p-5">
              <div className="text-sm font-semibold">{t("customer.onboarding.oilPreviewTitle")}</div>
              <div className="mt-2 text-sm leading-7 text-muted">
                {t("customer.onboarding.oilPreviewDescription")}
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <div className="space-y-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                    {t("customer.recommendations.oilsTitle")}
                  </div>

                  {oilLoading ? (
                    <div className="rounded-2xl border hairline bg-card/20 p-4 text-sm text-muted">
                      {t("customer.onboarding.oilPreviewLoading")}
                    </div>
                  ) : oilError ? (
                    <div className="rounded-2xl border hairline bg-card/20 p-4 text-sm text-muted">
                      {oilError}
                    </div>
                  ) : recommendedOil ? (
                    <OilRecommendationCard oil={recommendedOil} />
                  ) : (
                    <div className="rounded-2xl border hairline bg-card/20 p-4 text-sm text-muted">
                      {t("customer.onboarding.noRecommendedOil")}
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                    {t("customer.recommendations.partsTitle")}
                  </div>

                  {recommendationLoading ? (
                    <div className="rounded-2xl border hairline bg-card/20 p-4 text-sm text-muted">
                      {t("customer.onboarding.oilPreviewLoading")}
                    </div>
                  ) : !kmOk ? (
                    <div className="rounded-2xl border hairline bg-card/20 p-4 text-sm text-muted">
                      {t("customer.onboarding.oilPreviewEmpty")}
                    </div>
                  ) : suggestionPreview.parts.slice(0, 4).length ? (
                    suggestionPreview.parts.slice(0, 4).map((part) => (
                      <div key={part.id} className="rounded-2xl border hairline bg-card/40 p-4 text-sm">
                        <div className="font-semibold">{part.title}</div>
                        {part.details ? <div className="mt-1 text-xs leading-6 text-muted">{part.details}</div> : null}
                        {part.url ? (
                          <a
                            className="mt-2 inline-block text-xs font-semibold text-primary hover:underline underline-offset-4"
                            href={part.url}
                          >
                            {t("customer.recommendations.openLink")}
                          </a>
                        ) : null}
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl border hairline bg-card/20 p-4 text-sm text-muted">
                      {t("customer.recommendations.empty")}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-card-2 p-4 text-sm leading-7 text-muted">
              <span className="font-semibold text-foreground">
                {t("customer.onboarding.choice")}
              </span>{" "}
              {t(`customer.onboarding.types.${type}`)} — {selectedMake} {selectedModel} ({year}) —{" "}
              {kmOk ? `${currentKm} ${t("units.km")}` : "—"}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
