import Link from "next/link";
import { requireProfile } from "../lib/auth/dal";
import { signOut } from "../actions/auth";

export default async function DashboardUI() {
  const profile = await requireProfile();

  return (
    <div className="py-10 sm:py-14">
      <div className="container-app max-w-7xl">
        <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-[38px] border border-border/70 bg-card p-7 shadow-[0_28px_90px_-54px_var(--shadow-ambient-strong)] sm:p-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="chip w-fit">
                  <span className="chip-dot bg-primary" />
                  Sayarati Command Center
                </div>
                <h1 className="mt-5 font-display text-3xl font-semibold leading-[1.04] sm:text-5xl">
                  Welcome back, {profile.full_name ?? "Driver"}.
                </h1>
                <p className="mt-3 max-w-2xl text-base leading-8 text-muted">
                  Your premium control layer for AI diagnostics, verified garages, spare parts,
                  and service performance.
                </p>
              </div>
              <form action={signOut}>
                <button type="submit" className="btn-secondary">
                  Log out
                </button>
              </form>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { label: "Profile role", value: profile.role },
                { label: "System mode", value: "Luxury automotive OS" },
                { label: "Workspace", value: "AI + marketplace + service" },
              ].map((item) => (
                <div key={item.label} className="rounded-[28px] border border-border/70 bg-card-2 px-5 py-5">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-muted">{item.label}</div>
                  <div className="mt-3 text-lg font-semibold capitalize">{item.value}</div>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <Link
                href="/assistant"
                className="rounded-[30px] border border-primary/20 bg-primary/10 p-6 shadow-[0_18px_48px_-30px_var(--glow-primary)] transition hover:-translate-y-1"
              >
                <div className="text-[11px] uppercase tracking-[0.18em] text-primary">AI workspace</div>
                <div className="mt-3 text-2xl font-semibold">AI assistant</div>
                <div className="mt-3 text-sm leading-8 text-muted">
                  Premium diagnostic chat for clients and mechanics with cleaner handoff flows.
                </div>
              </Link>

              <Link
                href="/garages"
                className="rounded-[30px] border border-border/70 bg-card-2 p-6 transition hover:-translate-y-1"
              >
                <div className="text-[11px] uppercase tracking-[0.18em] text-primary">Network</div>
                <div className="mt-3 text-2xl font-semibold">Garages</div>
                <div className="mt-3 text-sm leading-8 text-muted">
                  Discover premium workshops with trust, speed, and service specialization.
                </div>
              </Link>

              <Link
                href="/parts"
                className="rounded-[30px] border border-border/70 bg-card-2 p-6 transition hover:-translate-y-1"
              >
                <div className="text-[11px] uppercase tracking-[0.18em] text-primary">Commerce</div>
                <div className="mt-3 text-2xl font-semibold">Parts marketplace</div>
                <div className="mt-3 text-sm leading-8 text-muted">
                  Shop with high-end presentation, compatibility context, and order-ready layouts.
                </div>
              </Link>
            </div>
          </section>

          <aside className="space-y-5">
            <div className="rounded-[38px] border border-border/70 bg-card p-7 shadow-[0_28px_90px_-54px_var(--shadow-ambient-strong)]">
              <div className="text-[11px] uppercase tracking-[0.18em] text-primary">Live overview</div>
              <div className="mt-4 space-y-4">
                {[
                  { label: "Open service opportunities", value: "18" },
                  { label: "AI readiness score", value: "94%" },
                  { label: "Marketplace conversion", value: "+22%" },
                ].map((item) => (
                  <div key={item.label} className="rounded-[24px] border border-border/70 bg-card-2 px-5 py-4">
                    <div className="text-xs text-muted">{item.label}</div>
                    <div className="mt-2 text-2xl font-semibold">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[38px] border border-border/70 bg-card p-7 shadow-[0_28px_90px_-54px_var(--shadow-ambient-strong)]">
              <div className="text-[11px] uppercase tracking-[0.18em] text-primary">Recommended next step</div>
              <h2 className="mt-4 text-2xl font-semibold">Open the AI assistant and launch a premium workflow.</h2>
              <p className="mt-3 text-sm leading-8 text-muted">
                Start with diagnostics, then move the user into garage discovery or parts purchase
                without breaking the visual flow.
              </p>
              <Link href="/assistant" className="btn-primary mt-6 gap-2">
                Go to assistant
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
