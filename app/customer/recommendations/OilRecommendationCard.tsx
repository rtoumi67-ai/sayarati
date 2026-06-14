"use client";

import Image from "next/image";
import type { RecommendedOil } from "./oil-recommendation";

type OilRecommendationCardProps = {
  oil: RecommendedOil;
};

export default function OilRecommendationCard({ oil }: OilRecommendationCardProps) {
  return (
    <div className="mt-4 overflow-hidden rounded-2xl border hairline bg-card/40">
      {oil.image_url ? (
        <Image
          src={oil.image_url}
          alt={oil.product_name || oil.brand || "Recommended oil"}
          width={768}
          height={512}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="h-48 w-full object-cover"
        />
      ) : null}

      <div className="space-y-3 p-4">
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          {oil.viscosity ? (
            <span className="rounded-full bg-primary/15 px-3 py-1 text-primary">
              {oil.viscosity}
            </span>
          ) : null}
          {oil.brand ? (
            <span className="rounded-full bg-card-2 px-3 py-1 text-muted">{oil.brand}</span>
          ) : null}
        </div>

        <div className="text-base font-semibold text-foreground">
          {oil.product_name || oil.brand || "Recommended oil"}
        </div>

        <div className="text-sm leading-6 text-muted">{oil.explanation}</div>
      </div>
    </div>
  );
}
