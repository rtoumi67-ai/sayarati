"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import {
  getRole,
  setAuthed,
  type Role,
} from "../../components/auth";
import Reveal from "../../components/Reveal";
import { createSupabaseBrowserClient } from "../../lib/supabase/client";

function roleLabel(role: Role, t: TFunction) {
  return role === "customer" ? t("roles.customer") : t("roles.mechanic");
}

export default function LoginUI() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const [role, setRole] = useState<Role | null>(null);
  const [nextPath, setNextPath] = useState("/choose-role");
  const [oauthLoading, setOauthLoading] = useState(false);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const showCheckEmailNotice = searchParams.get("check_email") === "1";

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const r = getRole();
      setRole(r);
      if (!r) {
        setNextPath("/choose-role");
        return;
      }
      if (r === "mechanic") {
        setNextPath("/mechanic");
        return;
      }
      setNextPath("/customer/onboarding/car");
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const mappedRole = role === "mechanic" ? "mechanic" : "owner";

  return (
    <div className="relative overflow-hidden py-10 sm:py-14">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-garage opacity-90" />
      <div className="container-app max-w-3xl">
        <Reveal>
          <div className="hud-shell neon-border neon-ring p-6 sm:p-10">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-semibold sm:text-3xl">
                {t("auth.signIn")}
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
                {showCheckEmailNotice ? (
                  <div className="mt-8 rounded-2xl border border-primary/25 bg-primary/10 px-4 py-3 text-sm leading-7 text-foreground">
                    {t("auth.checkEmailNotice")}
                  </div>
                ) : null}

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
                      const supabase = createSupabaseBrowserClient();
                      const { error } = await supabase.auth.signInWithPassword({
                        email,
                        password,
                      });
                      if (error) {
                        setMessage(error.message);
                        setPending(false);
                        return;
                      }
                      setAuthed(true);
                      router.replace(nextPath);
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
                      autoComplete="current-password"
                      required
                    />
                  </label>

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
                      {pending ? t("auth.signingIn") : t("auth.signIn")}
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
                  <Link
                    className="btn-secondary"
                    href="/auth/register"
                  >
                    {t("auth.createAccount")}
                  </Link>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => router.replace(nextPath)}
                  >
                    {t("auth.skipMvp")}
                  </button>
                </div>

                <p className="mt-6 text-center text-xs leading-6 text-muted">
                  {t("auth.loginFlowNote")}
                </p>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
