"use client";

import { CarFront, CheckCircle2, Clock3, Droplets, ListChecks, MapPin, Users, Wrench } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import RequireAuth from "../components/RequireAuth";
import {
  getServiceRequests,
  setServiceRequests,
  type ServiceRequest,
  type ServiceRequestStatus,
} from "../components/auth";

const defaultRequests: ServiceRequest[] = [
  {
    id: "seed-1",
    clientName: "عميل سيارتي",
    carType: "BMW 320i",
    carLabel: "BMW 320i - بنزين",
    requestedService: "تغيير زيت 5W-30",
    status: "pending",
    location: "الجزائر - حيدرة",
    mechanicName: "Hydra Premium Garage",
    notes: "تم إنشاء الطلب من التدفّق الأساسي للعميل.",
    source: "oil",
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-2",
    clientName: "عميل سيارتي",
    carType: "Toyota Corolla",
    carLabel: "Toyota Corolla - بنزين",
    requestedService: "صيانة دورية",
    status: "accepted",
    location: "وهران - المدينة الجديدة",
    mechanicName: "Vidange Center Oran",
    notes: "فحص سريع + تغيير فلاتر.",
    source: "maintenance",
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-3",
    clientName: "عميل سيارتي",
    carType: "Audi A4",
    carLabel: "Audi A4 - ديزل",
    requestedService: "تأكيد خدمة متجر",
    status: "completed",
    location: "قسنطينة - علي منجلي",
    mechanicName: "Constantine Auto Tech",
    notes: "العميل أنهى شراء الزيت ويحتاج تنفيذ الخدمة.",
    source: "store",
    createdAt: new Date().toISOString(),
  },
];

function statusTone(status: ServiceRequestStatus) {
  if (status === "completed") return "border-emerald-400/20 bg-emerald-400/10 text-emerald-200";
  if (status === "accepted") return "border-primary/20 bg-primary/10 text-primary";
  return "border-border bg-card-2/80 text-foreground";
}

function statusLabel(status: ServiceRequestStatus) {
  if (status === "pending") return "pending";
  if (status === "accepted") return "accepted";
  return "completed";
}

function SectionTitle({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-primary">
        {label}
      </div>
      <h2 className="mt-5 text-3xl font-semibold text-foreground">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-8 text-muted">{description}</p>
    </div>
  );
}

export default function MechanicDashboard() {
  const [requests, setRequests] = useState<ServiceRequest[]>(() => {
    if (typeof window === "undefined") return defaultRequests;
    const stored = getServiceRequests();
    return stored.length ? stored : defaultRequests;
  });

  useEffect(() => {
    if (!getServiceRequests().length) {
      setServiceRequests(defaultRequests);
    }
  }, []);

  const incomingRequests = requests;
  const oilJobs = useMemo(() => requests.filter((request) => request.source === "oil"), [requests]);
  const maintenanceRequests = useMemo(
    () => requests.filter((request) => request.source === "maintenance" || request.source === "store"),
    [requests],
  );
  const clients = useMemo(() => {
    const uniqueMap = new Map<string, { name: string; car: string; latestStatus: ServiceRequestStatus }>();

    for (const request of requests) {
      if (!uniqueMap.has(request.clientName)) {
        uniqueMap.set(request.clientName, {
          name: request.clientName,
          car: request.carType,
          latestStatus: request.status,
        });
      }
    }

    return [...uniqueMap.values()];
  }, [requests]);

  function updateStatus(requestId: string, nextStatus: ServiceRequestStatus) {
    setRequests((current) => {
      const next = current.map((request) =>
        request.id === requestId ? { ...request, status: nextStatus } : request,
      );
      setServiceRequests(next);
      return next;
    });
  }

  function RequestCard({ request }: { request: ServiceRequest }) {
    return (
      <article className="rounded-[28px] border border-border bg-card/84 p-5 shadow-[0_22px_70px_-44px_var(--shadow-ambient-strong)] backdrop-blur-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">{request.carType}</h3>
            <p className="mt-2 text-sm leading-7 text-muted">{request.requestedService}</p>
          </div>
          <span className={["rounded-full border px-3 py-2 text-xs font-semibold uppercase", statusTone(request.status)].join(" ")}>
            {statusLabel(request.status)}
          </span>
        </div>

        <div className="mt-4 grid gap-3 text-sm text-muted">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" aria-hidden />
            الموقع: {request.location}
          </div>
          <div>العميل: {request.clientName}</div>
          <div>نوع الطلب: {request.source === "oil" ? "Oil Change" : "Maintenance"}</div>
          <div>الملاحظات: {request.notes}</div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {request.status === "pending" ? (
            <button
              type="button"
              onClick={() => updateStatus(request.id, "accepted")}
              className="inline-flex h-11 items-center justify-center rounded-full border border-primary/20 bg-primary/10 px-5 text-sm font-semibold text-primary"
            >
              قبول الطلب
            </button>
          ) : null}

          {request.status !== "completed" ? (
            <button
              type="button"
              onClick={() => updateStatus(request.id, request.status === "pending" ? "accepted" : "completed")}
              className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-card-2/80 px-5 text-sm font-semibold text-foreground"
            >
              {request.status === "accepted" ? "تأكيد الإكمال" : "تحديث الحالة"}
            </button>
          ) : null}

          <button
            type="button"
            onClick={() => updateStatus(request.id, "completed")}
            className="inline-flex h-11 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10 px-5 text-sm font-semibold text-emerald-200"
          >
            إنهاء الخدمة
          </button>
        </div>
      </article>
    );
  }

  return (
    <RequireAuth role="mechanic">
      <div className="relative min-h-[100svh] overflow-hidden py-10 sm:py-14" dir="rtl">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.16),transparent_22%),radial-gradient(circle_at_85%_20%,rgba(96,165,250,0.12),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(248,250,252,0.96)_44%,rgba(255,255,255,0.98)_100%)] dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_22%),radial-gradient(circle_at_85%_20%,rgba(96,165,250,0.12),transparent_26%),linear-gradient(180deg,#0b0f19_0%,#111827_44%,#0a0a0f_100%)]" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(37,99,235,0.04)_1px,transparent_1px),linear-gradient(180deg,rgba(37,99,235,0.03)_1px,transparent_1px)] bg-[size:88px_88px] opacity-30 dark:bg-[linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.02)_1px,transparent_1px)] dark:opacity-20" />
        <div className="pointer-events-none absolute right-[10%] top-20 -z-10 h-72 w-72 rounded-full bg-primary/16 blur-[140px]" />
        <div className="pointer-events-none absolute left-[10%] top-1/3 -z-10 h-80 w-80 rounded-full bg-sky-500/10 blur-[170px]" />

        <div className="container-app max-w-7xl">
          <section className="rounded-[40px] border border-border bg-card/82 p-6 shadow-[0_36px_120px_-68px_var(--shadow-ambient-strong)] backdrop-blur-2xl sm:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <SectionTitle
                label="MECHANIC DASHBOARD"
                title="لوحة الميكانيكي"
                description="لوحة تشغيل فاخرة لإدارة الطلبات الواردة، أعمال vidange، طلبات الصيانة، وقائمة العملاء مع إمكانيات قبول الطلب وتحديث الحالة وتأكيد إكمال الخدمة."
              />

              <div className="grid gap-3 sm:grid-cols-4">
                {[
                  { icon: ListChecks, label: "الطلبات الواردة", value: incomingRequests.length },
                  { icon: Droplets, label: "أعمال تغيير الزيت", value: oilJobs.length },
                  { icon: Wrench, label: "طلبات الصيانة", value: maintenanceRequests.length },
                  { icon: Users, label: "قائمة العملاء", value: clients.length },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="rounded-[24px] border border-border bg-card/78 p-4 text-foreground shadow-[0_18px_50px_-36px_var(--shadow-ambient-strong)] backdrop-blur-xl"
                    >
                      <Icon className="h-5 w-5 text-primary" aria-hidden />
                      <div className="mt-3 text-2xl font-semibold">{item.value}</div>
                      <div className="mt-1 text-xs text-muted">{item.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { icon: Clock3, label: "Pending", description: "طلبات جديدة بانتظار القبول والتوزيع." },
                { icon: Wrench, label: "Accepted", description: "طلبات جرى قبولها ويمكن تحديث حالتها أثناء التنفيذ." },
                { icon: CheckCircle2, label: "Completed", description: "طلبات اكتملت ويمكن تأكيد الإنجاز النهائي للعميل." },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="rounded-[24px] border border-border bg-card/78 p-5 shadow-[0_18px_50px_-36px_var(--shadow-ambient-strong)] backdrop-blur-xl"
                  >
                    <Icon className="h-5 w-5 text-primary" aria-hidden />
                    <div className="mt-4 text-sm font-semibold text-foreground">{item.label}</div>
                    <div className="mt-2 text-sm leading-7 text-muted">{item.description}</div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mt-8 rounded-[34px] border border-border bg-card/82 p-6 shadow-[0_28px_90px_-54px_var(--shadow-ambient-strong)] backdrop-blur-2xl sm:p-8">
            <SectionTitle
              label="INCOMING"
              title="الطلبات الواردة"
              description="كل طلب يعرض نوع السيارة والخدمة المطلوبة والحالة الحالية مع أدوات قبول وتحديث وإنهاء."
            />
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              {incomingRequests.map((request) => (
                <RequestCard key={request.id} request={request} />
              ))}
            </div>
          </section>

          <section className="mt-8 grid gap-8 xl:grid-cols-2">
            <div className="rounded-[34px] border border-border bg-card/78 p-6 shadow-[0_28px_90px_-54px_var(--shadow-ambient-strong)] backdrop-blur-2xl sm:p-8">
              <SectionTitle
                label="VIDANGE JOBS"
                title="أعمال تغيير الزيت"
                description="طلبات الزيت التي وصلت من تدفّق العميل أو من اختيار منتج داخل المنصة."
              />
              <div className="mt-8 space-y-4">
                {oilJobs.map((request) => (
                  <RequestCard key={request.id} request={request} />
                ))}
              </div>
            </div>

            <div className="rounded-[34px] border border-border bg-card/82 p-6 shadow-[0_28px_90px_-54px_var(--shadow-ambient-strong)] backdrop-blur-2xl sm:p-8">
              <SectionTitle
                label="MAINTENANCE"
                title="طلبات الصيانة"
                description="طلبات الصيانة العامة أو الطلبات القادمة بعد التفاعل مع المتجر والخدمات."
              />
              <div className="mt-8 space-y-4">
                {maintenanceRequests.map((request) => (
                  <RequestCard key={request.id} request={request} />
                ))}
              </div>
            </div>
          </section>

          <section className="mt-8 rounded-[34px] border border-border bg-card/78 p-6 shadow-[0_28px_90px_-54px_var(--shadow-ambient-strong)] backdrop-blur-2xl sm:p-8">
            <SectionTitle
              label="CLIENT LIST"
              title="قائمة العملاء"
              description="عرض مركّز للعملاء المرتبطين بالطلبات الحالية مع آخر حالة معروفة لكل عميل."
            />

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {clients.map((client) => (
                <article
                  key={`${client.name}-${client.car}`}
                  className="rounded-[26px] border border-border bg-card/82 p-5 shadow-[0_22px_70px_-44px_var(--shadow-ambient-strong)] backdrop-blur-xl"
                >
                  <CarFront className="h-5 w-5 text-primary" aria-hidden />
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{client.name}</h3>
                  <div className="mt-2 text-sm text-muted">{client.car}</div>
                  <div className="mt-4 inline-flex rounded-full border border-border bg-card-2/80 px-3 py-2 text-xs font-semibold uppercase text-foreground">
                    {statusLabel(client.latestStatus)}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </RequireAuth>
  );
}
