import Link from "next/link";
import { getProfile } from "../lib/auth/dal";
import { createSupabaseServerClient } from "../lib/supabase/server";
import AssistantClient, { type AssistantStoredConversation } from "./AssistantClient";

export default async function AssistantUI() {
  const profile = await getProfile();
  const canPersistHistory = Boolean(profile);
  const initialMode = profile?.role === "mechanic" ? "mechanic" : "customer";
  let data: AssistantStoredConversation[] = [];

  if (profile) {
    const supabase = await createSupabaseServerClient();
    const { data: history } = await supabase
      .from("assistant_conversations")
      .select("id, mode, title, preview, messages, updated_at")
      .order("updated_at", { ascending: false })
      .limit(8);

    data = (history ?? []) as AssistantStoredConversation[];
  }

  return (
    <div className="py-8 sm:py-10">
      <div className="container-app max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              {initialMode === "mechanic" ? "مساعد الميكانيكي" : "مساعد الزبون"}
            </div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              AI Assistant سهل وواضح من أول استخدام
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-muted sm:text-base">
              اكتب المشكلة كما هي، أو الصق شكوى العميل، وسيقوم المساعد بترتيب الحالة وإعطائك
              ردًا عمليًا ومباشرًا حسب الدور.
            </p>
          </div>

          <div className="flex gap-3">
            <Link className="btn-secondary" href="/dashboard">
              لوحة التحكم
            </Link>
            <Link className="btn-secondary" href="/choose-role">
              تغيير الدور
            </Link>
          </div>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-3">
          {[
            "للزبون: وصف بسيط للمشكلة والحصول على خطوة واضحة",
            "للميكانكي: تحويل الشكوى إلى تشخيص أولي سريع",
            "حفظ المحادثات تلقائيًا عند تسجيل الدخول",
          ].map((item) => (
            <div
              key={item}
              className="rounded-[24px] border border-border/70 bg-card/70 px-4 py-4 text-sm leading-7 text-muted backdrop-blur"
            >
              {item}
            </div>
          ))}
        </div>

        <AssistantClient
          initialMode={initialMode}
          initialHistory={data}
          canPersistHistory={canPersistHistory}
        />
      </div>
    </div>
  );
}
