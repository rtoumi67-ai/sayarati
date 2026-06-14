"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { getRole, setAuthed, setCustomerCar, type CustomerCar, type Role } from "../../components/auth";
import Reveal from "../../components/Reveal";
import { createSupabaseBrowserClient } from "../../lib/supabase/client";
import { CAR_CATALOG, CAR_TYPES, DEFAULT_MAKE } from "../../customer/onboarding/car/catalog";

function roleLabel(role: Role, t: TFunction) {
  return role === "customer" ? t("roles.customer") : t("roles.mechanic");
}

const YEARS = Array.from({ length: 18 }, (_, index) => String(2026 - index));

const CAR_TYPE_LABELS: Record<(typeof CAR_TYPES)[number], string> = {
  sedan: "سيدان",
  suv: "SUV",
  crossover: "كروس أوفر",
  hatchback: "هاتشباك",
  pickup: "بيك آب",
  van: "فان",
  coupe: "كوبيه",
  wagon: "واجن",
  convertible: "مكشوفة",
  minivan: "ميني فان",
  mpv: "عائلية MPV",
  truck: "شاحنة",
};

export default function RegisterUI() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [role] = useState<Role | null>(() => getRole());
  const [oauthLoading, setOauthLoading] = useState(false);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [carType, setCarType] = useState<CustomerCar["type"]>("sedan");
  const [make, setMake] = useState<string>(DEFAULT_MAKE);
  const [model, setModel] = useState<string>(CAR_CATALOG[DEFAULT_MAKE][0] ?? "");
  const [year, setYear] = useState<string>(YEARS[0]);
  const [km, setKm] = useState("");
  const locale = i18n.resolvedLanguage ?? i18n.language ?? "en";
  const mappedRole = role === "mechanic" ? "mechanic" : "owner";
  const carMakes = useMemo(() => Object.keys(CAR_CATALOG), []);
  const models = useMemo(() => CAR_CATALOG[make] ?? [], [make]);

  return (
    <div className="relative overflow-hidden py-10 sm:py-14">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-garage opacity-90" />
      <div className="container-app max-w-3xl">
        <Reveal>
          <div className="hud-shell neon-border neon-ring p-6 sm:p-10">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-semibold sm:text-3xl">
                {t("auth.createAccountShort")}
              </h1>
              <p className="text-sm leading-7 text-muted">
                {role
                  ? t("auth.currentRole", { role: roleLabel(role, t) })
                  : t("auth.chooseRoleFirst")}
              </p>
            </div>

            {!role ? (
              <div className="mt-8 text-center">
                <Link
                  className="btn-primary"
                  href="/choose-role"
                >
                  {t("auth.goChooseRole")}
                </Link>
              </div>
            ) : (
              <>
                <form
                  className="mt-8 grid gap-4"
                  onSubmit={async (event) => {
                    event.preventDefault();
                    setMessage(null);
                    setPending(true);
                    try {
                      const form = event.currentTarget;
                      const formData = new FormData(form);
                      const email = String(formData.get("email") ?? "");
                      const password = String(formData.get("password") ?? "");
                      const fullName = String(formData.get("fullName") ?? "") || null;
                      const phone = String(formData.get("phone") ?? "") || null;
                      const accountRole = String(formData.get("role") ?? "owner");
                      const locale = String(formData.get("locale") ?? "en");
                      const parsedKm = Number(km);
                      const customerKm = Number.isFinite(parsedKm) && parsedKm >= 0 ? Math.round(parsedKm) : 0;

                      const supabase = createSupabaseBrowserClient();
                      const nextPath = role === "mechanic" ? "/mechanic" : "/customer/onboarding/car";
                      const { data, error } = await supabase.auth.signUp({
                        email,
                        password,
                        options: {
                          data: {
                            role: accountRole,
                            full_name: fullName,
                            phone,
                            locale,
                          },
                          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(
                            nextPath
                          )}`,
                        },
                      });
                      if (error) {
                        setMessage(error.message);
                        setPending(false);
                        return;
                      }
                      if (role === "customer") {
                        setCustomerCar({
                          type: carType,
                          make,
                          model,
                          year,
                          km: customerKm,
                        });
                      }
                      const userId = data.user?.id;
                      if (userId && data.session) {
                        await supabase
                          .from("profiles")
                          .upsert({
                            id: userId,
                            role: accountRole,
                            full_name: fullName,
                            phone,
                            locale,
                          })
                          .select("id")
                          .maybeSingle();
                      }
                      if (data.session) {
                        setAuthed(true);
                        router.replace(nextPath);
                        return;
                      }
                      router.replace("/auth/login?check_email=1");
                    } catch (error) {
                      setMessage(
                        error instanceof Error
                          ? error.message
                          : "Unable to reach authentication service. Please try again.",
                      );
                      setPending(false);
                    }
                  }}
                >
                  <input type="hidden" name="role" value={mappedRole} />
                  <input type="hidden" name="locale" value={locale} />
                  <label className="grid gap-2 text-sm">
                    <span className="font-semibold">{t("auth.name")}</span>
                    <input
                      className="input"
                      name="fullName"
                      placeholder={t("auth.namePlaceholder")}
                      autoComplete="name"
                    />
                  </label>
                  <label className="grid gap-2 text-sm">
                    <span className="font-semibold">{t("auth.phone")}</span>
                    <input
                      className="input"
                      name="phone"
                      placeholder={t("auth.phonePlaceholder")}
                      inputMode="tel"
                      autoComplete="tel"
                    />
                  </label>
                  <label className="grid gap-2 text-sm">
                    <span className="font-semibold">{t("auth.email")}</span>
                    <input
                      className="input"
                      name="email"
                      type="email"
                      placeholder={t("auth.emailPlaceholder")}
                      autoComplete="email"
                      required
                    />
                  </label>
                  <label className="grid gap-2 text-sm">
                    <span className="font-semibold">{t("auth.password")}</span>
                    <input
                      className="input"
                      name="password"
                      type="password"
                      placeholder={t("auth.passwordPlaceholder")}
                      autoComplete="new-password"
                      required
                    />
                  </label>

                  {role === "customer" ? (
                    <div className="rounded-3xl border hairline bg-card/70 p-5">
                      <div className="text-base font-semibold">معلومات السيارة</div>
                      <p className="mt-2 text-sm leading-7 text-muted">
                        اختَر السيارة الآن باش يلقى الزبون onboarding جاهز ومعبّي بالمعلومات بعد إنشاء الحساب.
                      </p>

                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        <label className="grid gap-2 text-sm">
                          <span className="font-semibold">نوع السيارة</span>
                          <select
                            className="input"
                            value={carType}
                            onChange={(event) =>
                              setCarType(event.target.value as CustomerCar["type"])
                            }
                          >
                            {CAR_TYPES.map((type) => (
                              <option key={type} value={type}>
                                {CAR_TYPE_LABELS[type]}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label className="grid gap-2 text-sm">
                          <span className="font-semibold">السنة</span>
                          <select
                            className="input"
                            value={year}
                            onChange={(event) => setYear(event.target.value)}
                          >
                            {YEARS.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label className="grid gap-2 text-sm">
                          <span className="font-semibold">الماركة</span>
                          <select
                            className="input"
                            value={make}
                            onChange={(event) => {
                              const nextMake = event.target.value;
                              setMake(nextMake);
                              setModel(CAR_CATALOG[nextMake]?.[0] ?? "");
                            }}
                          >
                            {carMakes.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label className="grid gap-2 text-sm">
                          <span className="font-semibold">الموديل</span>
                          <select
                            className="input"
                            value={model}
                            onChange={(event) => setModel(event.target.value)}
                          >
                            {models.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label className="grid gap-2 text-sm sm:col-span-2">
                          <span className="font-semibold">الكيلومترات الحالية</span>
                          <input
                            className="input"
                            value={km}
                            onChange={(event) => setKm(event.target.value)}
                            inputMode="numeric"
                            placeholder="مثال: 68000"
                          />
                        </label>
                      </div>
                    </div>
                  ) : null}

                  {message ? (
                    <div className="rounded-2xl border hairline bg-card px-4 py-3 text-sm text-muted">
                      {message}
                    </div>
                  ) : null}

                  <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <button
                      type="submit"
                      disabled={pending}
                      className="btn-primary disabled:opacity-60"
                    >
                      {pending ? t("auth.creatingAccount") : t("auth.createAccountShort")}
                    </button>
                    <button
                      type="button"
                      disabled={oauthLoading}
                      className="btn-neon neon-border disabled:opacity-60"
                      onClick={async () => {
                        setMessage(null);
                        setOauthLoading(true);
                        try {
                          const supabase = createSupabaseBrowserClient();
                          const { error } = await supabase.auth.signInWithOAuth({
                            provider: "google",
                            options: {
                              redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextPath)}`,
                            },
                          });
                          if (error) {
                            setMessage(error.message);
                            setOauthLoading(false);
                          }
                        } catch (error) {
                          setMessage(
                            error instanceof Error
                              ? error.message
                              : "Unable to reach authentication service. Please try again.",
                          );
                          setOauthLoading(false);
                        }
                      }}
                    >
                      {t("auth.continueWithGoogle")}
                    </button>
                  </div>
                </form>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Link className="btn-secondary" href="/auth/login">
                    {t("auth.haveAccount")}
                  </Link>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => router.replace(role === "mechanic" ? "/mechanic" : "/customer/onboarding/car")}
                  >
                    {t("auth.skipMvp")}
                  </button>
                </div>

                <p className="mt-6 text-center text-xs leading-6 text-muted">
                  {t("auth.registerFlowNote")}
                </p>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
