import Link from "next/link";
import { requireProfile } from "../lib/auth/dal";

export default async function GaragesUI() {
  await requireProfile();

  return (
    <div className="relative overflow-hidden py-10 sm:py-14">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-garage opacity-90" />
      <div className="container-app max-w-6xl">
        <div className="hud-shell neon-border neon-ring p-6 sm:p-10">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="chip w-fit">
                <span className="chip-dot bg-primary" />
                Garage Directory
              </div>
              <h1 className="mt-4 text-2xl font-semibold sm:text-4xl">
                Find a garage you can trust
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">
                Next step: live search, city filters, ratings/reviews, and map view with
                graceful fallback.
              </p>
            </div>
            <Link className="btn-secondary" href="/dashboard">
              Dashboard
            </Link>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <div className="card p-6">
              <div className="text-sm font-semibold">Search + filters</div>
              <div className="mt-2 text-sm leading-7 text-muted">
                City, services, verified, open now, rating minimum.
              </div>
            </div>
            <div className="card p-6">
              <div className="text-sm font-semibold">Garage profiles</div>
              <div className="mt-2 text-sm leading-7 text-muted">
                Hours, location, contact buttons, and booking entry points.
              </div>
            </div>
            <div className="card p-6">
              <div className="text-sm font-semibold">Reviews</div>
              <div className="mt-2 text-sm leading-7 text-muted">
                Verified reviews after bookings with moderation.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

