"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";
import { useTranslation } from "react-i18next";
import { getRole, isAuthed, type Role } from "./auth";

function subscribeToClientReady() {
  return () => {};
}

function ClientRedirect({ to }: { to: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();

  useEffect(() => {
    router.replace(to);
  }, [router, to, pathname]);

  return (
    <div className="container-app py-10">
      <div className="card p-6 text-sm text-muted">
        {t("requireAuth.redirecting")}
      </div>
    </div>
  );
}

export default function RequireAuth({
  role,
  children,
}: {
  role: Role;
  children: React.ReactNode;
}) {
  const mounted = useSyncExternalStore(subscribeToClientReady, () => true, () => false);

  if (!mounted) return null;

  const state = { r: getRole(), ok: isAuthed() };

  if (!state.r) return <ClientRedirect to="/choose-role" />;
  if (!state.ok) return <ClientRedirect to="/auth/login" />;
  if (state.r !== role) return <ClientRedirect to={state.r === "customer" ? "/customer" : "/mechanic"} />;

  return <>{children}</>;
}
