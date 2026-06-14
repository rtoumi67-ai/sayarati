"use client";

import RequireAuth from "../../components/RequireAuth";
import Reveal from "../../components/Reveal";
import Tilt from "../../components/Tilt";
import { useTranslation } from "react-i18next";

export default function MechanicRequestsUI() {
  const { t } = useTranslation();
  const km = t("units.km");

  return (
    <RequireAuth role="mechanic">
      <div className="container-app py-10">
        <div className="hud-shell neon-border neon-ring overflow-hidden p-6 sm:p-8">
          <Reveal>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="chip w-fit">
                  <span className="chip-dot bg-secondary" />
                  {t("mechanic.requests.chip")}
                </div>
                <h1 className="mt-4 text-2xl font-semibold sm:text-3xl">
                  {t("mechanic.requests.title")}
                </h1>
                <p className="mt-2 text-sm leading-7 text-muted">
                  {t("mechanic.requests.subtitle")}
                </p>
              </div>
              <a href="/mechanic" className="btn-secondary h-11 px-5">
                {t("mechanic.requests.back")}
              </a>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                service: "tire",
                dist: `1.1 ${km}`,
                notes: t("mechanic.requests.sampleNotes.tire"),
              },
              {
                service: "battery",
                dist: `2.5 ${km}`,
                notes: t("mechanic.requests.sampleNotes.battery"),
              },
              {
                service: "towing",
                dist: `3.3 ${km}`,
                notes: t("mechanic.requests.sampleNotes.towing"),
              },
            ].map((r, i) => (
              <Reveal key={r.service + r.dist} delayMs={100 + i * 80}>
                <Tilt className="h-full">
                  <div className="glass-panel neon-border card-hover flex h-full flex-col p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-xs text-muted">{r.dist}</div>
                        <div className="mt-2 text-base font-semibold">
                          {t(`serviceKinds.${r.service}`)}
                        </div>
                        <div className="mt-2 text-sm leading-7 text-muted">
                          {r.notes}
                        </div>
                      </div>
                      <div className="neon-ring inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary/10 text-secondary ring-1 ring-border/40">
                        📍
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        className="btn-primary h-11 px-4 text-sm"
                      >
                        {t("mechanic.requests.accept")}
                      </button>
                      <button
                        type="button"
                        className="btn-secondary h-11 px-4 text-sm"
                      >
                        {t("mechanic.requests.reject")}
                      </button>
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}
