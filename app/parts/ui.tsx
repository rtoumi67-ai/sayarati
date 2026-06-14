import Link from "next/link";
import { requireProfile } from "../lib/auth/dal";

export default async function PartsUI() {
  await requireProfile();

  return (
    <div className="py-10 sm:py-14">
      <div className="container-app max-w-7xl">
        <div className="rounded-[40px] border border-border/70 bg-card p-7 shadow-[0_30px_90px_rgba(0,0,0,0.38)] sm:p-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="chip w-fit">
                <span className="chip-dot bg-primary" />
                Premium Parts Marketplace
              </div>
              <h1 className="mt-5 font-display text-3xl font-semibold leading-[1.04] sm:text-5xl">
                Rich product presentation for modern automotive commerce.
              </h1>
              <p className="mt-4 text-base leading-8 text-muted">
                Built like a luxury storefront with compatibility context, clear trust markers,
                and conversion-focused layouts.
              </p>
            </div>
            <Link className="btn-secondary" href="/dashboard">
              Dashboard
            </Link>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[32px] border border-border/70 bg-card-2 p-6">
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Featured SKUs", value: "1,240" },
                  { label: "Fast-moving category", value: "Filters + brakes" },
                  { label: "Fulfillment signal", value: "Same-day available" },
                ].map((item) => (
                  <div key={item.label} className="rounded-[24px] border border-border/70 bg-card px-5 py-5">
                    <div className="text-xs text-muted">{item.label}</div>
                    <div className="mt-3 text-lg font-semibold">{item.value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {[
                  { title: "Premium catalog", desc: "Big product cards, fitment confidence, and strong visual hierarchy." },
                  { title: "Smart filters", desc: "Filter by make, model, category, urgency, and verified stock." },
                  { title: "Luxury checkout flow", desc: "Cleaner quantity controls, price modules, and shipping status." },
                  { title: "Ops-grade order tracking", desc: "Buyers and sellers both get clear state changes and action prompts." },
                ].map((item) => (
                  <div key={item.title} className="rounded-[26px] border border-border/70 bg-card px-5 py-5">
                    <div className="text-xl font-semibold">{item.title}</div>
                    <div className="mt-3 text-sm leading-8 text-muted">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {[
                { title: "Brake systems", meta: "High-demand category", note: "Premium merchandising with urgency and trust." },
                { title: "Sensors + electronics", meta: "Margin opportunity", note: "Ideal for richer data, compatibility, and warranty info." },
                { title: "Fluids + maintenance", meta: "Repeat purchase flow", note: "Subscription-ready layouts for routine servicing." },
              ].map((item) => (
                <div key={item.title} className="rounded-[30px] border border-border/70 bg-card-2 p-6">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-primary">{item.meta}</div>
                  <div className="mt-3 text-2xl font-semibold">{item.title}</div>
                  <div className="mt-3 text-sm leading-8 text-muted">{item.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
