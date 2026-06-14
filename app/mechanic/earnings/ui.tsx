"use client";

import RequireAuth from "../../components/RequireAuth";
import Reveal from "../../components/Reveal";
import Tilt from "../../components/Tilt";
import { useTranslation } from "react-i18next";

export default function MechanicEarningsUI() {
  const { t } = useTranslation();
  const sar = t("units.sar");

  return (
    <RequireAuth role="mechanic">
      <div className="container-app py-10">
        <div className="hud-shell neon-border neon-ring overflow-hidden p-6 sm:p-8">
          <Reveal>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="chip w-fit">
                  <span className="chip-dot bg-primary" />
                  {t("mechanic.earnings.chip")}
                </div>
                <h1 className="mt-4 text-2xl font-semibold sm:text-3xl">
                  {t("mechanic.earnings.title")}
                </h1>
                <p className="mt-2 text-sm leading-7 text-muted">
                  {t("mechanic.earnings.subtitle")}
                </p>
              </div>
              <a href="/mechanic" className="btn-secondary h-11 px-5">
                {t("mechanic.earnings.back")}
              </a>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                t: t("mechanic.earnings.cards.today"),
                v: `420 ${sar}`,
                d: t("mechanic.earnings.cards.requests", { count: 6 }),
              },
              {
                t: t("mechanic.earnings.cards.week"),
                v: `2,180 ${sar}`,
                d: t("mechanic.earnings.cards.requests", { count: 31 }),
              },
              {
                t: t("mechanic.earnings.cards.month"),
                v: `7,950 ${sar}`,
                d: t("mechanic.earnings.cards.requests", { count: 102 }),
              },
            ].map((x, i) => (
              <Reveal key={x.t} delayMs={90 + i * 80}>
                <Tilt className="h-full">
                  <div className="glass-panel neon-border card-hover h-full p-6">
                    <div className="text-xs text-muted">{x.t}</div>
                    <div className="mt-2 text-2xl font-semibold">{x.v}</div>
                    <div className="mt-2 text-sm text-muted">{x.d}</div>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>

          <Reveal delayMs={200}>
            <div className="glass-panel neon-border mt-8 p-6">
              <h2 className="text-base font-semibold">{t("mechanic.earnings.latest")}</h2>
              <div className="mt-4 grid gap-3 text-sm">
                {[
                  {
                    t: "maintenance",
                    v: `+120 ${sar}`,
                    d: t("mechanic.earnings.when.today"),
                  },
                  {
                    t: "battery",
                    v: `+80 ${sar}`,
                    d: t("mechanic.earnings.when.yesterday"),
                  },
                  {
                    t: "towing",
                    v: `+220 ${sar}`,
                    d: t("mechanic.earnings.when.twoDays"),
                  },
                ].map((x) => (
                  <div
                    key={x.t + x.d}
                    className="flex items-center justify-between rounded-2xl border hairline bg-card px-4 py-3"
                  >
                    <div className="text-muted">{t(`serviceKinds.${x.t}`)}</div>
                    <div className="font-semibold text-foreground">{x.v}</div>
                    <div className="text-xs text-muted">{x.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </RequireAuth>
  );
}
