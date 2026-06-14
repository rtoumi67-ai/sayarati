import type { Metadata } from "next";
import PartsUI from "./ui";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Spare Parts | MechanicAI",
};

export default function PartsPage() {
  return <PartsUI />;
}
