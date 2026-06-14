"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  CalendarDays,
  CarFront,
  CheckCircle2,
  ClipboardList,
  Droplets,
  Gauge,
  MapPin,
  Package,
  ShoppingBag,
  Sparkles,
  Star,
  UserCircle2,
  Wrench,
} from "lucide-react";

const heroVehicle = "/assets/doblo.jpg";
const logoSrc = "/favicon.ico";
const goldAccent = "#C9A84C";

const vehicleCatalog = {
  BMW: ["X5", "320i", "M4"],
  Audi: ["A6", "Q5", "A4"],
  Mercedes: ["C200", "E300", "GLE 450"],
  Toyota: ["Camry", "Corolla", "RAV4"],
  Hyundai: ["Sonata", "Elantra", "Tucson"],
} as const;

const engineOptions = ["بنزين", "ديزل", "هايبرد"] as const;

const storeProducts = [
  {
    category: "زيوت محركات",
    title: "مجموعة زيوت أوروبية معتمدة",
    subtitle: "تشمل 5W30 و5W40 للمحركات الحديثة",
    image:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=luxury%20automotive%20engine%20oil%20bottles%20displayed%20on%20a%20premium%20dark%20glass%20shelf%2C%20gold%20accent%20lighting%2C%20high-end%20saas%20product%20photography%2C%20realistic%2C%20clean%20studio%20background&image_size=landscape_4_3",
  },
  {
    category: "قطع غيار",
    title: "قطع أصلية وفلاتر عالية الاعتمادية",
    subtitle: "فلاتر زيت وهواء وفرامل ضمن بطاقات شراء واضحة",
    image:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=premium%20automotive%20spare%20parts%20layout%20with%20filters%2C%20brake%20pads%2C%20and%20performance%20components%20on%20dark%20reflective%20surface%2C%20cinematic%20gold%20rim%20light%2C%20luxury%20ecommerce%20product%20photography&image_size=landscape_4_3",
  },
  {
    category: "خدمات",
    title: "باقات صيانة وتشخيص وخدمة دورية",
    subtitle: "خدمة تغيير زيت وتشخيص وصيانة مجدولة داخل متجر موحد",
    image:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=premium%20automotive%20service%20bay%20with%20mechanic%20tools%2C%20diagnostic%20tablet%2C%20sleek%20dark%20garage%20interior%2C%20gold%20highlights%2C%20luxury%20startup%20visual%2C%20realistic&image_size=landscape_4_3",
  },
];

const mechanics = [
  {
    name: "م. ياسين قندوز",
    location: "عنابة، حي الصفصاف",
    rating: 4.9,
    services: ["تغيير زيت", "تشخيص أعطال", "صيانة دورية"],
    image:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=professional%20arab%20mechanic%20portrait%20inside%20a%20premium%20dark%20garage%2C%20wearing%20clean%20black%20uniform%2C%20gold%20accent%20lighting%2C%20high-end%20automotive%20service%20brand%20photography&image_size=square_hd",
  },
  {
    name: "م. سفيان بوحفص",
    location: "قسنطينة، زواغي",
    rating: 4.8,
    services: ["صيانة دورية", "فحص كمبيوتر", "تبديل فلاتر"],
    image:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=experienced%20north%20african%20mechanic%20with%20diagnostic%20tablet%20in%20a%20luxury%20service%20garage%2C%20dark%20premium%20interior%2C%20gold%20light%20accents%2C%20realistic%20editorial%20portrait&image_size=square_hd",
  },
  {
    name: "م. أمين زغدود",
    location: "الطارف، وسط المدينة",
    rating: 4.7,
    services: ["تغيير زيت", "صيانة وقائية", "فحص أعطال"],
    image:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=confident%20automotive%20technician%20in%20a%20tesla-style%20premium%20garage%2C%20dark%20metallic%20background%2C%20subtle%20gold%20glow%2C%20realistic%20luxury%20service%20portrait&image_size=square_hd",
  },
];

const mechanicRequests = [
  {
    carType: "BMW X5",
    requestedService: "تغيير زيت وفحص شامل",
    status: "pending",
  },
  {
    carType: "Toyota Camry",
    requestedService: "صيانة دورية 10,000 كم",
    status: "accepted",
  },
  {
    carType: "Mercedes E300",
    requestedService: "تشخيص لمبة المحرك",
    status: "completed",
  },
  {
    carType: "Hyundai Tucson",
    requestedService: "تبديل فلاتر وزيت",
    status: "pending",
  },
];

const mechanicClients = [
  { name: "أحمد بن عيسى", car: "Audi A6", lastVisit: "قبل يومين" },
  { name: "سميرة بوحفص", car: "Toyota RAV4", lastVisit: "اليوم" },
  { name: "رياض قاسمي", car: "Mercedes C200", lastVisit: "قبل أسبوع" },
];

type Role = "client" | "mechanic";
type Brand = keyof typeof vehicleCatalog;
type EngineType = (typeof engineOptions)[number];

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-[11px] font-bold tracking-[0.32em] text-primary uppercase">
        <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_18px_var(--glow-primary)]" />
        {eyebrow}
      </div>
      <h2 className="mt-6 font-display text-3xl font-black leading-tight text-foreground sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-8 text-muted sm:text-lg">{description}</p>
    </div>
  );
}

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={["card", className].join(" ")}>{children}</div>;
}

function statusLabel(status: string) {
  if (status === "pending") return "pending";
  if (status === "accepted") return "accepted";
  return "completed";
}

function statusTone(status: string) {
  if (status === "pending") return "border-amber-400/30 bg-amber-400/10 text-amber-200";
  if (status === "accepted") return "border-sky-400/30 bg-sky-400/10 text-sky-200";
  return "border-emerald-400/30 bg-emerald-400/10 text-emerald-200";
}

export default function LandingUI() {
  const [activeRole, setActiveRole] = useState<Role>("client");
  const [selectedBrand, setSelectedBrand] = useState<Brand>("BMW");
  const [selectedModel, setSelectedModel] = useState<string>(vehicleCatalog.BMW[0]);
  const [selectedEngine, setSelectedEngine] = useState<EngineType>("بنزين");
  const [storeOpen, setStoreOpen] = useState(false);

  const recommendedOils = useMemo(() => {
    const viscosities =
      selectedEngine === "ديزل"
        ? ["5W40"]
        : ["BMW", "Audi", "Mercedes"].includes(selectedBrand)
          ? ["5W30", "5W40"]
          : ["Toyota", "Hyundai"].includes(selectedBrand)
            ? ["5W30"]
            : ["5W30"];

    return viscosities.map((viscosity, index) => ({
      brand:
        selectedBrand === "BMW" || selectedBrand === "Audi" || selectedBrand === "Mercedes"
          ? "Liqui Moly"
          : "TotalEnergies",
      productName:
        selectedEngine === "ديزل"
          ? `${selectedBrand} Diesel Protection`
          : `${selectedBrand} Premium Engine Oil`,
      viscosity,
      image:
        index % 2 === 0
          ? "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=premium%20engine%20oil%20bottle%20for%20luxury%20car%20maintenance%2C%20dark%20automotive%20saas%20product%20shot%2C%20gold%20accents%2C%20realistic%2C%20clean%20glass%20surface&image_size=portrait_4_3"
          : "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=high-end%20motor%20oil%20product%20photography%20for%20automotive%20store%2C%20premium%20dark%20background%2C%20cinematic%20gold%20light%2C%20realistic&image_size=portrait_4_3",
    }));
  }, [selectedBrand, selectedEngine]);

  const dashboardStats = [
    { label: "Incoming service requests", value: "18", icon: ClipboardList },
    { label: "Oil change jobs", value: "07", icon: Droplets },
    { label: "Maintenance requests", value: "11", icon: Wrench },
    { label: "Client list", value: "56", icon: UserCircle2 },
  ];

  return (
    <div className="dark" dir="rtl">
      <div className="relative overflow-hidden bg-background text-foreground">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(201,168,76,0.18),transparent_20%),radial-gradient(circle_at_82%_14%,rgba(201,168,76,0.16),transparent_18%),linear-gradient(180deg,#040506_0%,#090b0e_48%,#050608_100%)]" />
          <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(201,168,76,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(201,168,76,0.05)_1px,transparent_1px)] [background-size:120px_120px]" />
          <div className="absolute inset-x-[22%] top-0 h-56 rounded-full bg-primary/18 blur-[110px]" />
        </div>

        <header className="relative z-20">
          <div className="container-app pt-5">
            <GlassCard className="rounded-full border-white/8 bg-card/70 px-5 py-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-black/30">
                    <Image src={logoSrc} alt="Sayarati" width={28} height={28} className="h-7 w-7" />
                  </div>
                  <div>
                    <div className="font-display text-xl font-black">سيارتي</div>
                    <div className="text-[11px] tracking-[0.36em] text-primary/80 uppercase">SAYARATI</div>
                  </div>
                </div>
                <div className="hidden items-center gap-3 text-sm text-muted md:flex">
                  <a href="#roles" className="transition hover:text-foreground">
                    اختر نوع الحساب
                  </a>
                  <a href="#oil" className="transition hover:text-foreground">
                    توصيات الزيوت
                  </a>
                  <a href="#mechanics" className="transition hover:text-foreground">
                    الميكانيكيون
                  </a>
                  <a href="#dashboard" className="transition hover:text-foreground">
                    لوحة الميكانيكي
                  </a>
                </div>
              </div>
            </GlassCard>
          </div>
        </header>

        <main className="relative z-10">
          <section className="container-app grid min-h-[calc(100svh-96px)] items-center gap-10 pb-16 pt-10 lg:grid-cols-[0.94fr_minmax(0,1.06fr)] lg:pb-24">
            <div className="order-2 space-y-8 lg:order-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs font-bold tracking-[0.3em] text-primary uppercase">
                <Sparkles className="h-4 w-4" aria-hidden />
                Premium Automotive SaaS
              </div>

              <div className="space-y-5">
                <h1 className="max-w-3xl font-display text-4xl font-black leading-[1.02] sm:text-6xl lg:text-[4.65rem]">
                  قرارات صيانة أفضل تبدأ بمعلومات أوضح.
                </h1>
                <p className="max-w-2xl text-base leading-8 text-muted sm:text-xl sm:leading-10">
                  من سجل الصيانة وتوصيات الزيوت المناسبة إلى تشخيص الأعطال وحجز الخدمات، تمنحك
                  سيارتي رؤية أوضح وتحكماً أكبر في كل ما يخص سيارتك، لتتخذ قرارات صيانة أكثر ذكاءً
                  وتجنب التكاليف غير المتوقعة.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <a href="#roles" className="btn-primary h-14 px-8 text-base">
                  ابدأ الآن
                  <ArrowLeft className="h-5 w-5" aria-hidden />
                </a>
                <a href="#oil" className="btn-secondary h-14 px-8 text-base">
                  اعرف الزيت المناسب لسيارتك
                  <ArrowLeft className="h-5 w-5" aria-hidden />
                </a>
              </div>

              <GlassCard id="roles" className="p-5 sm:p-6">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <div className="text-xs font-bold tracking-[0.28em] text-primary uppercase">
                      Role Selection
                    </div>
                    <h2 className="mt-3 text-2xl font-black text-foreground">اختر نوع الحساب</h2>
                    <p className="mt-2 max-w-xl text-sm leading-7 text-muted">
                      واجهة واحدة بتجربتين فقط: مالك سيارة يبدأ من المركبة والزيت والمتجر والحجز،
                      أو ميكانيكي يدير الطلبات والخدمة من لوحة تنفيذية واضحة.
                    </p>
                  </div>
                  <div className="inline-flex rounded-full border border-primary/20 bg-black/20 p-1">
                    <button
                      type="button"
                      onClick={() => setActiveRole("client")}
                      className={[
                        "rounded-full px-5 py-3 text-sm font-bold transition",
                        activeRole === "client"
                          ? "bg-primary text-primary-foreground shadow-[0_18px_42px_-28px_rgba(201,168,76,0.7)]"
                          : "text-muted hover:text-foreground",
                      ].join(" ")}
                    >
                      مالك سيارة (Client)
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveRole("mechanic")}
                      className={[
                        "rounded-full px-5 py-3 text-sm font-bold transition",
                        activeRole === "mechanic"
                          ? "bg-primary text-primary-foreground shadow-[0_18px_42px_-28px_rgba(201,168,76,0.7)]"
                          : "text-muted hover:text-foreground",
                      ].join(" ")}
                    >
                      ميكانيكي (Mechanic)
                    </button>
                  </div>
                </div>
              </GlassCard>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { value: "5W30 / 5W40", label: "توصيات زيوت حسب العلامة والمحرك" },
                  { value: "24/7", label: "تشخيص أوضح قبل الحجز" },
                  { value: "4.9/5", label: "تجربة خدمة وميكانيكيين مقيمين" },
                ].map((item) => (
                  <GlassCard key={item.label} className="p-4">
                    <div className="text-xl font-black text-primary">{item.value}</div>
                    <div className="mt-2 text-sm leading-6 text-muted">{item.label}</div>
                  </GlassCard>
                ))}
              </div>
            </div>

            <div className="order-1 mx-auto w-full max-w-[820px] lg:order-2">
              <div className="relative">
                <div className="absolute inset-x-[16%] top-10 h-32 rounded-full bg-primary/20 blur-[78px]" />
                <div className="absolute -right-2 top-12 z-20 hidden w-52 rounded-[28px] border border-primary/20 bg-black/45 p-4 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.9)] backdrop-blur-2xl sm:block">
                  <div className="text-[11px] font-bold tracking-[0.24em] text-primary uppercase">
                    Maintenance Intelligence
                  </div>
                  <div className="mt-3 text-2xl font-black text-white">+31%</div>
                  <div className="mt-1 text-sm leading-6 text-white/72">
                    قرارات أسرع من توصية الزيت إلى الحجز والتنفيذ.
                  </div>
                </div>
                <div className="absolute -left-2 bottom-8 z-20 hidden w-56 rounded-[28px] border border-primary/20 bg-black/55 p-4 backdrop-blur-2xl sm:block">
                  <div className="flex items-center gap-2 text-primary">
                    <CheckCircle2 className="h-4 w-4" aria-hidden />
                    <span className="text-[11px] font-bold tracking-[0.24em] uppercase">
                      Premium Control
                    </span>
                  </div>
                  <div className="mt-3 text-lg font-bold text-white">
                    سجل واضح، زيت أدق، ميكانيكي أقرب.
                  </div>
                </div>

                <GlassCard className="overflow-hidden p-4 sm:p-5">
                  <div className="relative overflow-hidden rounded-[34px] border border-white/8 bg-black">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(255,255,255,0.18),transparent_22%),radial-gradient(circle_at_82%_14%,rgba(201,168,76,0.22),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0.76))]" />
                    <Image
                      src={heroVehicle}
                      alt="سيارة معروضة ضمن واجهة سيارتي"
                      width={1280}
                      height={860}
                      priority
                      quality={90}
                      sizes="(max-width: 1024px) 100vw, 52vw"
                      className="relative z-10 h-[520px] w-full object-cover object-center saturate-[1.06] contrast-125"
                    />
                    <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,transparent_36%,rgba(0,0,0,0.68)_100%)]" />

                    <div className="absolute right-5 top-5 z-30 rounded-[26px] border border-primary/20 bg-black/52 px-5 py-4 backdrop-blur-2xl">
                      <div className="text-[11px] font-bold tracking-[0.22em] text-primary uppercase">
                        Hero Visual
                      </div>
                      <div className="mt-2 text-lg font-bold text-white">Dark Glass Experience</div>
                    </div>

                    <div className="absolute bottom-5 left-5 right-5 z-30 grid gap-3 md:grid-cols-3">
                      {[
                        { label: "Role-based system", value: "2 Roles", icon: CarFront },
                        { label: "Oil recommendation", value: "Smart Match", icon: Droplets },
                        { label: "Mechanic booking", value: "Nearby Pros", icon: MapPin },
                      ].map((item) => {
                        const Icon = item.icon;
                        return (
                          <div
                            key={item.label}
                            className="rounded-[24px] border border-white/8 bg-black/55 px-4 py-4 text-white backdrop-blur-2xl"
                          >
                            <div className="flex items-center gap-2 text-primary">
                              <Icon className="h-4 w-4" aria-hidden />
                              <span className="text-[11px] font-bold tracking-[0.22em] uppercase">
                                {item.value}
                              </span>
                            </div>
                            <div className="mt-2 text-sm text-white/72">{item.label}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </section>

          <section className="border-t border-border/70 py-20 sm:py-24">
            <div className="container-app">
              <SectionHeader
                eyebrow={activeRole === "client" ? "Client Flow" : "Mechanic Flow"}
                title={
                  activeRole === "client"
                    ? "Client → Vehicle → Oil → Store → Mechanics"
                    : "Mechanic → Dashboard → Requests → Service Management"
                }
                description={
                  activeRole === "client"
                    ? "تدفق عميل واضح يبدأ من بيانات المركبة ثم يقدّم توصيات زيت مرئية، متجر منتجات وخدمات، ثم بطاقات ميكانيكيين قريبة للحجز."
                    : "لوحة تنفيذية للميكانيكي تعرض الطلبات الواردة، أعمال تغيير الزيت، طلبات الصيانة، وقائمة العملاء مع إجراءات مباشرة لإدارة الخدمة."
                }
              />

              {activeRole === "client" ? (
                <div className="mt-14 grid gap-8">
                  <GlassCard className="p-6 sm:p-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <div className="text-xs font-bold tracking-[0.24em] text-primary uppercase">
                          Step 1
                        </div>
                        <h3 className="mt-2 text-2xl font-black text-foreground">
                          اختيار السيارة والمحرك
                        </h3>
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                          اختر العلامة التجارية والموديل ونوع المحرك حتى يتم توليد توصيات الزيت
                          الصحيحة لك بشكل فوري.
                        </p>
                      </div>
                      <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold tracking-[0.2em] text-primary uppercase">
                        Client Role Active
                      </div>
                    </div>

                    <div className="mt-8 grid gap-4 lg:grid-cols-3">
                      <label className="grid gap-2 text-sm text-muted">
                        <span>العلامة التجارية</span>
                        <select
                          value={selectedBrand}
                          onChange={(event) => {
                            const brand = event.target.value as Brand;
                            setSelectedBrand(brand);
                            setSelectedModel(vehicleCatalog[brand][0]);
                          }}
                          className="input"
                        >
                          {Object.keys(vehicleCatalog).map((brand) => (
                            <option key={brand} value={brand}>
                              {brand}
                            </option>
                          ))}
                        </select>
                      </label>

                      <label className="grid gap-2 text-sm text-muted">
                        <span>الموديل</span>
                        <select
                          value={selectedModel}
                          onChange={(event) => setSelectedModel(event.target.value)}
                          className="input"
                        >
                          {vehicleCatalog[selectedBrand].map((model) => (
                            <option key={model} value={model}>
                              {model}
                            </option>
                          ))}
                        </select>
                      </label>

                      <label className="grid gap-2 text-sm text-muted">
                        <span>نوع المحرك</span>
                        <select
                          value={selectedEngine}
                          onChange={(event) => setSelectedEngine(event.target.value as EngineType)}
                          className="input"
                        >
                          {engineOptions.map((engine) => (
                            <option key={engine} value={engine}>
                              {engine}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  </GlassCard>

                  <div id="oil" className="grid gap-6">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <div className="text-xs font-bold tracking-[0.24em] text-primary uppercase">
                          Step 2
                        </div>
                        <h3 className="mt-2 text-2xl font-black text-foreground">
                          توصيات الزيت المناسبة
                        </h3>
                      </div>
                      <div className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                        {selectedBrand} {selectedModel} / {selectedEngine}
                      </div>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                      {recommendedOils.map((oil) => (
                        <GlassCard key={`${oil.productName}-${oil.viscosity}`} className="overflow-hidden">
                          <div className="relative h-64">
                            <Image
                              src={oil.image}
                              alt={oil.productName}
                              fill
                              sizes="(max-width: 1024px) 100vw, 50vw"
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.72)_100%)]" />
                            <div className="absolute right-4 top-4 rounded-full border border-primary/25 bg-black/45 px-3 py-1 text-xs font-bold tracking-[0.16em] text-primary uppercase backdrop-blur-xl">
                              {oil.viscosity}
                            </div>
                          </div>
                          <div className="p-6">
                            <div className="text-sm text-primary">{oil.brand}</div>
                            <div className="mt-2 text-2xl font-black text-foreground">
                              {oil.productName}
                            </div>
                            <div className="mt-2 text-sm leading-7 text-muted">
                              لزوجة موصى بها لمحرك {selectedBrand} {selectedModel} مع توافق مباشر
                              مع احتياج {selectedEngine}.
                            </div>
                            <button
                              type="button"
                              onClick={() => setStoreOpen(true)}
                              className="btn-primary mt-6 w-full"
                            >
                              عرض في المتجر
                              <ArrowLeft className="h-4 w-4" aria-hidden />
                            </button>
                          </div>
                        </GlassCard>
                      ))}
                    </div>
                  </div>

                  <GlassCard className="p-6 sm:p-8">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <div className="text-xs font-bold tracking-[0.24em] text-primary uppercase">
                          Step 3
                        </div>
                        <h3 className="mt-2 text-2xl font-black text-foreground">الدخول إلى المتجر</h3>
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                          المتجر يعرض زيوت المحركات وقطع الغيار والخدمات ضمن بطاقات مرئية قابلة
                          للاستكشاف بنفس الواجهة الفاخرة.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setStoreOpen(true)}
                        className="btn-primary h-14 px-8 text-base"
                      >
                        الدخول إلى المتجر
                        <ShoppingBag className="h-5 w-5" aria-hidden />
                      </button>
                    </div>

                    {storeOpen ? (
                      <div className="mt-8 grid gap-6 lg:grid-cols-3">
                        {storeProducts.map((product) => (
                          <GlassCard key={product.title} className="overflow-hidden">
                            <div className="relative h-56">
                              <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                sizes="(max-width: 1024px) 100vw, 33vw"
                                className="object-cover"
                              />
                              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_10%,rgba(0,0,0,0.78)_100%)]" />
                              <div className="absolute right-4 top-4 rounded-full border border-primary/25 bg-black/45 px-3 py-1 text-xs font-bold tracking-[0.16em] text-primary uppercase backdrop-blur-xl">
                                {product.category}
                              </div>
                            </div>
                            <div className="p-6">
                              <div className="text-xl font-black text-foreground">{product.title}</div>
                              <div className="mt-3 text-sm leading-7 text-muted">{product.subtitle}</div>
                            </div>
                          </GlassCard>
                        ))}
                      </div>
                    ) : null}
                  </GlassCard>

                  <div id="mechanics" className="grid gap-6">
                    <div>
                      <div className="text-xs font-bold tracking-[0.24em] text-primary uppercase">
                        Step 4
                      </div>
                      <h3 className="mt-2 text-2xl font-black text-foreground">
                        ميكانيكيون قريبون للحجز
                      </h3>
                    </div>
                    <div className="grid gap-6 lg:grid-cols-3">
                      {mechanics.map((mechanic) => (
                        <GlassCard key={mechanic.name} className="overflow-hidden">
                          <div className="relative h-64">
                            <Image
                              src={mechanic.image}
                              alt={mechanic.name}
                              fill
                              sizes="(max-width: 1024px) 100vw, 33vw"
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_5%,rgba(0,0,0,0.82)_100%)]" />
                          </div>
                          <div className="p-6">
                            <div className="text-xl font-black text-foreground">{mechanic.name}</div>
                            <div className="mt-3 flex items-center gap-2 text-sm text-muted">
                              <MapPin className="h-4 w-4 text-primary" aria-hidden />
                              {mechanic.location}
                            </div>
                            <div className="mt-3 flex items-center gap-2 text-sm text-primary">
                              <Star className="h-4 w-4 fill-current" aria-hidden />
                              {mechanic.rating}
                            </div>
                            <div className="mt-4 flex flex-wrap gap-2">
                              {mechanic.services.map((service) => (
                                <span
                                  key={service}
                                  className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-foreground"
                                >
                                  {service}
                                </span>
                              ))}
                            </div>
                            <button type="button" className="btn-secondary mt-6 w-full">
                              احجز ميكانيكي
                              <ArrowLeft className="h-4 w-4" aria-hidden />
                            </button>
                          </div>
                        </GlassCard>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div id="dashboard" className="mt-14 grid gap-8">
                  <div className="grid gap-4 lg:grid-cols-4">
                    {dashboardStats.map((item) => {
                      const Icon = item.icon;
                      return (
                        <GlassCard key={item.label} className="p-5">
                          <div className="flex items-center justify-between gap-4">
                            <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                              <Icon className="h-6 w-6" aria-hidden />
                            </span>
                            <div className="text-3xl font-black text-primary">{item.value}</div>
                          </div>
                          <div className="mt-4 text-sm leading-7 text-muted">{item.label}</div>
                        </GlassCard>
                      );
                    })}
                  </div>

                  <GlassCard className="p-6 sm:p-8">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                      <div>
                        <div className="text-xs font-bold tracking-[0.24em] text-primary uppercase">
                          Mechanic Dashboard
                        </div>
                        <h3 className="mt-2 text-2xl font-black text-foreground">
                          الطلبات الواردة وإدارة الخدمة
                        </h3>
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                          كل بطاقة طلب تعرض نوع السيارة والخدمة المطلوبة والحالة الحالية مع إجراءات
                          مباشرة للقبول وتحديث الحالة وتأكيد الإنجاز.
                        </p>
                      </div>
                      <div className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold tracking-[0.18em] text-primary uppercase">
                        Mechanic Role Active
                      </div>
                    </div>

                    <div className="mt-8 grid gap-5 lg:grid-cols-2">
                      {mechanicRequests.map((request) => (
                        <div
                          key={`${request.carType}-${request.requestedService}`}
                          className="rounded-[28px] border border-border/80 bg-black/20 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
                                {request.carType}
                              </div>
                              <div className="mt-2 text-xl font-black text-foreground">
                                {request.requestedService}
                              </div>
                            </div>
                            <span
                              className={[
                                "rounded-full border px-3 py-1 text-xs font-bold uppercase",
                                statusTone(request.status),
                              ].join(" ")}
                            >
                              {statusLabel(request.status)}
                            </span>
                          </div>

                          <div className="mt-5 flex flex-wrap gap-3">
                            <button type="button" className="btn-secondary">
                              قبول الطلب
                            </button>
                            <button type="button" className="btn-secondary">
                              تحديث الحالة
                            </button>
                            <button type="button" className="btn-primary">
                              تأكيد الإنجاز
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>

                  <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <GlassCard className="p-6 sm:p-8">
                      <div className="flex items-center gap-3">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                          <Droplets className="h-6 w-6" aria-hidden />
                        </span>
                        <div>
                          <div className="text-xs font-bold tracking-[0.22em] text-primary uppercase">
                            Oil Change & Maintenance
                          </div>
                          <div className="mt-1 text-2xl font-black text-foreground">
                            أعمال تغيير الزيت والصيانة
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 grid gap-4 md:grid-cols-3">
                        {[
                          {
                            title: "Oil change (vidange)",
                            value: "07 jobs",
                            icon: Droplets,
                          },
                          {
                            title: "Maintenance requests",
                            value: "11 requests",
                            icon: Wrench,
                          },
                          {
                            title: "Diagnostics queue",
                            value: "05 pending",
                            icon: Gauge,
                          },
                        ].map((item) => {
                          const Icon = item.icon;
                          return (
                            <div
                              key={item.title}
                              className="rounded-[26px] border border-border/80 bg-black/20 p-5"
                            >
                              <Icon className="h-6 w-6 text-primary" aria-hidden />
                              <div className="mt-4 text-lg font-black text-foreground">{item.value}</div>
                              <div className="mt-2 text-sm leading-6 text-muted">{item.title}</div>
                            </div>
                          );
                        })}
                      </div>
                    </GlassCard>

                    <GlassCard className="p-6 sm:p-8">
                      <div className="flex items-center gap-3">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                          <UserCircle2 className="h-6 w-6" aria-hidden />
                        </span>
                        <div>
                          <div className="text-xs font-bold tracking-[0.22em] text-primary uppercase">
                            Client List
                          </div>
                          <div className="mt-1 text-2xl font-black text-foreground">قائمة العملاء</div>
                        </div>
                      </div>

                      <div className="mt-6 grid gap-3">
                        {mechanicClients.map((client) => (
                          <div
                            key={`${client.name}-${client.car}`}
                            className="rounded-[24px] border border-border/80 bg-black/20 p-4"
                          >
                            <div className="text-lg font-bold text-foreground">{client.name}</div>
                            <div className="mt-2 text-sm text-muted">{client.car}</div>
                            <div className="mt-1 text-xs tracking-[0.18em] text-primary uppercase">
                              {client.lastVisit}
                            </div>
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="border-t border-border/70 pb-20 pt-16 sm:pb-24">
            <div className="container-app">
              <GlassCard className="overflow-hidden p-6 sm:p-8">
                <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
                  <div className="space-y-4">
                    <div
                      className="inline-flex rounded-full border px-4 py-2 text-xs font-bold tracking-[0.28em] uppercase"
                      style={{
                        borderColor: "rgba(201,168,76,0.2)",
                        color: goldAccent,
                        backgroundColor: "rgba(201,168,76,0.08)",
                      }}
                    >
                      Tesla-style Premium UI
                    </div>
                    <h3 className="text-3xl font-black text-foreground">
                      تصميم SaaS سيارات فاخر بواجهة عربية RTL
                    </h3>
                    <p className="text-sm leading-8 text-muted">
                      الصفحة تعمل الآن كمدخل موحد لمنصة سيارتي مع هيرو بصري جديد وصورة المركبة من
                      مجلد الأصول، ثم تجربة مفصولة بدورين فقط: Client وMechanic.
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      {
                        title: "Vehicle Intelligence",
                        text: "اختيار المركبة يولد التوصية المناسبة بالزيت مباشرة.",
                        icon: CarFront,
                      },
                      {
                        title: "Visual Store",
                        text: "كل عنصر في المتجر يظهر كبطاقة منتج بصري مع صورة.",
                        icon: Package,
                      },
                      {
                        title: "Service Control",
                        text: "لوحة الميكانيكي تجمع الطلبات والحالات والعملاء في مكان واحد.",
                        icon: CalendarDays,
                      },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.title}
                          className="rounded-[28px] border border-border/80 bg-black/20 p-5"
                        >
                          <Icon className="h-6 w-6 text-primary" aria-hidden />
                          <div className="mt-4 text-lg font-black text-foreground">{item.title}</div>
                          <div className="mt-2 text-sm leading-7 text-muted">{item.text}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </GlassCard>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
