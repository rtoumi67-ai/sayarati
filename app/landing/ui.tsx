import type { LucideIcon, ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpLeft,
  BadgeCheck,
  Bot,
  BrainCircuit,
  CalendarCheck2,
  CarFront,
  Check,
  Gauge,
  MessageSquareMore,
  Quote,
  ScanSearch,
  ScrollText,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Wrench,
  Droplets,
} from "lucide-react";

import { formatDaPrice, getAllOilStoreProducts, type StoreProduct } from "../customer/store/catalog";
import { SITE } from "../components/site";
import LandingMobileMenu from "./LandingMobileMenu";

const heroVehicle = "/assets/doblo.jpg";
const logoSrc = "/favicon.ico";

const navItems = [
  { label: "الرئيسية", href: "#home" },
  { label: "عن سيارتي", href: "#about" },
  { label: "المزايا", href: "#features" },
  { label: "الزيوت", href: "#oils" },
  { label: "التواصل", href: "#contact" },
];

const trustBadges = [
  "سجل صيانة رقمي",
  "توصيات زيوت دقيقة",
  "ميكانيكيون موثوقون",
  "سوق قطع غيار متكامل",
];

const aboutItems = [
  "متابعة الصيانة الدورية وسجل الخدمات في مكان واحد",
  "توصيات زيوت مبنية على بيانات المركبة ونمط الاستخدام",
  "تشخيص أولي للأعراض والتنبيهات قبل اتخاذ القرار",
  "حجز ميكانيكيين وخدمات موثوقة بسرعة ووضوح",
  "الوصول إلى سوق قطع غيار وخيارات شراء منظمة",
];

const features: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "سجل الصيانة",
    description: "توثيق الخدمات والقطع والملاحظات في سجل رقمي واضح يسهل الرجوع إليه في أي وقت.",
    icon: ScrollText,
  },
  {
    title: "توصيات الزيوت",
    description: "اقتراحات دقيقة للزوجة والمنتجات المناسبة بناءً على نوع المركبة والمحرك.",
    icon: Droplets,
  },
  {
    title: "تشخيص الأعطال",
    description: "فهم أولي للأعراض والأسباب المحتملة قبل التوجه للورشة أو طلب الخدمة.",
    icon: ScanSearch,
  },
  {
    title: "حجز الميكانيكيين",
    description: "احجز الخدمة المناسبة مع متابعة واضحة للحالة والموعد والتفاصيل.",
    icon: CalendarCheck2,
  },
  {
    title: "سوق قطع الغيار",
    description: "استعرض منتجات وخيارات شراء مرئية داخل تجربة موحّدة وسهلة المقارنة.",
    icon: ShoppingBag,
  },
  {
    title: "مساعد ذكي للسيارات",
    description: "مساعد يفهم سيارتك ويقترح الخطوة التالية بناءً على الأعراض والسجل الحالي.",
    icon: Bot,
  },
];

const assistantItems = [
  "يرصد الأعراض الشائعة ويحوّلها إلى إشارات أوضح.",
  "يقترح الأسباب المحتملة بناءً على نوع المشكلة.",
  "يوصي بحلول أولية وخدمات مناسبة للحالة.",
  "يقدّم إرشادًا للصيانة الوقائية قبل تفاقم الأعطال.",
];

const timeline = [
  { step: "01", title: "أضف سيارتك", icon: CarFront },
  { step: "02", title: "احصل على التوصيات المناسبة", icon: Sparkles },
  { step: "03", title: "احجز الميكانيكي", icon: Wrench },
  { step: "04", title: "تابع الصيانة", icon: ShieldCheck },
];

const testimonials = [
  {
    name: "أمينة بوزيان",
    role: "مالكة سيارة عائلية",
    quote:
      "أصبحت أرى سجل السيارة والخيارات المناسبة في واجهة واحدة. القرارات صارت أسرع وأكثر راحة من قبل.",
    photo:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=cinematic%20portrait%20of%20an%20elegant%20north%20african%20woman%20car%20owner%2C%20premium%20automotive%20editorial%20lighting%2C%20cool%20blue%20accent%20light%2C%20dark%20studio%20background%2C%20realistic%20photography&image_size=square_hd",
  },
  {
    name: "يوسف لعروسي",
    role: "يعتمد على الصيانة الوقائية",
    quote:
      "قسم الزيوت والميكانيكيين مرتب جدًا. كل شيء بصري وواضح ويختصر وقتًا كبيرًا في اتخاذ القرار.",
    photo:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=realistic%20portrait%20of%20a%20north%20african%20man%20driver%20in%20a%20premium%20garage%2C%20blue%20accent%20lighting%2C%20modern%20automotive%20campaign%2C%20dark%20background&image_size=square_hd",
  },
  {
    name: "نسرين بلقاسم",
    role: "تدير أكثر من مركبة",
    quote:
      "سيارتي تجمع المتابعة والتوصيات والحجز في تجربة واحدة أنيقة، وهذا بالضبط ما كنت أبحث عنه.",
    photo:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=cinematic%20portrait%20of%20a%20confident%20north%20african%20businesswoman%20with%20luxury%20automotive%20brand%20aesthetic%2C%20cool%20blue%20rim%20light%2C%20studio%20background%2C%20realistic%20skin%20texture&image_size=square_hd",
  },
];

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

const oilProducts: StoreProduct[] = getAllOilStoreProducts().slice(0, 4);

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "center" | "start";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/70 bg-white/75 px-4 py-2 text-[11px] font-bold tracking-[0.28em] text-sky-600 uppercase shadow-[0_10px_30px_-20px_rgba(14,165,233,0.65)] backdrop-blur-xl dark:border-sky-400/15 dark:bg-white/5 dark:text-sky-300">
        <span className="h-2 w-2 rounded-full bg-sky-500 dark:bg-sky-400" />
        {eyebrow}
      </div>
      <h2 className="mt-6 font-display text-3xl font-black leading-[1.08] text-slate-950 dark:text-white sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg sm:leading-9">
        {description}
      </p>
    </div>
  );
}

function GlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-slate-200/80 bg-white/70 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.28)] backdrop-blur-2xl",
        "dark:border-white/10 dark:bg-white/5 dark:shadow-[0_30px_90px_-58px_rgba(2,8,23,0.9)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

function PrimaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-sky-600 px-7 text-sm font-semibold text-white shadow-[0_18px_50px_-24px_rgba(2,132,199,0.7)] transition hover:-translate-y-0.5 hover:bg-sky-500 dark:bg-sky-500 dark:hover:bg-sky-400"
    >
      {children}
    </Link>
  );
}

function SecondaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-slate-300/80 bg-white/75 px-7 text-sm font-semibold text-slate-900 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:border-sky-300 hover:text-sky-700 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-sky-400/40 dark:hover:text-sky-300"
    >
      {children}
    </a>
  );
}

export default function LandingUI() {
  return (
    <div
      dir="rtl"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f8fbff_0%,#eef6ff_40%,#f8fbff_100%)] text-slate-950 dark:bg-[linear-gradient(180deg,#030712_0%,#07111f_35%,#030712_100%)] dark:text-white"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.18),transparent_26%),radial-gradient(circle_at_15%_14%,rgba(59,130,246,0.14),transparent_22%),linear-gradient(180deg,transparent,rgba(255,255,255,0.16))] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.22),transparent_26%),radial-gradient(circle_at_15%_14%,rgba(37,99,235,0.18),transparent_24%),linear-gradient(180deg,transparent,rgba(2,6,23,0.16))]" />
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(14,165,233,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.06)_1px,transparent_1px)] [background-size:110px_110px] dark:opacity-20" />
      </div>

      <header id="home" className="relative z-20">
        <div className="container-app pt-5">
          <div className="rounded-full border border-slate-200/80 bg-white/80 px-4 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.25)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/65 dark:shadow-[0_20px_60px_-35px_rgba(2,8,23,0.95)]">
            <div className="flex h-[4.5rem] items-center justify-between gap-3">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-200 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] dark:border-sky-400/15 dark:bg-white/5">
                  <Image src={logoSrc} alt="Sayarati Logo" width={32} height={32} sizes="32px" className="h-8 w-8" />
                </div>
                <div className="leading-none">
                  <div className="font-display text-xl font-bold text-slate-950 dark:text-white">سيارتي</div>
                  <div className="mt-1 text-[11px] tracking-[0.34em] text-sky-600 dark:text-sky-300">SAYARATI</div>
                </div>
              </Link>

              <nav className="hidden items-center gap-6 text-sm text-slate-600 dark:text-slate-300 lg:flex">
                {navItems.map((item) => (
                  <a key={item.href} href={item.href} className="transition hover:text-slate-950 dark:hover:text-white">
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="hidden lg:flex">
                <PrimaryButton href="/choose-role">
                  ابدأ الآن
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                </PrimaryButton>
              </div>

              <LandingMobileMenu navItems={navItems} />
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section className="container-app grid min-h-[calc(100svh-88px)] items-center gap-14 pb-20 pt-10 lg:grid-cols-[0.96fr_minmax(0,1.04fr)] lg:pb-24">
          <div className="order-2 space-y-8 lg:order-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-white/80 px-4 py-2 text-[11px] font-bold tracking-[0.32em] text-sky-600 shadow-[0_14px_32px_-24px_rgba(14,165,233,0.7)] backdrop-blur-xl dark:border-sky-400/20 dark:bg-white/5 dark:text-sky-300">
              <BrainCircuit className="h-4 w-4" aria-hidden />
              Automotive SaaS Platform
            </div>

            <div className="space-y-5">
              <h1 className="max-w-3xl font-display text-4xl font-black leading-[1.02] text-slate-950 dark:text-white sm:text-6xl lg:text-[4.9rem]">
                قرارات صيانة أفضل
                <span className="block text-sky-600 dark:text-sky-300">تبدأ بمعلومات أوضح.</span>
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-xl sm:leading-10">
                من سجل الصيانة وتوصيات الزيوت المناسبة إلى تشخيص الأعطال وحجز الخدمات، تمنحك
                سيارتي رؤية أوضح وتحكماً أكبر في كل ما يخص سيارتك، لتتخذ قرارات صيانة أكثر ذكاءً
                وتجنب التكاليف غير المتوقعة.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <PrimaryButton href="/choose-role">
                ابدأ الآن
                <ArrowLeft className="h-5 w-5" aria-hidden />
              </PrimaryButton>
              <SecondaryButton href="#oils">
                اعرف الزيت المناسب لسيارتك
                <ArrowUpLeft className="h-5 w-5" aria-hidden />
              </SecondaryButton>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {trustBadges.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 shadow-[0_16px_38px_-28px_rgba(15,23,42,0.2)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-sky-500 dark:bg-sky-400" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="order-1 mx-auto w-full max-w-[860px] lg:order-2">
            <div className="relative min-h-[380px] sm:min-h-[560px]">
              <div className="absolute inset-x-[16%] top-20 h-28 rounded-full bg-sky-400/25 blur-[75px] dark:bg-sky-500/28" />
              <div className="absolute inset-x-[18%] bottom-14 h-10 rounded-full bg-slate-900/40 blur-[28px] dark:bg-black/70" />

              <GlassCard className="relative overflow-hidden p-4 sm:p-6">
                <div className="relative overflow-hidden rounded-[30px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(241,247,255,0.72))] px-4 py-6 dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(8,15,28,0.88),rgba(4,8,15,0.92))] sm:px-6">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_6%,rgba(255,255,255,0.95),transparent_20%),radial-gradient(circle_at_80%_18%,rgba(14,165,233,0.18),transparent_24%)] dark:bg-[radial-gradient(circle_at_18%_6%,rgba(255,255,255,0.12),transparent_20%),radial-gradient(circle_at_80%_18%,rgba(14,165,233,0.18),transparent_24%)]" />

                  <div className="absolute right-4 top-4 z-20 rounded-[22px] border border-sky-200/80 bg-white/75 px-4 py-3 backdrop-blur-xl dark:border-sky-400/15 dark:bg-slate-950/55 sm:right-6 sm:top-6">
                    <div className="text-[11px] font-bold tracking-[0.22em] text-sky-600 dark:text-sky-300 uppercase">
                      Automotive Intelligence
                    </div>
                    <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                      رؤية تقنية أنظف لإدارة سيارتك
                    </div>
                  </div>

                  <div className="absolute -left-2 top-18 z-20 hidden w-44 rounded-[24px] border border-sky-200/80 bg-white/75 p-4 shadow-[0_24px_50px_-38px_rgba(15,23,42,0.22)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/60 sm:block">
                    <div className="flex items-center gap-2 text-sky-600 dark:text-sky-300">
                      <BadgeCheck className="h-4 w-4" aria-hidden />
                      <span className="text-[11px] font-bold tracking-[0.2em] uppercase">Digital Record</span>
                    </div>
                    <div className="mt-3 text-lg font-bold text-slate-900 dark:text-white">سجل واضح ومحدث</div>
                    <div className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">كل ما يخص سيارتك في واجهة واحدة.</div>
                  </div>

                  <div className="absolute -right-3 bottom-12 z-20 hidden w-48 rounded-[24px] border border-sky-200/70 bg-white/75 p-4 shadow-[0_24px_50px_-38px_rgba(15,23,42,0.22)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/60 sm:block">
                    <div className="text-[11px] font-bold tracking-[0.2em] text-sky-600 dark:text-sky-300 uppercase">Smart Oil Matching</div>
                    <div className="mt-3 text-lg font-bold text-slate-900 dark:text-white">بطاقات منتجات فعلية</div>
                    <div className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">توصيات مرئية بدل نصوص عامة.</div>
                  </div>

                  <div className="pointer-events-none absolute inset-x-[20%] bottom-12 z-10 h-10 rounded-full bg-slate-900/28 blur-[22px] dark:bg-black/70" />
                  <div className="pointer-events-none absolute inset-x-[24%] bottom-16 z-10 h-8 rounded-full bg-sky-400/20 blur-[30px] dark:bg-sky-500/25" />

                  <Image
                    src={heroVehicle}
                    alt="مركبة سيارتي الرئيسية"
                    width={1400}
                    height={920}
                    priority
                    quality={75}
                    sizes="(max-width: 1024px) 100vw, 52vw"
                    className="relative z-10 mx-auto h-auto w-full max-w-[720px] animate-floaty object-contain saturate-110 contrast-110 drop-shadow-[0_26px_70px_rgba(15,23,42,0.28)] dark:drop-shadow-[0_32px_80px_rgba(0,0,0,0.68)]"
                  />

                  <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),transparent_22%,transparent_72%,rgba(15,23,42,0.16)_100%)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_18%,transparent_72%,rgba(0,0,0,0.54)_100%)]" />

                  <div className="relative z-20 mt-3 grid gap-3 md:grid-cols-3">
                    {[
                      { icon: Gauge, value: "تشخيص أوضح", label: "قبل الصيانة أو الحجز" },
                      { icon: ShieldCheck, value: "خدمات موثوقة", label: "اختيارات أكثر ثقة" },
                      { icon: Sparkles, value: "واجهة ذكية", label: "تجربة أنظف وأسرع" },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.label}
                          className="rounded-[22px] border border-white/70 bg-white/70 px-4 py-4 text-slate-900 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/55 dark:text-white"
                        >
                          <div className="flex items-center gap-2 text-sky-600 dark:text-sky-300">
                            <Icon className="h-4 w-4" aria-hidden />
                            <span className="text-[11px] font-bold tracking-[0.2em] uppercase">{item.value}</span>
                          </div>
                          <div className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.label}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 sm:py-24">
          <div className="container-app grid gap-8 lg:grid-cols-[0.9fr_minmax(0,1.1fr)] lg:items-center">
            <SectionHeader
              eyebrow="About Sayarati"
              title="منصة واحدة لفهم سيارتك وإدارة صيانتها"
              description="سيارتي تجمع التتبع والتوصيات والتشخيص والحجز وسوق القطع في تجربة عربية احترافية تقلل التشتت وتمنحك وضوحًا أكبر في كل قرار."
              align="start"
            />

            <GlassCard className="p-6 sm:p-7">
              <div className="grid gap-4 sm:grid-cols-2">
                {aboutItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-[24px] border border-slate-200/80 bg-white/70 px-5 py-5 dark:border-white/10 dark:bg-white/5"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-700 dark:bg-sky-500/12 dark:text-sky-300">
                        <Check className="h-4 w-4" aria-hidden />
                      </span>
                      <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </section>

        <section id="features" className="py-20 sm:py-24">
          <div className="container-app">
            <SectionHeader
              eyebrow="Features"
              title="كل ما تحتاجه لسيارتك في منصة واحدة"
              description="واجهة منظمة تجمع الأدوات الأساسية لإدارة السيارة ضمن تجربة تقنية راقية، سريعة، وسهلة الاستخدام على الهاتف والكمبيوتر."
            />

            <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <GlassCard
                    key={feature.title}
                    className="group relative overflow-hidden p-6 transition duration-300 hover:-translate-y-1.5 hover:border-sky-300/80 hover:shadow-[0_28px_80px_-50px_rgba(14,165,233,0.45)] dark:hover:border-sky-400/25"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(14,165,233,0.14),transparent_28%)] opacity-0 transition duration-300 group-hover:opacity-100" />
                    <div className="relative z-10">
                      <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-sky-100 text-sky-700 transition duration-300 group-hover:scale-105 group-hover:bg-sky-600 group-hover:text-white dark:bg-sky-500/12 dark:text-sky-300 dark:group-hover:bg-sky-500 dark:group-hover:text-white">
                        <Icon className="h-6 w-6" aria-hidden />
                      </div>
                      <h3 className="mt-6 text-2xl font-bold text-slate-950 dark:text-white">{feature.title}</h3>
                      <p className="mt-4 text-sm leading-8 text-slate-600 dark:text-slate-300">{feature.description}</p>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-24">
          <div className="container-app">
            <GlassCard className="overflow-hidden p-6 sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[0.95fr_minmax(0,1.05fr)] lg:items-center">
                <div>
                  <SectionHeader
                    eyebrow="AI Assistant"
                    title="مساعد ذكي يفهم سيارتك"
                    description="مساعد سيارتي يحوّل الأعراض المربكة إلى توصيات مفهومة، ويساعدك على فهم الحالة، معرفة الأسباب المحتملة، واختيار الخطوة التالية بثقة."
                    align="start"
                  />
                </div>

                <div className="grid gap-4">
                  {assistantItems.map((item) => (
                    <div
                      key={item}
                      className="rounded-[24px] border border-slate-200/80 bg-white/70 px-5 py-5 dark:border-white/10 dark:bg-white/5"
                    >
                      <div className="flex items-start gap-3">
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-sky-100 text-sky-700 dark:bg-sky-500/12 dark:text-sky-300">
                          <MessageSquareMore className="h-4 w-4" aria-hidden />
                        </span>
                        <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>
        </section>

        <section id="oils" className="py-20 sm:py-24">
          <div className="container-app">
            <SectionHeader
              eyebrow="Recommended Oil"
              title="الزيت المناسب لسيارتك"
              description="بطاقات منتجات مرئية تعرض العلامة التجارية والاسم واللزوجة بوضوح، لتصل إلى المنتج المناسب داخل المتجر مباشرة."
            />

            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {oilProducts.map((product) => (
                <GlassCard key={product.id} className="group overflow-hidden p-4">
                  <div className="rounded-[24px] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(241,247,255,0.75))] p-4 dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(9,16,30,0.86),rgba(4,8,15,0.92))]">
                    <div className="relative overflow-hidden rounded-[22px] border border-slate-200/70 bg-[radial-gradient(circle_at_50%_0%,rgba(125,211,252,0.24),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.82),rgba(255,255,255,0.5))] dark:border-white/10 dark:bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.2),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]">
                      <div className="absolute inset-x-[20%] bottom-4 h-5 rounded-full bg-slate-900/20 blur-[16px] dark:bg-black/60" />
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
                      <div className="text-[11px] font-bold tracking-[0.22em] text-sky-600 dark:text-sky-300 uppercase">
                        {product.brand}
                      </div>
                      <h3 className="mt-2 min-h-14 text-lg font-bold leading-7 text-slate-950 dark:text-white">{product.title}</h3>
                      <div className="mt-4 flex items-center justify-between gap-4">
                        <span className="rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700 dark:bg-sky-500/12 dark:text-sky-300">
                          {product.viscosity}
                        </span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">{formatDaPrice(product.priceDa)}</span>
                      </div>
                      <Link
                        href="/customer/store"
                        className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-slate-300/80 bg-white/80 text-sm font-semibold text-slate-900 transition hover:border-sky-300 hover:text-sky-700 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-sky-400/40 dark:hover:text-sky-300"
                      >
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

        <section id="how-it-works" className="py-20 sm:py-24">
          <div className="container-app">
            <SectionHeader
              eyebrow="How It Works"
              title="كيف تعمل سيارتي؟"
              description="رحلة واضحة تبدأ بالمركبة نفسها، ثم تتحول إلى توصيات وخدمات ومتابعة مستمرة داخل نظام واحد مرتب."
            />

            <div className="relative mt-16 grid gap-6 lg:grid-cols-4">
              <div className="pointer-events-none absolute left-[8%] right-[8%] top-12 hidden h-px bg-[linear-gradient(90deg,transparent,rgba(14,165,233,0.38),transparent)] lg:block" />
              {timeline.map((item) => {
                const Icon = item.icon;
                return (
                  <GlassCard key={item.step} className="relative p-6 sm:p-7">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700 dark:bg-sky-500/12 dark:text-sky-300">
                        <Icon className="h-5 w-5" aria-hidden />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold tracking-[0.2em] text-sky-600 dark:text-sky-300 uppercase">{item.step}</div>
                        <div className="mt-1 text-xl font-bold text-slate-950 dark:text-white">{item.title}</div>
                      </div>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-20 sm:py-24">
          <div className="container-app">
            <SectionHeader
              eyebrow="Testimonials"
              title="آراء العملاء"
              description="آراء تعكس الوضوح والثقة والقيمة الفعلية التي يحصل عليها المستخدم عندما تصبح معلومات السيارة منظمة وسهلة الفهم."
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
                        className="h-16 w-16 rounded-2xl object-cover ring-1 ring-sky-200 dark:ring-sky-400/20"
                      />
                      <div>
                        <div className="text-lg font-bold text-slate-950 dark:text-white">{testimonial.name}</div>
                        <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</div>
                      </div>
                    </div>
                    <Quote className="h-8 w-8 text-sky-500/80 dark:text-sky-300/75" aria-hidden />
                  </div>

                  <div className="mt-6 flex items-center gap-1 text-sky-500 dark:text-sky-300">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star key={`${testimonial.name}-${index}`} className="h-4 w-4 fill-current" aria-hidden />
                    ))}
                  </div>

                  <p className="mt-5 text-sm leading-8 text-slate-600 dark:text-slate-300">{testimonial.quote}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 sm:py-24">
          <div className="container-app">
            <GlassCard className="p-6 sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[0.9fr_minmax(0,1.1fr)] lg:items-start">
                <SectionHeader
                  eyebrow="Contact"
                  title="تواصل معنا"
                  description="إذا كنت تريد معرفة المزيد عن المنصة أو لديك استفسار حول الصيانة والخدمات، أرسل رسالتك من هنا."
                  align="start"
                />

                <form className="grid gap-5">
                  <label className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <span>الاسم</span>
                    <input
                      type="text"
                      className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-slate-950 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-sky-400 dark:focus:ring-sky-500/10"
                      placeholder="اكتب اسمك"
                    />
                  </label>
                  <label className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <span>البريد الإلكتروني</span>
                    <input
                      type="email"
                      className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-slate-950 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-sky-400 dark:focus:ring-sky-500/10"
                      placeholder="name@example.com"
                    />
                  </label>
                  <label className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <span>الرسالة</span>
                    <textarea
                      className="min-h-36 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-sky-400 dark:focus:ring-sky-500/10"
                      placeholder="اكتب رسالتك هنا"
                    />
                  </label>
                  <button
                    type="submit"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-sky-600 px-6 text-sm font-semibold text-white shadow-[0_18px_50px_-24px_rgba(2,132,199,0.7)] transition hover:bg-sky-500 dark:bg-sky-500 dark:hover:bg-sky-400"
                  >
                    إرسال الرسالة
                    <ArrowLeft className="h-4 w-4" aria-hidden />
                  </button>
                </form>
              </div>
            </GlassCard>
          </div>
        </section>

        <section className="pb-20 pt-4 sm:pb-24">
          <div className="container-app">
            <GlassCard className="relative overflow-hidden px-6 py-10 sm:px-10 sm:py-14">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.18),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.2),rgba(255,255,255,0.02))] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.2),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01))]" />
              <div className="relative z-10 mx-auto max-w-3xl text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-white/75 px-4 py-2 text-[11px] font-bold tracking-[0.28em] text-sky-600 backdrop-blur-xl dark:border-sky-400/20 dark:bg-white/5 dark:text-sky-300 uppercase">
                  Final CTA
                </div>
                <h2 className="mt-6 font-display text-3xl font-black leading-[1.12] text-slate-950 dark:text-white sm:text-5xl">
                  ابدأ إدارة سيارتك بطريقة أكثر ذكاءً
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
                  أنشئ حسابك وابدأ في متابعة صيانة سيارتك من مكان واحد.
                </p>
                <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                  <PrimaryButton href="/choose-role">
                    ابدأ الآن
                    <ArrowLeft className="h-5 w-5" aria-hidden />
                  </PrimaryButton>
                  <SecondaryButton href="#features">
                    استكشف المنصة
                    <ArrowUpLeft className="h-5 w-5" aria-hidden />
                  </SecondaryButton>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-slate-200/80 py-8 dark:border-white/10">
        <div className="container-app flex flex-col gap-6 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
            <div>
              <div className="font-display text-xl font-bold text-slate-950 dark:text-white">سيارتي</div>
              <div className="mt-2 max-w-md leading-7">
                منصة عربية حديثة لإدارة الصيانة، فهم الأعطال، واختيار الخدمات والزيوت المناسبة بثقة
                أكبر.
              </div>
            </div>

            <div className="flex flex-wrap gap-5">
              {footerLinks.map((item) => (
                <Link key={item.label} href={item.href} className="transition hover:text-slate-950 dark:hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start justify-between gap-3 border-t border-slate-200/80 pt-5 md:flex-row md:items-center dark:border-white/10">
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
