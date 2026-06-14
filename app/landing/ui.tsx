import type { CSSProperties, ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";
import {
  ActivitySquare,
  ArrowLeft,
  ArrowUpLeft,
  BadgeCheck,
  CalendarClock,
  CarFront,
  Check,
  Clock3,
  Cpu,
  Droplets,
  Gauge,
  Quote,
  ScrollText,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Wrench,
} from "lucide-react";

import { formatDaPrice, getAllOilStoreProducts, type StoreProduct } from "../customer/store/catalog";
import { SITE } from "../components/site";
import LandingMobileMenu from "./LandingMobileMenu";

const heroVehicle = "/assets/doblo.jpg";
const logoSrc = "/favicon.ico";

const landingTheme: CSSProperties = {
  ["--background" as string]: "#050608",
  ["--background-elevated" as string]: "#090B0E",
  ["--foreground" as string]: "#F6F0E5",
  ["--muted" as string]: "rgba(228, 220, 205, 0.72)",
  ["--primary" as string]: "#C9A84C",
  ["--secondary" as string]: "#E6C86C",
  ["--primary-foreground" as string]: "#140F05",
  ["--border" as string]: "rgba(201, 168, 76, 0.18)",
  ["--card" as string]: "rgba(13, 16, 21, 0.78)",
  ["--card-2" as string]: "rgba(16, 20, 26, 0.92)",
  ["--glass" as string]: "rgba(14, 18, 24, 0.74)",
  ["--backdrop" as string]: "rgba(8, 11, 15, 0.86)",
  ["--glow-primary" as string]: "rgba(201, 168, 76, 0.22)",
  ["--glow-secondary" as string]: "rgba(230, 200, 108, 0.18)",
  ["--shadow-ambient" as string]: "rgba(0, 0, 0, 0.54)",
  ["--shadow-ambient-strong" as string]: "rgba(0, 0, 0, 0.86)",
  ["--highlight-inset" as string]: "rgba(255, 247, 224, 0.08)",
};

const navItems = [
  { label: "الرئيسية", href: "#home" },
  { label: "المزايا", href: "#features" },
  { label: "الزيوت", href: "#oils" },
  { label: "كيف تعمل", href: "#how-it-works" },
  { label: "الآراء", href: "#testimonials" },
];

const trustBadges = [
  "سجل صيانة رقمي",
  "توصيات زيوت دقيقة",
  "ميكانيكيون موثوقون",
  "سوق قطع غيار متكامل",
];

const heroHighlights = [
  { value: "24/7", label: "تشخيص ومتابعة مستمرة" },
  { value: "+12K", label: "ملف مركبة نشط" },
  { value: "98%", label: "وضوح أعلى قبل الحجز" },
];

const features = [
  {
    title: "سجل الصيانة",
    description: "سجل رقمي مرتب يوثق كل خدمة وقطعة وتاريخ تغيير لتبقى حالة مركبتك واضحة دائمًا.",
    icon: ScrollText,
  },
  {
    title: "توصيات الزيوت",
    description: "اقتراحات دقيقة حسب نوع المحرك والاستخدام وسجل السيارة بدل الخيارات العامة المربكة.",
    icon: Droplets,
  },
  {
    title: "تشخيص الأعطال",
    description: "تحليل أولي للأعراض والتنبيهات لتفهم الحالة أسرع قبل اتخاذ أي قرار صيانة.",
    icon: ActivitySquare,
  },
  {
    title: "حجز الميكانيكيين",
    description: "مقارنة وحجز خدمات موثوقة مع متابعة للحالة والوقت والتفاصيل من مكان واحد.",
    icon: CalendarClock,
  },
  {
    title: "سوق قطع الغيار",
    description: "اكتشف القطع والزيوت والخدمات ضمن تجربة شراء منظمة وموثوقة وسهلة المقارنة.",
    icon: ShoppingBag,
  },
];

const timeline = [
  {
    phase: "01",
    title: "أضف سيارتك",
    description: "ابدأ بإدخال بيانات المركبة لتصبح كل التوصيات والخدمات مرتبطة بسيارتك الفعلية.",
  },
  {
    phase: "02",
    title: "احصل على توصيات وخدمات مناسبة",
    description: "راجع الزيوت الملائمة، التشخيص الأولي، والخدمات المقترحة المبنية على بياناتك.",
  },
  {
    phase: "03",
    title: "تابع الصيانة من مكان واحد",
    description: "احتفظ بسجل واضح، راقب ما تم، واتخذ قرارات الصيانة القادمة بثقة أعلى.",
  },
];

const benefits = [
  "توفير الوقت",
  "قرارات صيانة أوضح",
  "متابعة دقيقة للمركبة",
  "الوصول إلى خدمات موثوقة",
];

const testimonials = [
  {
    name: "ليلى بن عيسى",
    role: "مالكة سيارة عائلية",
    quote:
      "أصبحت أرى سجل السيارة كاملًا في واجهة واحدة. قبل سيارتي كنت أتخذ قرارات الصيانة متأخرة، الآن أعرف ماذا أحتاج ومتى.",
    photo:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=cinematic%20portrait%20of%20an%20elegant%20north%20african%20woman%20car%20owner%2C%20premium%20automotive%20campaign%2C%20dark%20background%2C%20warm%20gold%20rim%20light%2C%20realistic%20editorial%20photography&image_size=square_hd",
  },
  {
    name: "سفيان بوعلام",
    role: "يعتمد على الصيانة الوقائية",
    quote:
      "قسم الزيوت والحجز وفر علي وقتًا كبيرًا. البطاقة تعرض لي المنتج بشكل واضح بدل توصيات نصية غير مفيدة أو مشتتة.",
    photo:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=realistic%20portrait%20of%20a%20north%20african%20man%20driver%20in%20a%20luxury%20garage%2C%20premium%20dark%20editorial%20lighting%2C%20gold%20accent%20highlights%2C%20clean%20background&image_size=square_hd",
  },
  {
    name: "إيمان زروقي",
    role: "تدير أكثر من مركبة",
    quote:
      "ما أحببته هو بساطة التجربة. الصفحة فخمة لكن كل شيء واضح: الحالة، الخدمة، الزيت المناسب، ومن أتعامل معه.",
    photo:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=cinematic%20portrait%20of%20a%20confident%20north%20african%20businesswoman%20with%20premium%20automotive%20aesthetic%2C%20dark%20studio%20background%2C%20soft%20gold%20lighting%2C%20realistic%20skin%20texture&image_size=square_hd",
  },
];

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Contact", href: `mailto:${SITE.email}` },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

const oilProducts: StoreProduct[] = [
  getAllOilStoreProducts()[4],
  getAllOilStoreProducts()[5],
  getAllOilStoreProducts()[2],
  getAllOilStoreProducts()[3],
].filter((product): product is StoreProduct => Boolean(product));

function SectionHeader({
  eyebrow,
  title,
  description,
  centered = true,
}: {
  eyebrow: string;
  title: string;
  description: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-[11px] font-bold tracking-[0.32em] text-primary uppercase">
        <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_18px_var(--glow-primary)]" />
        {eyebrow}
      </div>
      <h2 className="mt-6 font-display text-3xl font-black leading-[1.08] text-foreground sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-8 text-muted sm:text-lg sm:leading-9">{description}</p>
    </div>
  );
}

function GlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`card ${className}`}>{children}</div>;
}

export default function LandingUI() {
  return (
    <div dir="rtl" className="dark relative overflow-hidden bg-background text-foreground" style={landingTheme}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-4%,rgba(201,168,76,0.28),transparent_24%),radial-gradient(circle_at_15%_16%,rgba(201,168,76,0.16),transparent_22%),radial-gradient(circle_at_85%_18%,rgba(255,255,255,0.08),transparent_18%),linear-gradient(180deg,#050608_0%,#080b10_32%,#050608_100%)]" />
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(201,168,76,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(201,168,76,0.06)_1px,transparent_1px)] [background-size:96px_96px]" />
        <div className="absolute right-[18%] top-0 h-72 w-72 rounded-full bg-primary/20 blur-[150px]" />
        <div className="absolute bottom-[12%] left-[8%] h-64 w-64 rounded-full bg-white/6 blur-[120px]" />
      </div>

      <header id="home" className="relative z-30">
        <div className="container-app pt-5">
          <div className="rounded-full border border-border/80 bg-card/75 px-4 shadow-[0_28px_70px_-44px_var(--shadow-ambient-strong)] backdrop-blur-2xl">
            <div className="flex h-[4.5rem] items-center justify-between gap-3">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-background-elevated/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <Image src={logoSrc} alt="Sayarati Logo" width={32} height={32} sizes="32px" className="h-8 w-8" />
                </div>
                <div className="leading-none">
                  <div className="font-display text-xl font-bold text-foreground">سيارتي</div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.34em] text-primary/80">SAYARATI</div>
                </div>
              </Link>

              <nav className="hidden items-center gap-6 text-sm text-muted lg:flex">
                {navItems.map((item) => (
                  <a key={item.href} href={item.href} className="transition hover:text-foreground">
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="hidden lg:flex">
                <Link href="/choose-role" className="btn-primary h-11 px-6 text-sm">
                  ابدأ الآن
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                </Link>
              </div>

              <LandingMobileMenu navItems={navItems} />
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section className="container-app grid min-h-[calc(100svh-88px)] items-center gap-14 pb-[4.5rem] pt-10 lg:grid-cols-[0.95fr_minmax(0,1.05fr)] lg:pb-24">
          <div className="order-2 space-y-8 lg:order-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-[11px] font-bold tracking-[0.34em] text-primary uppercase">
              <Cpu className="h-4 w-4" aria-hidden />
              Automotive Intelligence Platform
            </div>

            <div className="space-y-5">
              <h1 className="max-w-3xl font-display text-4xl font-black leading-[1.02] text-foreground sm:text-6xl lg:text-[4.9rem]">
                قرارات صيانة أفضل
                <span className="block text-primary">تبدأ بمعلومات أوضح.</span>
              </h1>
              <p className="max-w-2xl text-base leading-8 text-muted sm:text-xl sm:leading-10">
                من سجل الصيانة وتوصيات الزيوت المناسبة إلى تشخيص الأعطال وحجز الخدمات، تمنحك
                سيارتي رؤية أوضح وتحكماً أكبر في كل ما يخص سيارتك، لتتخذ قرارات صيانة أكثر ذكاءً
                وتجنب التكاليف غير المتوقعة.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/choose-role" className="btn-primary h-14 px-8 text-base">
                ابدأ الآن
                <ArrowLeft className="h-5 w-5" aria-hidden />
              </Link>
              <a href="#oils" className="btn-secondary h-14 px-8 text-base">
                اعرف الزيت المناسب لسيارتك
                <ArrowUpLeft className="h-5 w-5" aria-hidden />
              </a>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {heroHighlights.map((item) => (
                <GlassCard key={item.label} className="p-4">
                  <div className="text-2xl font-black text-primary">{item.value}</div>
                  <div className="mt-2 text-sm text-muted">{item.label}</div>
                </GlassCard>
              ))}
            </div>

            <div>
              <div className="text-xs font-bold tracking-[0.34em] text-muted uppercase">Trusted Capabilities</div>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {trustBadges.map((item) => (
                  <span key={item} className="chip border-primary/15 bg-card/75 text-foreground/90 normal-case tracking-normal">
                    <span className="chip-dot bg-primary" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="order-1 mx-auto w-full max-w-[820px] lg:order-2">
            <div className="relative min-h-[390px] sm:min-h-[520px]">
              <div className="absolute inset-x-[18%] top-14 z-0 h-28 rounded-full bg-primary/30 blur-[70px]" />
              <div className="absolute inset-x-[12%] bottom-10 z-0 h-20 rounded-full bg-black/80 blur-[40px]" />
              <div className="absolute inset-x-[10%] top-[18%] z-0 h-[58%] rounded-full bg-white/8 blur-[90px]" />

              <GlassCard className="relative overflow-hidden rounded-[38px] p-4 sm:p-6">
                <div className="relative overflow-hidden rounded-[34px] border border-white/8 bg-[linear-gradient(180deg,rgba(20,24,31,0.85),rgba(6,8,11,0.98))] px-3 py-6 sm:px-6">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_4%,rgba(255,255,255,0.18),transparent_22%),radial-gradient(circle_at_76%_20%,rgba(201,168,76,0.24),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(4,5,7,0.32)_46%,rgba(1,2,4,0.9)_100%)]" />
                  <div className="absolute left-10 right-10 top-8 h-px bg-gradient-to-l from-transparent via-white/20 to-transparent" />

                  <div className="absolute right-4 top-4 z-30 rounded-[24px] border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-xl sm:right-6 sm:top-6">
                    <div className="text-[11px] font-bold tracking-[0.24em] text-primary uppercase">Luxury View</div>
                    <div className="mt-1 text-sm font-semibold text-foreground sm:text-base">
                      رؤية فاخرة لحالة المركبة
                    </div>
                  </div>

                  <div className="absolute -left-3 top-[4.5rem] z-30 hidden w-44 rounded-[26px] border border-primary/20 bg-card/85 p-4 shadow-[0_24px_60px_-36px_var(--shadow-ambient-strong)] backdrop-blur-xl sm:block">
                    <div className="flex items-center gap-2 text-primary">
                      <BadgeCheck className="h-4 w-4" aria-hidden />
                      <span className="text-[11px] font-bold tracking-[0.22em] uppercase">Digital Record</span>
                    </div>
                    <div className="mt-3 text-lg font-bold text-foreground">كل خدمة موثقة</div>
                    <div className="mt-1 text-sm leading-6 text-muted">تسلسل واضح للصيانة والقطع والملاحظات.</div>
                  </div>

                  <div className="absolute -right-4 bottom-10 z-30 hidden w-48 rounded-[26px] border border-primary/20 bg-[#11161d]/88 p-4 text-primary-foreground shadow-[0_24px_60px_-34px_rgba(0,0,0,0.82)] backdrop-blur-xl sm:block">
                    <div className="text-[11px] font-bold tracking-[0.24em] text-primary uppercase">Oil Match</div>
                    <div className="mt-3 text-lg font-bold text-white">توصيات مرئية وواضحة</div>
                    <div className="mt-1 text-sm leading-6 text-white/72">منتجات مناسبة بدل نصوص عامة ومبهمة.</div>
                  </div>

                  <div className="pointer-events-none absolute inset-x-[16%] bottom-10 z-10 h-12 rounded-full bg-black/70 blur-[32px]" />
                  <div className="pointer-events-none absolute inset-x-[22%] bottom-16 z-10 h-8 rounded-full bg-primary/16 blur-[28px]" />

                  <Image
                    src={heroVehicle}
                    alt="السيارة الرئيسية في واجهة سيارتي"
                    width={1400}
                    height={920}
                    priority
                    quality={75}
                    sizes="(max-width: 1024px) 100vw, 52vw"
                    className="relative z-20 mx-auto h-auto w-full max-w-[700px] animate-floaty object-contain drop-shadow-[0_30px_70px_rgba(0,0,0,0.58)] saturate-125 contrast-110"
                  />

                  <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,transparent_18%,transparent_72%,rgba(0,0,0,0.58)_100%)]" />
                  <div className="pointer-events-none absolute left-0 right-0 top-[18%] z-20 h-16 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)] blur-xl" />

                  <div className="relative z-30 mt-3 grid gap-3 md:grid-cols-3">
                    {[
                      { icon: Clock3, value: "11 دقيقة", label: "متوسط الوصول إلى القرار" },
                      { icon: Gauge, value: "وضوح أعلى", label: "قبل الحجز أو شراء القطع" },
                      { icon: ShieldCheck, value: "شبكة موثوقة", label: "للخدمات والزيوت والميكانيكيين" },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.label}
                          className="rounded-[24px] border border-white/8 bg-black/28 px-4 py-4 text-white backdrop-blur-xl"
                        >
                          <div className="flex items-center gap-2 text-primary">
                            <Icon className="h-4 w-4" aria-hidden />
                            <span className="text-[11px] font-bold tracking-[0.2em] uppercase">{item.value}</span>
                          </div>
                          <div className="mt-2 text-sm leading-6 text-white/76">{item.label}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>

        <section id="features" className="border-t border-border/70 py-20 sm:py-24">
          <div className="container-app">
            <SectionHeader
              eyebrow="Platform Features"
              title="كل ما تحتاجه لسيارتك في منصة واحدة"
              description="واجهة واحدة أنيقة تجمع الرؤية، التوصية، التشخيص، والحجز في تجربة عربية مصممة لتقليل التشتت ورفع جودة القرار."
            />

            <div className="mt-14 grid gap-5 lg:grid-cols-12">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const spanClass =
                  index === 0
                    ? "lg:col-span-5"
                    : index === 1
                      ? "lg:col-span-4"
                      : index === 2
                        ? "lg:col-span-3"
                        : index === 3
                          ? "lg:col-span-6"
                          : "lg:col-span-6";

                return (
                  <GlassCard
                    key={feature.title}
                    className={`group card-hover overflow-hidden p-6 sm:p-7 ${spanClass}`}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(201,168,76,0.12),transparent_28%)] opacity-0 transition duration-300 group-hover:opacity-100" />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-[22px] border border-primary/20 bg-primary/10 text-primary transition duration-300 group-hover:-translate-y-1 group-hover:scale-105 group-hover:shadow-[0_18px_36px_-24px_var(--glow-primary)]">
                          <Icon className="h-7 w-7" aria-hidden />
                        </div>
                        <span className="rounded-full border border-white/8 bg-white/5 px-3 py-1 text-[11px] font-bold tracking-[0.18em] text-primary uppercase">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="mt-7 text-2xl font-bold text-foreground">{feature.title}</h3>
                      <p className="mt-4 max-w-xl text-sm leading-8 text-muted">{feature.description}</p>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </div>
        </section>

        <section id="oils" className="border-t border-border/70 py-20 sm:py-24">
          <div className="container-app">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_minmax(0,1.1fr)] lg:items-end">
              <SectionHeader
                eyebrow="Recommended Oil"
                title="الزيت المناسب لسيارتك"
                description="بطاقات مرئية لمنتجات موصى بها ضمن تجربة أكثر فخامة ووضوحًا، مع عرض العلامة التجارية واللزوجة والانتقال المباشر إلى المتجر."
                centered={false}
              />

              <GlassCard className="p-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { label: "مطابقة حسب المحرك", value: "Engine-aware" },
                    { label: "عرض بصري للمنتجات", value: "Visual cards" },
                    { label: "وصول مباشر للمتجر", value: "Fast action" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-[24px] border border-white/8 bg-black/20 px-4 py-4">
                      <div className="text-[11px] font-bold tracking-[0.2em] text-primary uppercase">{item.value}</div>
                      <div className="mt-2 text-sm text-muted">{item.label}</div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {oilProducts.map((product) => (
                <GlassCard key={product.id} className="group card-hover overflow-hidden p-4">
                  <div className="rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(26,31,38,0.88),rgba(11,13,18,0.98))] p-4">
                    <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.2),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01))]">
                      <div className="absolute inset-x-[20%] bottom-4 h-5 rounded-full bg-black/70 blur-[16px]" />
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={560}
                        height={560}
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="relative z-10 h-auto w-full object-contain transition duration-300 group-hover:scale-[1.03]"
                      />
                    </div>

                    <div className="mt-5">
                      <div className="text-[11px] font-bold tracking-[0.22em] text-primary uppercase">
                        {product.brand}
                      </div>
                      <h3 className="mt-2 min-h-14 text-lg font-bold leading-7 text-foreground">{product.title}</h3>
                      <div className="mt-4 flex items-center justify-between gap-4">
                        <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                          {product.viscosity}
                        </span>
                        <span className="text-sm text-muted">{formatDaPrice(product.priceDa)}</span>
                      </div>
                      <Link href="/customer/store" className="btn-secondary mt-5 h-12 w-full justify-center text-sm">
                        عرض في المتجر
                        <ArrowLeft className="h-4 w-4" aria-hidden />
                      </Link>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="border-t border-border/70 py-20 sm:py-24">
          <div className="container-app">
            <SectionHeader
              eyebrow="How It Works"
              title="كيف تعمل سيارتي؟"
              description="مسار مختصر وواضح يحوّل إدارة السيارة من خطوات متفرقة إلى رحلة رقمية متصلة تبدأ بالمركبة وتنتهي بقرار صيانة أفضل."
            />

            <div className="relative mt-16 grid gap-6 lg:grid-cols-3">
              <div className="pointer-events-none absolute left-[7%] right-[7%] top-12 hidden h-px bg-[linear-gradient(90deg,transparent,rgba(201,168,76,0.42),transparent)] lg:block" />
              {timeline.map((step, index) => (
                <GlassCard key={step.phase} className="relative p-6 sm:p-7">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-lg font-black text-primary">
                      {step.phase}
                    </div>
                    <div className="text-xl font-bold text-foreground">{step.title}</div>
                  </div>
                  <p className="mt-5 text-sm leading-8 text-muted">{step.description}</p>
                  <div className="mt-6 flex items-center gap-2 text-sm text-primary">
                    {index === 0 ? <CarFront className="h-4 w-4" aria-hidden /> : null}
                    {index === 1 ? <Sparkles className="h-4 w-4" aria-hidden /> : null}
                    {index === 2 ? <Wrench className="h-4 w-4" aria-hidden /> : null}
                    <span>خطوة واضحة ضمن رحلة واحدة</span>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="border-t border-border/70 py-20 sm:py-24">
          <div className="container-app grid gap-8 lg:grid-cols-[0.92fr_minmax(0,1.08fr)] lg:items-center">
            <div>
              <SectionHeader
                eyebrow="Why Sayarati"
                title="لماذا يستخدم أصحاب السيارات سيارتي؟"
                description="لأن المنصة تقلل التردد في القرار، وتمنحك صورة أدق عن المركبة، وتربطك بخدمات موثوقة داخل تجربة تبدو راقية وسهلة في الوقت نفسه."
                centered={false}
              />
            </div>

            <GlassCard className="overflow-hidden p-5 sm:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {benefits.map((item) => (
                  <div
                    key={item}
                    className="rounded-[26px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-5 py-5"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary">
                        <Check className="h-4 w-4" aria-hidden />
                      </span>
                      <div>
                        <div className="text-lg font-bold text-foreground">{item}</div>
                        <p className="mt-2 text-sm leading-7 text-muted">
                          تجربة منظمة تقلل الفوضى وتمنحك ثقة أكبر في اختيار الخدمة أو المنتج المناسب.
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-4 rounded-[28px] border border-primary/15 bg-[linear-gradient(135deg,rgba(201,168,76,0.12),rgba(255,255,255,0.02))] p-5 sm:grid-cols-3">
                {[
                  { value: "وقت أقل", label: "بين التشخيص والقرار" },
                  { value: "وضوح أعلى", label: "في فهم حالة السيارة" },
                  { value: "ثقة أكبر", label: "في اختيار الخدمة" },
                ].map((item) => (
                  <div key={item.label} className="rounded-[22px] border border-white/8 bg-black/20 px-4 py-4">
                    <div className="text-2xl font-black text-primary">{item.value}</div>
                    <div className="mt-2 text-sm text-muted">{item.label}</div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </section>

        <section id="testimonials" className="border-t border-border/70 py-20 sm:py-24">
          <div className="container-app">
            <SectionHeader
              eyebrow="Testimonials"
              title="آراء العملاء"
              description="بطاقات مراجعات مصممة بعناية تعكس الثقة والقيمة الفعلية التي يحصل عليها أصحاب السيارات من المنصة."
            />

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <GlassCard key={testimonial.name} className="h-full p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <Image
                        src={testimonial.photo}
                        alt={testimonial.name}
                        width={96}
                        height={96}
                        className="h-16 w-16 rounded-2xl object-cover ring-1 ring-primary/20"
                      />
                      <div>
                        <div className="text-lg font-bold text-foreground">{testimonial.name}</div>
                        <div className="mt-1 text-sm text-muted">{testimonial.role}</div>
                      </div>
                    </div>
                    <Quote className="h-8 w-8 text-primary/70" aria-hidden />
                  </div>

                  <div className="mt-6 flex items-center gap-1 text-primary">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star key={`${testimonial.name}-${index}`} className="h-4 w-4 fill-current" aria-hidden />
                    ))}
                  </div>

                  <p className="mt-5 text-sm leading-8 text-muted">{testimonial.quote}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-20 pt-4 sm:pb-24">
          <div className="container-app">
            <GlassCard className="relative overflow-hidden px-6 py-10 sm:px-10 sm:py-14">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,168,76,0.22),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01))]" />
              <div className="relative z-10 mx-auto max-w-3xl text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-[11px] font-bold tracking-[0.28em] text-primary uppercase">
                  Final CTA
                </div>
                <h2 className="mt-6 font-display text-3xl font-black leading-[1.12] text-foreground sm:text-5xl">
                  ابدأ إدارة سيارتك بطريقة أكثر ذكاءً
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
                  أنشئ حسابك وابدأ في متابعة صيانة سيارتك من مكان واحد.
                </p>
                <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                  <Link href="/choose-role" className="btn-primary h-14 px-8 text-base">
                    ابدأ الآن
                    <ArrowLeft className="h-5 w-5" aria-hidden />
                  </Link>
                  <a href="#features" className="btn-secondary h-14 px-8 text-base">
                    استكشف المنصة
                    <ArrowUpLeft className="h-5 w-5" aria-hidden />
                  </a>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-border/70 pb-10 pt-8">
        <div className="container-app flex flex-col gap-6 text-sm text-muted">
          <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
            <div>
              <div className="font-display text-xl font-bold text-foreground">سيارتي</div>
              <div className="mt-2 max-w-md leading-7">
                منصة عربية فاخرة لإدارة الصيانة، توصيات الزيوت، تشخيص الأعطال، وحجز الخدمات بثقة
                أعلى.
              </div>
            </div>
            <div className="flex flex-wrap gap-5">
              {footerLinks.map((item) => (
                <Link key={item.label} href={item.href} className="transition hover:text-foreground">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start justify-between gap-3 border-t border-border/70 pt-5 md:flex-row md:items-center">
            <div>© 2026 Sayarati. All rights reserved.</div>
            <div className="flex flex-wrap items-center gap-4">
              <span>{SITE.phone}</span>
              <span>{SITE.email}</span>
              <span>{SITE.city}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
