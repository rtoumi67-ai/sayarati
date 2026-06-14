"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import RequireAuth from "../../components/RequireAuth";
import Reveal from "../../components/Reveal";
import { getCustomerCar, type CustomerCar } from "../../components/auth";
import { useTranslation } from "react-i18next";
import OilRecommendationCard from "./OilRecommendationCard";
import {
  getRecommendationGroups,
  getPartRecommendations,
  type RecommendationRow,
} from "./recommendation-logic";
import {
  getRecommendedOil,
  type RecommendedOil,
} from "./oil-recommendation";
import {
  formatDaPrice,
  formatMileageBand,
  getRecommendedOilProducts,
} from "../store/catalog";

export default function CustomerRecommendations() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const car = useMemo<CustomerCar | null>(() => getCustomerCar(), []);
  const [loading, setLoading] = useState(() => Boolean(car));
  const [error, setError] = useState<string | null>(null);
  const [rows, setRows] = useState<RecommendationRow[]>([]);
  const [recommendedOil, setRecommendedOil] = useState<RecommendedOil | null>(null);
  const [oilLoading, setOilLoading] = useState(() => Boolean(car));
  const [oilError, setOilError] = useState<string | null>(null);

  useEffect(() => {
    if (!car) return;

    let cancelled = false;

    getPartRecommendations()
      .then((data) => {
        if (cancelled) return;
        setRows((data ?? []) as RecommendationRow[]);
        setError(null);
        setLoading(false);
      })
      .catch((nextError: unknown) => {
        if (cancelled) return;
        setError(nextError instanceof Error ? nextError.message : t("customer.recommendations.loading"));
        setRows([]);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [car, t]);

  useEffect(() => {
    if (!car) return;

    let cancelled = false;

    getRecommendedOil({
      make: car.make,
      model: car.model,
      year: car.year,
    })
      .then((oil) => {
        if (cancelled) return;
        setRecommendedOil(oil);
        setOilError(null);
        setOilLoading(false);
      })
      .catch((nextError: unknown) => {
        if (cancelled) return;
        setRecommendedOil(null);
        setOilError(nextError instanceof Error ? nextError.message : t("customer.recommendations.loading"));
        setOilLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [car, t]);

  const filtered = useMemo(() => {
    if (!car) return { oils: [], parts: [] } as const;
    return getRecommendationGroups(rows, car, t);
  }, [rows, car, t]);

  const recommendedProducts = useMemo(() => {
    if (!car) return [];
    return getRecommendedOilProducts(car, 3);
  }, [car]);
  const fromOnboarding = searchParams.get("from") === "onboarding";

  function renderRecommendationCards(items: typeof filtered.oils, emptyMessage: ReactNode) {
    if (loading) {
      return <div className="mt-4 text-sm text-muted">{t("customer.recommendations.loading")}</div>;
    }

    if (!items.length) {
      return <div className="mt-4 text-sm text-muted">{emptyMessage}</div>;
    }

    return (
      <div className="mt-4 grid gap-3">
        {items.map((x) => (
          <div key={x.id} className="rounded-2xl border hairline bg-card/40 p-4 text-sm">
            <div className="font-semibold">{x.title}</div>
            {x.details ? <div className="mt-1 text-xs leading-6 text-muted">{x.details}</div> : null}
            {x.url ? (
              <a className="mt-2 inline-block text-xs font-semibold text-primary hover:underline underline-offset-4" href={x.url}>
                {t("customer.recommendations.openLink")}
              </a>
            ) : null}
          </div>
        ))}
      </div>
    );
  }

  return (
    <RequireAuth role="customer">
      <div className="container-app py-10">
        <div className="hud-shell neon-border neon-ring overflow-hidden p-6 sm:p-8">
          <Reveal>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="chip w-fit">
                  <span className="chip-dot bg-primary" />
                  {t("customer.recommendations.chip")}
                </div>
                <h1 className="mt-4 text-2xl font-semibold sm:text-3xl">
                  {t("customer.recommendations.title")}
                </h1>
                <p className="mt-2 text-sm leading-7 text-muted">
                  {t("customer.recommendations.subtitle")}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href="/customer/onboarding/car" className="btn-secondary h-11 px-5">
                  {t("customer.recommendations.editCar")}
                </Link>
                <Link href="/customer/store" className="btn-primary h-11 px-5 text-sm">
                  {t("customer.recommendations.openStore")}
                </Link>
                <Link href="/customer/find" className="btn-secondary h-11 px-5 text-sm">
                  {t("customer.recommendations.findWorkshop")}
                </Link>
              </div>
            </div>
          </Reveal>

          {!car ? (
            <div className="mt-8 glass-panel neon-border p-6 text-sm text-muted">
              {t("customer.recommendations.missingCar")}
              <Link
                href="/customer/onboarding/car"
                className="mt-4 block w-full text-center text-sm font-semibold text-primary hover:underline underline-offset-4"
              >
                {t("customer.recommendations.addCar")}
              </Link>
            </div>
          ) : (
            <>
              {fromOnboarding ? (
                <div className="mt-8 glass-panel neon-border p-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <div className="chip w-fit">
                        <span className="chip-dot bg-primary" />
                        {t("customer.recommendations.afterOnboarding.badge")}
                      </div>
                      <h2 className="mt-4 text-xl font-semibold text-foreground">
                        {t("customer.recommendations.afterOnboarding.title")}
                      </h2>
                      <p className="mt-2 text-sm leading-7 text-muted">
                        {t("customer.recommendations.afterOnboarding.description")}
                      </p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Link href="/customer/store" className="btn-primary h-11 px-5 text-sm">
                        {t("customer.recommendations.afterOnboarding.openStore")}
                      </Link>
                      <Link href="/customer/request" className="btn-secondary h-11 px-5 text-sm">
                        {t("customer.recommendations.afterOnboarding.requestService")}
                      </Link>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {[
                      t("customer.recommendations.afterOnboarding.steps.recommendations"),
                      t("customer.recommendations.afterOnboarding.steps.store"),
                      t("customer.recommendations.afterOnboarding.steps.mechanic"),
                    ].map((step) => (
                      <div
                        key={step}
                        className="rounded-2xl border hairline bg-card/40 px-4 py-3 text-sm text-muted"
                      >
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="mt-8 rounded-2xl bg-card-2 p-4 text-sm leading-7 text-muted">
                <span className="font-semibold text-foreground">
                  {t("customer.recommendations.yourCar")}
                </span>{" "}
                {t(`customer.onboarding.types.${car.type}`)} — {car.make} {car.model} ({car.year}) — {car.km}{" "}
                {t("units.km")}
              </div>

              {error ? (
                <div className="mt-6 glass-panel neon-border p-5 text-sm text-muted">
                  {error}
                </div>
              ) : null}

              <div className="mt-8 grid gap-4 lg:grid-cols-2">
                <div className="glass-panel neon-border p-6">
                  <h2 className="text-base font-semibold">
                    {t("customer.recommendations.oilsTitle")}
                  </h2>
                  {oilLoading ? (
                    <div className="mt-4 text-sm text-muted">{t("customer.recommendations.loading")}</div>
                  ) : oilError ? (
                    <div className="mt-4 text-sm text-muted">{oilError}</div>
                  ) : recommendedOil ? (
                    <OilRecommendationCard oil={recommendedOil} />
                  ) : (
                    <div className="mt-4 text-sm text-muted">
                      {t("customer.recommendations.noRecommendedOil")}
                    </div>
                  )}
                </div>

                <div className="glass-panel neon-border p-6">
                  <h2 className="text-base font-semibold">
                    {t("customer.recommendations.partsTitle")}
                  </h2>
                  {renderRecommendationCards(filtered.parts, t("customer.recommendations.empty"))}
                </div>
              </div>

              <div className="mt-8 glass-panel neon-border p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-base font-semibold">
                      {t("customer.recommendations.storeTitle")}
                    </h2>
                    <p className="mt-2 text-sm leading-7 text-muted">
                      {t("customer.recommendations.storeDescription")}
                    </p>
                  </div>
                  <Link href="/customer/store" className="btn-secondary h-11 px-5">
                    {t("customer.recommendations.openStore")}
                  </Link>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-3">
                  {recommendedProducts.map((product) => (
                    <article key={product.id} className="overflow-hidden rounded-3xl border hairline bg-card/40">
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={768}
                        height={512}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="h-48 w-full object-cover"
                      />
                      <div className="space-y-3 p-4">
                        <div className="flex flex-wrap gap-2 text-xs font-semibold">
                          <span className="rounded-full bg-primary/15 px-3 py-1 text-primary">
                            {product.viscosity}
                          </span>
                          <span className="rounded-full bg-card-2 px-3 py-1 text-muted">
                            {product.packageSize}
                          </span>
                        </div>
                        <div className="text-base font-semibold">{product.title}</div>
                        <div className="text-xs leading-6 text-muted">
                          {formatMileageBand(product.minKm, product.maxKm, t("units.km"))}
                        </div>
                        <div className="text-xs leading-6 text-muted">
                          {t("customer.store.seller")}: {product.sellerName}
                        </div>
                        <div className="text-xs leading-6 text-muted">
                          {t("customer.store.delivery")}: {product.deliveryEta} /{" "}
                          {formatDaPrice(product.deliveryFeeDa)}
                        </div>
                        <div className="font-semibold text-foreground">
                          {formatDaPrice(product.priceDa)}
                        </div>
                        <Link href={`/customer/store#${product.id}`} className="btn-primary w-full text-center">
                          {t("customer.recommendations.buyNow")}
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link href="/customer/request" className="btn-primary">
                  {t("customer.recommendations.requestService")}
                </Link>
                <Link href="/customer" className="btn-secondary">
                  {t("customer.recommendations.back")}
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </RequireAuth>
  );
}
