import type { Metadata } from "next";
import AssistantUI from "./ui";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "AI Assistant | MechanicAI",
};

export default function AssistantPage() {
  return <AssistantUI />;
}
