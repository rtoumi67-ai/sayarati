import type { Metadata } from "next";
import DashboardUI from "./ui";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard | MechanicAI",
};

export default function DashboardPage() {
  return <DashboardUI />;
}
