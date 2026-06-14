"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  Bot,
  CalendarCheck,
  CheckCircle2,
  Droplets,
  FileText,
  Gauge,
  Mail,
  Menu,
  MessageSquareText,
  Moon,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Sun,
  User,
  Wrench,
  X,
} from "lucide-react";

import { SITE } from "../components/site";
import { formatDaPrice, getAllOilStoreProducts } from "../customer/store/catalog";
import { useTheme } from "../theme/ThemeProvider";

const heroVehicle = "/assets/doblo.jpg";
const logoSrc = "/favicon.ico";
const oilProducts = getAllOilStoreProducts().slice(0, 4);

const navItems = [
  { label: "عن سيارتي", href: "#about" },
  { label: "المزايا", href: "#features" },
  { label: "الزيوت", href: "#oils" },
  { label: "آراء العملاء", href: "#testimonials" },
  { label: "تواصل", href: "#contact" },
];

const trustBadges = [
  "سجل صيانة رقمي",
  "توصيات زيوت دقيقة",
  "ميكانيكيون موثوقون",
  "سوق قطع غيار متكامل",
];

const aboutItems = [
  {
    title: "متابعة الصيانة",
    description:
      "سجل رقمي مرتب لكل خدمة وقطعة وفاتورة، حتى تبقى حالة السيارة واضحة في أي وقت.",
  },
  {
    title: "توصيات الزيوت",
    description:
      "اقتراحات مبنية على نوع السيارة والموديل والاستخدام، لتقليل التخمين ورفع دقة القرار.",
  },
  {
    title: "تشخيص الأعطال",
    description:
      "فهم أولي للأعراض والأسباب المحتملة قبل التوجه للورشة، مع توجيه واضح للخطوة التالية.",
  },
  {
    title: "حجز الميكانيكي",
    description:
      "اختيار الفني المناسب وتثبيت الموعد ومتابعة حالة الخدمة ضمن رحلة واحدة سلسة.",
  },
  {
    title: "سوق قطع الغيار",
    description:
      "عرض منتجات وخيارات شراء موثوقة داخل نفس المنصة، من دون التنقل بين أدوات متفرقة.",
  },
];

const featureCards = [
  {
    title: "سجل الصيانة",
    description: "توثيق كل خدمة بدقة مع تواريخ وفواتير وملاحظات يسهل الرجوع إليها.",
    icon: FileText,
  },
  {
    title: "توصيات الزيوت",
    description: "ترشيحات مناسبة للمحرك والموديل ونمط الاستخدام بدل التوصيات العامة.",
    icon: Droplets,
  },
  {
    title: "تشخيص الأعطال",
    description: "تحليل أولي يساعدك على فهم العطل قبل زيارة الميكانيكي وتقدير الأولوية.",
    icon: Gauge,
  },
  {
    title: "حجز الميكانيكيين",
    description: "تجربة حجز واضحة مع مواعيد مؤكدة ومتابعة مستمرة لحالة الخدمة.",
    icon: CalendarCheck,
  },
  {
    title: "سوق قطع الغيار",
    description: "وصول أسرع إلى منتجات مناسبة لسيارتك مع تجربة شراء أكثر تنظيمًا.",
    icon: ShoppingBag,
  },
  {
    title: "مساعد ذكي للسيارات",
    description: "مساعد يفهم الأعراض الشائعة ويقدم توجيهًا عمليًا مبنيًا على السياق.",
    icon: Bot,
  },
];

const assistantPoints = [
  "يرصد الأعراض التي تكتبها أو تلاحظها أثناء القيادة.",
  "يقترح الأسباب المحتملة بحسب المؤشرات الشائعة.",
  "يوصي بالحلول المناسبة أو مستوى الاستعجال.",
  "يرشدك إلى خطوات صيانة وقائية تقلل الأعطال المفاجئة.",
];

const workSteps = [
  {
    step: "01",
    title: "أضف سيارتك",
    description: "ابدأ بمعلومات السيارة الأساسية حتى تصبح كل التوصيات أكثر دقة وارتباطًا بحالتها.",
  },
  {
    step: "02",
    title: "احصل على التوصيات المناسبة",
    description: "استعرض الزيوت والخدمات والتنبيهات المقترحة بناءً على بيانات سيارتك.",
  },
  {
    step: "03",
    title: "احجز الميكانيكي",
    description: "اختر الفني المناسب وحدد موعد الخدمة من نفس المنصة دون خطوات مشتتة.",
  },
  {
    step: "04",
    title: "تابع الصيانة",
    description: "دوّن ما تم واحتفظ بتاريخ الخدمة لتبقى قراراتك القادمة مبنية على معلومات أوضح.",
  },
];

const testimonials = [
  {
    name: "آمنة قرفي",
    role: "مالكة سيارة عائلية",
    quote:
      "سيارتي أعطتني أخيرًا صورة كاملة عن السيارة: ماذا تم، ماذا يجب أن يتم، ومتى يجب أن أتصرف. الواجهة أنيقة لكن قيمتها الحقيقية في الوضوح.",
  },
  {
    name: "ياسين بوعون",
    role: "يعتمد على الصيانة الوقائية",
    quote:
      "قسم توصيات الزيوت وفر علي وقتًا كثيرًا، والمساعد الذكي جعلني أصل للميكانيكي وأنا أفهم الاحتمالات بدل أن أبدأ من الصفر.",
  },
  {
    name: "رنا شريفي",
    role: "تدير أكثر من سيارة",
    quote:
      "أكثر ما أحببته هو أن كل شيء في منصة واحدة: سجل الصيانة، الحجز، قطع الغيار، وحتى الإرشاد عند ظهور مشكلة مفاجئة.",
  },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const effectiveTheme = theme === "dark" ? "dark" : "light";

  return (
    <div className="inline-flex items-center rounded-full border border-[#d7e6ff] bg-white/85 p-1 text-[#12325b] shadow-[0_14px_30px_-22px_rgba(15,23,42,0.35)] dark:border-[#21406d] dark:bg-[#091222]/88 dark:text-[#dfe9ff]">
      {([
        { mode: "light" as const, icon: Sun, label: "فاتح" },
        { mode: "dark" as const, icon: Moon, label: "داكن" },
      ] as const).map((option) => {
        const Icon = option.icon;
        const selected = effectiveTheme === option.mode;

        return (
          <button
            key={option.mode}
            type="button"
            onClick={() => setTheme(option.mode)}
            className={[
              "inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-bold transition sm:px-4",
              selected
                ? "bg-[#0f62fe] text-white shadow-[0_16px_30px_-20px_rgba(15,98,254,0.75)]"
                : "text-[#5f7698] hover:text-[#0c2340] dark:text-[#8ba3c8] dark:hover:text-white",
            ].join(" ")}
            aria-pressed={selected}
          >
            <Icon className="h-4 w-4" aria-hidden />
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function SectionHeader({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-[#bfd8ff] bg-[#eef5ff] px-4 py-2 text-[11px] font-extrabold tracking-[0.28em] text-[#0f62fe] dark:border-[#284675] dark:bg-[#0c1730] dark:text-[#7db4ff]">
        <span className="h-2 w-2 rounded-full bg-current" />
        {label}
      </div>
      <h2 className="mt-6 font-display text-3xl font-black leading-tight text-[#08172d] dark:text-white sm:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-[#5f7698] dark:text-[#9bb3d8] sm:text-lg">
        {description}
      </p>
    </div>
  );
}

function PremiumCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-[32px] border border-[#d7e6ff] bg-white/82 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.28)] backdrop-blur-xl dark:border-[#1a3258] dark:bg-[#091120]/84 dark:shadow-[0_30px_80px_-48px_rgba(2,8,20,0.92)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export default function LandingUI() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      dir="rtl"
      className="relative overflow-hidden bg-[#f8fbff] text-[#08172d] dark:bg-[#040915] dark:text-white"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(15,98,254,0.18),transparent_32%),linear-gradient(180deg,#f8fbff_0%,#eef5ff_38%,#f8fbff_100%)] dark:bg-[radial-gradient(circle_at_top,rgba(38,116,255,0.28),transparent_28%),linear-gradient(180deg,#040915_0%,#071120_38%,#040915_100%)]" />
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(15,98,254,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(15,98,254,0.05)_1px,transparent_1px)] [background-size:96px_96px]" />
        <div className="absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[#0f62fe]/18 blur-[120px] dark:bg-[#0f62fe]/22" />
      </div>

      <header id="home" className="relative z-30">
        <div className="container-app pt-5">
          <div className="rounded-full border border-[#d7e6ff] bg-white/78 px-4 shadow-[0_24px_54px_-40px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-[#183156] dark:bg-[#08101f]/84">
            <div className="flex min-h-18 items-center justify-between gap-3 py-3">
              <Link href="/" className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#cfe1ff] bg-white dark:border-[#21406d] dark:bg-[#0d1830]">
                  <Image src={logoSrc} alt="Sayarati" width={30} height={30} className="h-8 w-8" />
                </span>
                <span className="leading-none">
                  <span className="block font-display text-xl font-black text-[#08172d] dark:text-white">
                    سيارتي
                  </span>
                  <span className="mt-1 block text-[11px] font-bold tracking-[0.34em] text-[#0f62fe]">
                    SAYARATI
                  </span>
                </span>
              </Link>

              <nav className="hidden items-center gap-6 text-sm font-semibold text-[#597191] dark:text-[#9ab0d4] lg:flex">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="transition hover:text-[#0f62fe] dark:hover:text-[#7db4ff]"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="hidden items-center gap-3 lg:flex">
                <ThemeToggle />
                <Link
                  href="/choose-role"
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-[#0f62fe] px-6 text-sm font-bold text-white shadow-[0_22px_40px_-18px_rgba(15,98,254,0.8)] transition hover:-translate-y-0.5 hover:bg-[#0551df]"
                >
                  ابدأ الآن
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                </Link>
              </div>

              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d7e6ff] bg-white/90 text-[#0c2340] dark:border-[#21406d] dark:bg-[#0b1427] dark:text-white lg:hidden"
                onClick={() => setMenuOpen((value) => !value)}
                aria-label="فتح القائمة"
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
              </button>
            </div>
          </div>

          {menuOpen ? (
            <PremiumCard className="mt-3 p-4 lg:hidden">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-2xl px-4 py-3 text-sm font-bold text-[#0c2340] transition hover:bg-[#eef5ff] dark:text-white dark:hover:bg-[#0d1830]"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <div className="pt-2">
                  <ThemeToggle />
                </div>
                <Link
                  href="/choose-role"
                  className="mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-[#0f62fe] px-5 text-sm font-bold text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  ابدأ الآن
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </PremiumCard>
          ) : null}
        </div>
      </header>

      <main className="relative z-10">
        <section className="container-app grid min-h-[calc(100svh-92px)] items-center gap-12 pb-20 pt-10 lg:grid-cols-[0.95fr_minmax(0,1.05fr)] lg:pb-24">
          <div className="order-2 space-y-8 lg:order-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#bfdbff] bg-white/80 px-4 py-2 text-[11px] font-extrabold tracking-[0.28em] text-[#0f62fe] dark:border-[#284675] dark:bg-[#091222]/88 dark:text-[#8dc0ff]">
              <Sparkles className="h-4 w-4" aria-hidden />
              منصة عربية لإدارة صيانة السيارة
            </div>

            <div className="space-y-5">
              <h1 className="font-display text-4xl font-black leading-[1.05] text-[#08172d] dark:text-white sm:text-6xl lg:text-[4.65rem]">
                قرارات صيانة أفضل
                <span className="block text-[#0f62fe]">تبدأ بمعلومات أوضح.</span>
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[#5f7698] dark:text-[#9ab1d3] sm:text-xl sm:leading-10">
                من سجل الصيانة وتوصيات الزيوت المناسبة إلى تشخيص الأعطال وحجز الخدمات،
                تمنحك سيارتي رؤية أوضح وتحكماً أكبر في كل ما يخص سيارتك، لتتخذ قرارات
                صيانة أكثر ذكاءً وتجنب التكاليف غير المتوقعة.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/choose-role"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#0f62fe] px-8 text-base font-bold text-white shadow-[0_26px_44px_-18px_rgba(15,98,254,0.72)] transition hover:-translate-y-0.5 hover:bg-[#0551df]"
              >
                ابدأ الآن
                <ArrowLeft className="h-5 w-5" aria-hidden />
              </Link>
              <Link
                href="/customer/recommendations"
                className="inline-flex h-14 items-center justify-center rounded-full border border-[#c7dcff] bg-white/88 px-8 text-base font-bold text-[#0c2340] transition hover:-translate-y-0.5 hover:border-[#0f62fe] hover:text-[#0f62fe] dark:border-[#21406d] dark:bg-[#091222]/84 dark:text-white dark:hover:border-[#4d8fff] dark:hover:text-[#7db4ff]"
              >
                اعرف الزيت المناسب لسيارتك
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {trustBadges.map((item) => (
                <div
                  key={item}
                  className="inline-flex items-center gap-2 rounded-2xl border border-[#d7e6ff] bg-white/82 px-4 py-3 text-sm font-bold text-[#12325b] shadow-[0_20px_40px_-30px_rgba(15,23,42,0.28)] dark:border-[#1b345b] dark:bg-[#08111f]/88 dark:text-[#dce8ff]"
                >
                  <CheckCircle2 className="h-4 w-4 text-[#0f62fe]" aria-hidden />
                  {item}
                </div>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { value: "12K+", label: "ملف صيانة نشط" },
                { value: "96%", label: "رضا المستخدمين" },
                { value: "24/7", label: "إرشاد ذكي متواصل" },
              ].map((item) => (
                <PremiumCard key={item.label} className="p-5">
                  <div className="text-3xl font-black text-[#0f62fe]">{item.value}</div>
                  <p className="mt-2 text-sm text-[#5f7698] dark:text-[#9ab1d3]">{item.label}</p>
                </PremiumCard>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-[760px]">
              <div className="absolute -right-3 top-10 z-20 hidden w-48 rounded-[28px] border border-[#d7e6ff] bg-white/90 p-4 shadow-[0_30px_50px_-34px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-[#1f3a63] dark:bg-[#0a1324]/90 sm:block">
                <div className="text-[11px] font-extrabold tracking-[0.22em] text-[#0f62fe]">
                  SMART MAINTENANCE
                </div>
                <div className="mt-3 text-2xl font-black text-[#08172d] dark:text-white">
                  +38%
                </div>
                <div className="mt-2 text-sm leading-6 text-[#5f7698] dark:text-[#9ab1d3]">
                  سرعة أعلى في الانتقال من التشخيص إلى الحجز.
                </div>
              </div>

              <div className="absolute -left-3 bottom-8 z-20 hidden w-52 rounded-[28px] border border-[#255bc9] bg-[#0f62fe] p-4 text-white shadow-[0_30px_56px_-34px_rgba(15,98,254,0.88)] backdrop-blur-xl sm:block">
                <div className="flex items-center gap-2 text-white/90">
                  <BadgeCheck className="h-4 w-4" aria-hidden />
                  <span className="text-[11px] font-extrabold tracking-[0.22em]">
                    AI + SERVICE
                  </span>
                </div>
                <div className="mt-3 text-lg font-bold">توصيات أوضح وتجربة أهدأ.</div>
              </div>

              <PremiumCard className="overflow-hidden p-4 sm:p-5">
                <div className="relative overflow-hidden rounded-[34px] border border-[#d7e6ff] bg-[linear-gradient(180deg,rgba(255,255,255,0.55),rgba(229,239,255,0.7))] dark:border-[#183156] dark:bg-[linear-gradient(180deg,rgba(11,20,39,0.74),rgba(4,9,21,0.96))]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(15,98,254,0.22),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0))] dark:bg-[radial-gradient(circle_at_top_left,rgba(15,98,254,0.3),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0))]" />
                  <Image
                    src={heroVehicle}
                    alt="سيارة معروضة على منصة سيارتي"
                    width={1280}
                    height={864}
                    priority
                    quality={85}
                    sizes="(max-width: 1024px) 100vw, 52vw"
                    className="relative z-10 h-auto w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(180deg,rgba(248,251,255,0.04),transparent_42%,rgba(4,9,21,0.52)_100%)]" />

                  <div className="absolute right-4 top-4 z-30 rounded-[22px] border border-white/40 bg-white/88 px-4 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-[#091222]/86">
                    <div className="text-[11px] font-extrabold tracking-[0.22em] text-[#0f62fe]">
                      SAYARATI DASHBOARD
                    </div>
                    <div className="mt-2 text-base font-bold text-[#08172d] dark:text-white">
                      رؤية موحدة لكل ما يخص سيارتك
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 z-30 grid gap-3 md:grid-cols-3">
                    {[
                      { icon: ShieldCheck, label: "سجل صيانة قابل للرجوع", value: "دائمًا" },
                      { icon: Droplets, label: "مطابقة الزيت المناسب", value: "بدقة" },
                      { icon: Wrench, label: "حجز خدمة موثوق", value: "بخطوات أقل" },
                    ].map((item) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.label}
                          className="rounded-[24px] border border-white/15 bg-[#06101f]/78 px-4 py-4 text-white backdrop-blur-xl"
                        >
                          <div className="flex items-center gap-2 text-[#7db4ff]">
                            <Icon className="h-4 w-4" aria-hidden />
                            <span className="text-[11px] font-extrabold tracking-[0.2em]">
                              {item.value}
                            </span>
                          </div>
                          <div className="mt-2 text-sm text-white/82">{item.label}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </PremiumCard>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 sm:py-24">
          <div className="container-app">
            <SectionHeader
              label="ABOUT SAYARATI"
              title="منصة صيانة ذكية بواجهة عربية واضحة"
              description="سيارتي ليست مجرد صفحة معلومات، بل منصة تشغيلية تساعدك على متابعة الصيانة، اختيار الزيت المناسب، فهم الأعطال، حجز الميكانيكي، والوصول إلى قطع الغيار من مكان واحد."
            />

            <div className="mt-14 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
              <PremiumCard className="p-7 sm:p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  {aboutItems.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-[26px] border border-[#dce9ff] bg-[#f9fbff] p-5 dark:border-[#183156] dark:bg-[#0b1426]"
                    >
                      <div className="text-lg font-bold text-[#08172d] dark:text-white">
                        {item.title}
                      </div>
                      <p className="mt-3 text-sm leading-7 text-[#5f7698] dark:text-[#9ab1d3]">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </PremiumCard>

              <PremiumCard className="relative overflow-hidden p-7 sm:p-8">
                <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(15,98,254,0.18),transparent_62%)]" />
                <div className="relative">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#cfe1ff] bg-white/80 px-4 py-2 text-xs font-extrabold text-[#0f62fe] dark:border-[#284675] dark:bg-[#0c1730]">
                    <Gauge className="h-4 w-4" aria-hidden />
                    تجربة تشغيلية متكاملة
                  </div>
                  <h3 className="mt-6 text-2xl font-black text-[#08172d] dark:text-white sm:text-3xl">
                    كل قرار صيانة يصبح أسهل عندما تكون البيانات منظمة.
                  </h3>
                  <p className="mt-4 text-base leading-8 text-[#5f7698] dark:text-[#9ab1d3]">
                    بفضل التصميم البسيط والمنطق العملي، تمنحك سيارتي طبقة واضحة بينك وبين
                    التعقيد المعتاد في الصيانة. ترى ما حدث، ما يجب فعله، ومن الأنسب لتنفيذه.
                  </p>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {[
                      "معلومات موحدة بدل المحادثات المتناثرة",
                      "واجهة عربية RTL جاهزة للاستخدام اليومي",
                      "قرارات أسرع مبنية على سجل واضح",
                      "تجربة شراء وخدمة أكثر احترافية",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-[#dce9ff] bg-white/82 px-4 py-4 text-sm font-semibold text-[#12325b] dark:border-[#1b345b] dark:bg-[#091222]/86 dark:text-[#dce8ff]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </PremiumCard>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 sm:py-24">
          <div className="container-app">
            <SectionHeader
              label="FEATURES"
              title="كل ما تحتاجه لسيارتك في منصة واحدة"
              description="واجهة موحدة تجمع إدارة المعلومات، التشخيص، الحجز، والشراء في تجربة حديثة بتفاصيل بصرية نظيفة وتأثيرات تفاعلية خفيفة."
            />

            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {featureCards.map((feature) => {
                const Icon = feature.icon;

                return (
                  <PremiumCard
                    key={feature.title}
                    className="group h-full p-7 transition duration-300 hover:-translate-y-1.5 hover:border-[#0f62fe]/40 hover:shadow-[0_34px_80px_-46px_rgba(15,98,254,0.34)]"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-[20px] border border-[#cce0ff] bg-[#eef5ff] text-[#0f62fe] transition duration-300 group-hover:scale-105 group-hover:bg-[#0f62fe] group-hover:text-white dark:border-[#21406d] dark:bg-[#0c1730]">
                      <Icon className="h-7 w-7" aria-hidden />
                    </div>
                    <h3 className="mt-6 text-2xl font-black text-[#08172d] dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-4 text-sm leading-8 text-[#5f7698] dark:text-[#9ab1d3]">
                      {feature.description}
                    </p>
                  </PremiumCard>
                );
              })}
            </div>
          </div>
        </section>

        <section id="assistant" className="py-20 sm:py-24">
          <div className="container-app">
            <SectionHeader
              label="AI ASSISTANT"
              title="مساعد ذكي يفهم سيارتك"
              description="يترجم الأعراض إلى مؤشرات مفهومة، يساعدك على تقدير الاحتمالات، ويقترح عليك التصرف الأنسب قبل أن تتحول المشكلة إلى تكلفة أكبر."
            />

            <div className="mt-14 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <PremiumCard className="overflow-hidden p-7 sm:p-8">
                <div className="rounded-[30px] border border-[#dce9ff] bg-[linear-gradient(180deg,#f9fbff_0%,#edf5ff_100%)] p-6 dark:border-[#183156] dark:bg-[linear-gradient(180deg,#0b1426_0%,#071120_100%)]">
                  <div className="flex items-center gap-3 text-[#0f62fe]">
                    <Bot className="h-6 w-6" aria-hidden />
                    <span className="text-sm font-extrabold tracking-[0.24em]">AI INSIGHT FLOW</span>
                  </div>

                  <div className="mt-8 space-y-4">
                    {[
                      { title: "رصد الأعراض", text: "مثل صوت غير معتاد، استهلاك مرتفع، أو اهتزاز مفاجئ." },
                      { title: "تحديد الأسباب", text: "اقتراح الاحتمالات الأقرب بناءً على الأعراض الموصوفة." },
                      { title: "توجيه للحل", text: "إظهار ما إذا كانت الحالة عاجلة أو يمكن مراقبتها مؤقتًا." },
                    ].map((item, index) => (
                      <div
                        key={item.title}
                        className="flex gap-4 rounded-[24px] border border-[#dce9ff] bg-white/88 p-5 dark:border-[#183156] dark:bg-[#091222]/84"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0f62fe] text-sm font-black text-white">
                          0{index + 1}
                        </div>
                        <div>
                          <div className="text-lg font-bold text-[#08172d] dark:text-white">
                            {item.title}
                          </div>
                          <p className="mt-2 text-sm leading-7 text-[#5f7698] dark:text-[#9ab1d3]">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </PremiumCard>

              <div className="grid gap-6">
                {assistantPoints.map((item) => (
                  <PremiumCard key={item} className="p-6">
                    <div className="flex items-start gap-4">
                      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eef5ff] text-[#0f62fe] dark:bg-[#0c1730] dark:text-[#8dc0ff]">
                        <Sparkles className="h-5 w-5" aria-hidden />
                      </span>
                      <p className="text-base leading-8 text-[#12325b] dark:text-[#dce8ff]">{item}</p>
                    </div>
                  </PremiumCard>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="oils" className="py-20 sm:py-24">
          <div className="container-app">
            <SectionHeader
              label="RECOMMENDED OIL"
              title="الزيت المناسب لسيارتك"
              description="بطاقات منتجات فعلية من بيانات المتجر داخل المشروع، مع صورة المنتج والعلامة التجارية واللزوجة ورابط سريع للوصول إلى المتجر."
            />

            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {oilProducts.map((product) => (
                <PremiumCard
                  key={product.id}
                  className="group overflow-hidden transition duration-300 hover:-translate-y-1.5 hover:border-[#0f62fe]/40 hover:shadow-[0_34px_80px_-48px_rgba(15,98,254,0.35)]"
                >
                  <div className="relative overflow-hidden border-b border-[#dce9ff] bg-[#f6faff] dark:border-[#183156] dark:bg-[#081120]">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={768}
                      height={768}
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="space-y-4 p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#eef5ff] px-3 py-1 text-xs font-extrabold text-[#0f62fe] dark:bg-[#0c1730] dark:text-[#8dc0ff]">
                        {product.brand}
                      </span>
                      <span className="rounded-full bg-[#edf2fb] px-3 py-1 text-xs font-bold text-[#45658a] dark:bg-[#111d33] dark:text-[#a6bfdf]">
                        {product.viscosity}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-[#08172d] dark:text-white">
                        {product.title}
                      </h3>
                      <p className="mt-2 text-sm text-[#5f7698] dark:text-[#9ab1d3]">
                        {product.packageSize} • {formatDaPrice(product.priceDa)}
                      </p>
                    </div>
                    <Link
                      href="/customer/store"
                      className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[#0f62fe] px-4 text-sm font-bold text-white transition hover:bg-[#0551df]"
                    >
                      عرض في المتجر
                    </Link>
                  </div>
                </PremiumCard>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 sm:py-24">
          <div className="container-app">
            <SectionHeader
              label="HOW IT WORKS"
              title="كيف تعمل سيارتي؟"
              description="رحلة بسيطة وواضحة تبدأ بإضافة السيارة وتنتهي بإدارة سجل صيانتها بذكاء أعلى ووضوح أكبر."
            />

            <div className="relative mt-14 grid gap-6 lg:grid-cols-4">
              <div className="pointer-events-none absolute right-[6.75rem] top-14 hidden h-px w-[calc(100%-13.5rem)] bg-[linear-gradient(90deg,rgba(15,98,254,0.08),rgba(15,98,254,0.4),rgba(15,98,254,0.08))] lg:block" />
              {workSteps.map((step) => (
                <PremiumCard key={step.step} className="relative p-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0f62fe] text-lg font-black text-white shadow-[0_18px_34px_-16px_rgba(15,98,254,0.75)]">
                    {step.step}
                  </div>
                  <h3 className="mt-6 text-2xl font-black text-[#08172d] dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-sm leading-8 text-[#5f7698] dark:text-[#9ab1d3]">
                    {step.description}
                  </p>
                </PremiumCard>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-20 sm:py-24">
          <div className="container-app">
            <SectionHeader
              label="TESTIMONIALS"
              title="ما الذي يقوله مستخدمو سيارتي؟"
              description="بطاقات تقييم مصممة بأسلوب هادئ وفاخر، تركز على أثر المنصة في اتخاذ القرار اليومي المتعلق بالصيانة."
            />

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <PremiumCard key={testimonial.name} className="h-full p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xl font-black text-[#08172d] dark:text-white">
                        {testimonial.name}
                      </div>
                      <div className="mt-2 text-sm font-semibold text-[#0f62fe]">
                        {testimonial.role}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[#0f62fe]">
                      {Array.from({ length: 5 }, (_, starIndex) => (
                        <Star
                          key={`${testimonial.name}-${starIndex}`}
                          className="h-4 w-4 fill-current"
                          aria-hidden
                        />
                      ))}
                    </div>
                  </div>

                  <p className="mt-6 text-base leading-8 text-[#12325b] dark:text-[#dce8ff]">
                    &quot;{testimonial.quote}&quot;
                  </p>

                  <div className="mt-8 flex items-center gap-3 rounded-2xl border border-[#dce9ff] bg-[#f9fbff] px-4 py-3 dark:border-[#183156] dark:bg-[#0b1426]">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#0f62fe] text-white">
                      {index + 1}
                    </span>
                    <span className="text-sm font-bold text-[#45658a] dark:text-[#9ab1d3]">
                      تقييم موثوق من مستخدم فعلي للمنصة
                    </span>
                  </div>
                </PremiumCard>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 sm:py-24">
          <div className="container-app">
            <SectionHeader
              label="CONTACT"
              title="تواصل معنا"
              description="مساحة اتصال مباشرة بتصميم واضح ومريح بصريًا، مع نموذج بسيط جاهز لالتقاط استفسارات العملاء."
            />

            <div className="mt-14 grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
              <div className="grid gap-6">
                <PremiumCard className="p-7">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef5ff] text-[#0f62fe] dark:bg-[#0c1730] dark:text-[#8dc0ff]">
                      <Mail className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <div className="text-sm font-extrabold text-[#0f62fe]">قناة تواصل مباشرة</div>
                      <div className="mt-1 text-2xl font-black text-[#08172d] dark:text-white">
                        فريق سيارتي جاهز لمساعدتك
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4">
                    <div className="rounded-[24px] border border-[#dce9ff] bg-[#f9fbff] p-4 dark:border-[#183156] dark:bg-[#0b1426]">
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-[#0f62fe]" aria-hidden />
                        <span className="text-sm font-bold text-[#45658a] dark:text-[#9ab1d3]">البريد</span>
                      </div>
                      <a
                        href={`mailto:${SITE.email}`}
                        className="mt-2 block text-base font-bold text-[#08172d] dark:text-white"
                      >
                        {SITE.email}
                      </a>
                    </div>

                    <div className="rounded-[24px] border border-[#dce9ff] bg-[#f9fbff] p-4 dark:border-[#183156] dark:bg-[#0b1426]">
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-[#0f62fe]" aria-hidden />
                        <span className="text-sm font-bold text-[#45658a] dark:text-[#9ab1d3]">الهاتف</span>
                      </div>
                      <a
                        href={`tel:${SITE.phone}`}
                        className="mt-2 block text-base font-bold text-[#08172d] dark:text-white"
                      >
                        {SITE.phone}
                      </a>
                    </div>

                    <div className="rounded-[24px] border border-[#dce9ff] bg-[#f9fbff] p-4 dark:border-[#183156] dark:bg-[#0b1426]">
                      <div className="text-sm font-bold text-[#45658a] dark:text-[#9ab1d3]">المدينة</div>
                      <div className="mt-2 text-base font-bold text-[#08172d] dark:text-white">
                        {SITE.city}
                      </div>
                    </div>
                  </div>
                </PremiumCard>
              </div>

              <PremiumCard className="p-7 sm:p-8">
                <div className="grid gap-5">
                  <div>
                    <div className="text-sm font-extrabold text-[#0f62fe]">نموذج التواصل</div>
                    <h3 className="mt-2 text-3xl font-black text-[#08172d] dark:text-white">
                      اترك رسالتك وسنعود إليك
                    </h3>
                  </div>

                  <form className="grid gap-5">
                    <label className="grid gap-2">
                      <span className="text-sm font-bold text-[#45658a] dark:text-[#9ab1d3]">Name</span>
                      <div className="relative">
                        <User className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6f88ac]" aria-hidden />
                        <input
                          type="text"
                          className="h-[52px] w-full rounded-2xl border border-[#d6e5ff] bg-[#f9fbff] pr-11 text-sm text-[#08172d] outline-none transition placeholder:text-[#8aa3c4] focus:border-[#0f62fe] focus:bg-white focus:ring-4 focus:ring-[#0f62fe]/10 dark:border-[#183156] dark:bg-[#0b1426] dark:text-white dark:placeholder:text-[#6f88ac]"
                          placeholder="اكتب اسمك"
                        />
                      </div>
                    </label>

                    <label className="grid gap-2">
                      <span className="text-sm font-bold text-[#45658a] dark:text-[#9ab1d3]">Email</span>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6f88ac]" aria-hidden />
                        <input
                          type="email"
                          className="h-[52px] w-full rounded-2xl border border-[#d6e5ff] bg-[#f9fbff] pr-11 text-sm text-[#08172d] outline-none transition placeholder:text-[#8aa3c4] focus:border-[#0f62fe] focus:bg-white focus:ring-4 focus:ring-[#0f62fe]/10 dark:border-[#183156] dark:bg-[#0b1426] dark:text-white dark:placeholder:text-[#6f88ac]"
                          placeholder="name@example.com"
                        />
                      </div>
                    </label>

                    <label className="grid gap-2">
                      <span className="text-sm font-bold text-[#45658a] dark:text-[#9ab1d3]">Message</span>
                      <div className="relative">
                        <MessageSquareText className="pointer-events-none absolute right-4 top-4 h-4 w-4 text-[#6f88ac]" aria-hidden />
                        <textarea
                          className="min-h-40 w-full rounded-2xl border border-[#d6e5ff] bg-[#f9fbff] pr-11 pt-3 text-sm text-[#08172d] outline-none transition placeholder:text-[#8aa3c4] focus:border-[#0f62fe] focus:bg-white focus:ring-4 focus:ring-[#0f62fe]/10 dark:border-[#183156] dark:bg-[#0b1426] dark:text-white dark:placeholder:text-[#6f88ac]"
                          placeholder="اكتب رسالتك هنا"
                        />
                      </div>
                    </label>

                    <button
                      type="submit"
                      className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-[#0f62fe] px-6 text-sm font-bold text-white shadow-[0_24px_42px_-20px_rgba(15,98,254,0.74)] transition hover:bg-[#0551df]"
                    >
                      إرسال الرسالة
                      <ArrowLeft className="h-4 w-4" aria-hidden />
                    </button>
                  </form>
                </div>
              </PremiumCard>
            </div>
          </div>
        </section>

        <section className="pb-20 pt-4 sm:pb-24">
          <div className="container-app">
            <div className="relative overflow-hidden rounded-[40px] border border-[#bdd7ff] bg-[linear-gradient(135deg,#0f62fe_0%,#0a3a99_100%)] px-6 py-12 text-white shadow-[0_38px_100px_-48px_rgba(15,98,254,0.8)] sm:px-10 sm:py-16">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.24),transparent_28%)]" />
              <div className="relative z-10 mx-auto max-w-3xl text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-extrabold tracking-[0.22em]">
                  FINAL CTA
                </div>
                <h2 className="mt-6 font-display text-3xl font-black leading-tight sm:text-5xl">
                  ابدأ إدارة سيارتك بطريقة أكثر ذكاءً
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/82 sm:text-lg">
                  أنشئ حسابك وابدأ في متابعة صيانة سيارتك من مكان واحد.
                </p>
                <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                  <Link
                    href="/choose-role"
                    className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-white px-8 text-base font-bold text-[#0f62fe] transition hover:bg-[#edf5ff]"
                  >
                    ابدأ الآن
                    <ArrowLeft className="h-5 w-5" aria-hidden />
                  </Link>
                  <a
                    href="#about"
                    className="inline-flex h-[52px] items-center justify-center rounded-full border border-white/22 bg-white/10 px-8 text-base font-bold text-white transition hover:bg-white/16"
                  >
                    استكشف المنصة
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-[#dce9ff] pb-10 pt-8 dark:border-[#142947]">
        <div className="container-app flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="font-display text-xl font-black text-[#08172d] dark:text-white">
              سيارتي
            </div>
            <div className="mt-2 text-sm text-[#5f7698] dark:text-[#9ab1d3]">
              منصة عربية فاخرة لإدارة صيانة السيارة بوضوح أكبر.
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-sm font-semibold text-[#45658a] dark:text-[#9ab1d3]">
            <a href="#about" className="transition hover:text-[#0f62fe]">
              About
            </a>
            <a href="#contact" className="transition hover:text-[#0f62fe]">
              Contact
            </a>
            <Link href="/privacy" className="transition hover:text-[#0f62fe]">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition hover:text-[#0f62fe]">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
