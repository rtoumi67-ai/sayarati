import type { Metadata } from "next";
import GaragesUI from "./ui";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Garages | MechanicAI",
};

export default function GaragesPage() {
  return <GaragesUI />;
}
