"use client";

import { useState } from "react";
import RequireAuth from "../../components/RequireAuth";
import Reveal from "../../components/Reveal";
import Tilt from "../../components/Tilt";
import { useTranslation } from "react-i18next";

const SERVICES = ["battery", "tire", "towing", "maintenance", "inspection", "other"] as const;

export default function CustomerRequestUI() {
  const { t } = useTranslation();
  const [service, setService] = useState<(typeof SERVICES)[number]>("maintenance");
  const [notes, setNotes] = useState("");

  return (
    <RequireAuth role="customer">
      <div className="container-app py-10">
        <div className="hud-shell neon-border neon-ring overflow-hidden p-6 sm:p-8">
          <Reveal>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="chip w-fit">
                  <span className="chip-dot bg-primary" />
                  {t("customer.request.chip")}
                </div>
                <h1 className="mt-4 text-2xl font-semibold sm:text-3xl">
                  {t("customer.request.title")}
                </h1>
                <p className="mt-2 text-sm leading-7 text-muted">
                  {t("customer.request.subtitle")}
                </p>
              </div>
              <a href="/customer" className="btn-secondary h-11 px-5">
                {t("customer.request.back")}
              </a>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <Reveal delayMs={90}>
              <Tilt>
                <div className="glass-panel neon-border p-6">
                  <label className="grid gap-2 text-sm">
                    <span className="font-semibold">{t("customer.request.serviceType")}</span>
                    <select
                      className="input"
                      value={service}
                      onChange={(e) =>
                        setService(e.target.value as (typeof SERVICES)[number])
                      }
                    >
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>
                          {t(`serviceKinds.${s}`)}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="mt-4 grid gap-2 text-sm">
                    <span className="font-semibold">{t("customer.request.problem")}</span>
                    <textarea
                      className="textarea min-h-32"
                      placeholder={t("customer.request.problemPlaceholder")}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </label>

                  <button
                    type="button"
                    className="btn-primary mt-5 w-full"
                  >
                    {t("customer.request.submitUi")}
                  </button>
                  <p className="mt-3 text-xs leading-6 text-muted">
                    {t("customer.request.note")}
                  </p>
                </div>
              </Tilt>
            </Reveal>

            <Reveal delayMs={150}>
              <div className="glass-panel neon-border p-6">
                <h2 className="text-base font-semibold">{t("customer.request.stepsTitle")}</h2>
                <ol className="mt-4 space-y-3 text-sm text-muted">
                  <li>
                    <span className="font-semibold text-foreground">1)</span>{" "}
                    {(t("customer.request.steps", { returnObjects: true }) as string[])[0]}
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">2)</span>{" "}
                    {(t("customer.request.steps", { returnObjects: true }) as string[])[1]}
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">3)</span>{" "}
                    {(t("customer.request.steps", { returnObjects: true }) as string[])[2]}
                  </li>
                </ol>

                <div className="mt-6 rounded-2xl bg-card-2 p-4 text-xs leading-6 text-muted">
                  <span className="font-semibold text-foreground">
                    {t("customer.request.noteTitle")}
                  </span>{" "}
                  {t("customer.request.noteBox")}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}
