"use client";

import { ArrowLeft, CarFront, CheckCircle2, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getRole, setAuthed, setRole, type Role } from "../components/auth";

const roles: Array<{
  value: Role;
  title: string;
  subtitle: string;
  badge: string;
  icon: typeof CarFront;
  highlights: string[];
}> = [
  {
    value: "customer",
    title: "مالك سيارة",
    subtitle: "اختر هذا المسار للوصول إلى المركبة، توصيات الزيوت، المتجر، ثم حجز الميكانيكي.",
    badge: "Client",
    icon: CarFront,
    highlights: ["اختيار السيارة", "بطاقات زيوت مرئية", "الدخول إلى المتجر", "حجز ميكانيكي"],
  },
  {
    value: "mechanic",
    title: "ميكانيكي",
    subtitle: "اختر هذا المسار لإدارة الطلبات الواردة، أعمال تغيير الزيت، الصيانة، وقائمة العملاء.",
    badge: "Mechanic",
    icon: Wrench,
    highlights: ["الطلبات الواردة", "أعمال vidange", "طلبات الصيانة", "إدارة الحالة"],
  },
];

export default function ChooseRole() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<Role>(() => getRole() ?? "customer");

  useEffect(() => {
    setAuthed(false);
  }, []);

  function continueToRole(role: Role) {
    setRole(role);
    setAuthed(false);
    router.push("/auth/register");
  }

  return (
    <div className="relative min-h-[100svh] overflow-hidden" dir="rtl">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.18),transparent_22%),radial-gradient(circle_at_85%_20%,rgba(96,165,250,0.12),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(248,250,252,0.96)_46%,rgba(255,255,255,0.98)_100%)] dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.2),transparent_22%),radial-gradient(circle_at_85%_20%,rgba(96,165,250,0.12),transparent_26%),linear-gradient(180deg,#0b0f19_0%,#111827_46%,#0a0a0f_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(37,99,235,0.04)_1px,transparent_1px),linear-gradient(180deg,rgba(37,99,235,0.03)_1px,transparent_1px)] bg-[size:92px_92px] opacity-30 dark:bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.02)_1px,transparent_1px)] dark:opacity-20" />
      <div className="pointer-events-none absolute right-[8%] top-24 -z-10 h-72 w-72 rounded-full bg-primary/18 blur-[150px]" />
      <div className="pointer-events-none absolute left-[10%] top-1/3 -z-10 h-80 w-80 rounded-full bg-sky-500/10 blur-[180px]" />

      <div className="container-app flex min-h-[100svh] items-center py-10 sm:py-16">
        <div className="w-full overflow-hidden rounded-[40px] border border-border bg-card/84 shadow-[0_42px_120px_-70px_var(--shadow-ambient-strong)] backdrop-blur-2xl">
          <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative p-6 sm:p-10 lg:p-12">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.16),transparent_32%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_32%)]" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold tracking-[0.24em] text-primary">
                  <ShieldCheck className="h-4 w-4" aria-hidden />
                  SAYARATI ACCESS
                </div>
                <h1 className="mt-6 font-display text-4xl font-semibold text-foreground sm:text-6xl">
                  اختر نوع الحساب
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-8 text-muted sm:text-base">
                  منصة سيارتي تعمل بدورين فقط لا غير: مالك سيارة لتجربة الخدمة والشراء والحجز،
                  وميكانيكي لإدارة التنفيذ والطلبات من لوحة تشغيل واحدة.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {[
                    { label: "تصميم RTL", value: "فاخر" },
                    { label: "النمط", value: "Light / Dark Blue" },
                    { label: "الواجهة", value: "Glassmorphism" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[24px] border border-border bg-card-2/80 p-4 shadow-[0_18px_50px_-36px_var(--shadow-ambient-strong)]"
                    >
                      <div className="text-xs tracking-[0.18em] text-muted">{item.label}</div>
                      <div className="mt-2 text-base font-semibold text-foreground">{item.value}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap gap-3 text-sm text-muted">
                  <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card-2/80 px-4 py-2">
                    <Sparkles className="h-4 w-4 text-primary" aria-hidden />
                    Tesla-style automotive SaaS
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card-2/80 px-4 py-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden />
                    دوران فقط: Client / Mechanic
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-border bg-card/74 p-6 sm:p-10 lg:border-r lg:border-t-0">
              <div className="grid gap-5">
                {roles.map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole === role.value;

                  return (
                    <button
                      key={role.value}
                      type="button"
                      onClick={() => setSelectedRole(role.value)}
                      className={[
                        "group relative overflow-hidden rounded-[30px] border p-6 text-right transition duration-300",
                        "bg-card/82 shadow-[0_24px_70px_-44px_var(--shadow-ambient-strong)] backdrop-blur-2xl",
                        isSelected
                          ? "border-primary/45 ring-1 ring-primary/30"
                          : "border-border hover:-translate-y-1 hover:border-primary/20",
                      ].join(" ")}
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.16),transparent_36%)] opacity-0 transition duration-300 group-hover:opacity-100 dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_36%)]" />
                      <div className="relative flex items-start justify-between gap-4">
                        <div>
                          <div className="inline-flex rounded-full border border-border bg-card-2/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                            {role.badge}
                          </div>
                          <h2 className="mt-5 text-2xl font-semibold text-foreground">{role.title}</h2>
                          <p className="mt-3 max-w-md text-sm leading-8 text-muted">{role.subtitle}</p>
                        </div>
                        <span className="inline-flex h-14 w-14 items-center justify-center rounded-[20px] border border-primary/20 bg-primary/10 text-primary">
                          <Icon className="h-7 w-7" aria-hidden />
                        </span>
                      </div>

                      <div className="relative mt-6 flex flex-wrap gap-2">
                        {role.highlights.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-border bg-card-2/80 px-3 py-2 text-xs text-muted"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      <div className="relative mt-7 flex items-center justify-between">
                        <span className="text-sm font-semibold text-primary">
                          {isSelected ? "تم اختيار هذا المسار" : "اضغط للاختيار"}
                        </span>
                        <ArrowLeft className="h-5 w-5 text-muted transition group-hover:text-primary" aria-hidden />
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                className="btn-primary mt-8 h-14 w-full px-8 text-base"
                onClick={() => continueToRole(selectedRole)}
              >
                {selectedRole === "customer" ? "إنشاء حساب كمالك سيارة" : "إنشاء حساب كميكانيكي"}
                <ArrowLeft className="h-5 w-5" aria-hidden />
              </button>
              <p className="mt-4 text-center text-sm leading-7 text-muted">
                بعد اختيار الدور، راح تروح مباشرة لصفحة إنشاء الحساب الخاصة بهذا المسار.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
