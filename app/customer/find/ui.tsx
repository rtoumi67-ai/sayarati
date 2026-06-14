"use client";

import RequireAuth from "../../components/RequireAuth";
import Reveal from "../../components/Reveal";
import Tilt from "../../components/Tilt";
import { useTranslation } from "react-i18next";

export default function CustomerFindUI() {
  const { t } = useTranslation();
  const filters = t("customer.find.filters", { returnObjects: true }) as string[];
  const garages = t("customer.find.garages", { returnObjects: true }) as Array<{ name: string }>;
  const km = t("units.km");
  const sar = t("units.sar");

  return (
    <RequireAuth role="customer">
      <div className="container-app py-10">
        <div className="hud-shell neon-border neon-ring overflow-hidden">
          <div className="p-6 sm:p-8">
            <Reveal>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="chip w-fit">
                    <span className="chip-dot bg-primary" />
                    {t("customer.find.chip")}
                  </div>
                  <h1 className="mt-4 text-2xl font-semibold sm:text-3xl">
                    {t("customer.find.title")}
                  </h1>
                  <p className="mt-2 text-sm leading-7 text-muted">
                    {t("customer.find.subtitle")}
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a href="/customer" className="btn-secondary h-11 px-5">
                    {t("customer.find.back")}
                  </a>
                  <a href="/customer/request" className="btn-primary h-11 px-5 text-sm">
                    {t("customer.find.direct")}
                  </a>
                </div>
              </div>
            </Reveal>

            <div className="mt-8 flex flex-wrap gap-2">
              {filters.map((x, i) => (
                <Reveal key={x} delayMs={80 + i * 60}>
                  <span className="chip neon-border">{x}</span>
                </Reveal>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { name: garages?.[0]?.name ?? "Garage", km: `1.2 ${km}`, rate: 4.8, available: true },
                { name: garages?.[1]?.name ?? "Garage", km: `2.6 ${km}`, rate: 4.6, available: true },
                { name: garages?.[2]?.name ?? "Garage", km: `3.4 ${km}`, rate: 4.7, available: false },
              ].map((m, i) => (
                <Reveal key={m.name} delayMs={120 + i * 80}>
                  <Tilt className="h-full">
                    <div className="glass-panel neon-border card-hover flex h-full flex-col p-6">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="truncate text-base font-semibold">
                            {m.name}
                          </div>
                          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted">
                            <span className="inline-flex items-center gap-2">
                              <span
                                className={[
                                  "h-2 w-2 rounded-full",
                                  m.available ? "bg-primary" : "bg-secondary/70",
                                ].join(" ")}
                              />
                              {m.available ? t("customer.find.available") : t("customer.find.busy")}
                            </span>
                            <span>•</span>
                            <span>{m.km}</span>
                          </div>
                          <div className="mt-3 flex items-center gap-2 text-xs">
                            <span className="text-primary">
                              {"★★★★★".slice(0, Math.round(m.rate))}
                            </span>
                            <span className="text-muted">({m.rate.toFixed(1)})</span>
                          </div>
                        </div>
                        <div className="neon-ring inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-border/40">
                          🔧
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                        <div className="rounded-2xl border hairline bg-card/40 p-3">
                          <div className="text-muted">{t("customer.find.eta")}</div>
                          <div className="mt-1 font-semibold metal-text">
                            10–18 {t("units.min")}
                          </div>
                        </div>
                        <div className="rounded-2xl border hairline bg-card/40 p-3">
                          <div className="text-muted">{t("customer.find.price")}</div>
                          <div className="mt-1 font-semibold metal-text">
                            {t("customer.find.from")} 70 {sar}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        <a href="/customer/request" className="btn-primary h-11 px-5 text-sm">
                          {t("customer.find.send")}
                        </a>
                        <a href="/customer/request" className="btn-secondary h-11 px-5 text-sm">
                          {t("customer.find.view")}
                        </a>
                      </div>
                    </div>
                  </Tilt>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}
