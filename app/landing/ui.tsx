import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  Bot,
  CalendarCheck,
  Clock3,
  Gauge,
  Mail,
  MapPinned,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

import LandingMobileMenu from "./LandingMobileMenu";
import { SITE } from "../components/site";

const heroVehicle = "/assets/doblo.jpg";
const logoSrc = "/favicon.ico";

const navItems = [
  { label: "الرئيسية", href: "#home" },
  { label: "الخدمات", href: "#services" },
  { label: "الرحلة", href: "#timeline" },
  { label: "الآراء", href: "#testimonials" },
  { label: "التواصل", href: "#contact" },
];

const heroMetrics = [
  { value: "12K+", label: "ملف مركبة نشط" },
  { value: "96%", label: "رضا عن تجربة الحجز" },
  { value: "24/7", label: "مساعد ذكي ومتابعة" },
];

const trustMarks = ["Maintenance Intelligence", "Garage Booking", "Fleet Ready", "Arabic AI Support"];

const services = [
  {
    title: "سجل صيانة تنفيذي",
    eyebrow: "Ownership Ledger",
    description:
      "كل زيارة، قطعة، ملاحظة، وضمان داخل سجل بصري مرتب يسهل الرجوع إليه عند البيع أو الصيانة.",
    icon: ShieldCheck,
    stat: "Full history",
  },
  {
    title: "توصيات زيت وقطع مبنية على الموديل",
    eyebrow: "Smart Parts Match",
    description:
      "اقتراحات أكثر دقة حسب نوع السيارة والمحرك والاستخدام الفعلي بدل الاختيارات العامة المربكة.",
    icon: Sparkles,
    stat: "Model-aware",
  },
  {
    title: "تشخيص أولي بالذكاء الاصطناعي",
    eyebrow: "AI Diagnostics",
    description:
      "حلل الأصوات والأعراض قبل الذهاب إلى الورشة لتحصل على رؤية أوضح وتكلفة متوقعة بشكل أسرع.",
    icon: Bot,
    stat: "24/7 guidance",
  },
  {
    title: "حجز ميكانيكيين مع تأكيدات واضحة",
    eyebrow: "Service Booking",
    description:
      "اختيار الفني المناسب، تحديد الموعد، وتتبع حالة الطلب من الاستلام حتى التسليم النهائي.",
    icon: CalendarCheck,
    stat: "Live status",
  },
  {
    title: "سوق خدمات وقطع بجودة أعلى",
    eyebrow: "Marketplace",
    description:
      "مقارنة عروض الخدمات والزيوت وقطع الغيار داخل تجربة واحدة بتفاصيل تساعدك على اتخاذ القرار بثقة.",
    icon: Gauge,
    stat: "Verified options",
  },
  {
    title: "متابعة للأسطول والعائلة",
    eyebrow: "Fleet & Multi-car",
    description:
      "إدارة أكثر من مركبة في حساب واحد مع تنبيهات مستقلة، تقارير دورية، وصورة تشغيلية أوضح.",
    icon: Users,
    stat: "Multi-vehicle",
  },
];

const timeline = [
  {
    phase: "01",
    title: "تهيئة المركبة والملف الرقمي",
    description:
      "أضف الموديل، العداد، آخر خدمة، وأهداف الاستخدام حتى تبدأ التوصيات من سياق حقيقي.",
  },
  {
    phase: "02",
    title: "فهم الحالة الحالية",
    description:
      "راجع التنبيهات، اسأل المساعد الذكي، واستكشف الخدمات المقترحة قبل اتخاذ أي خطوة تنفيذية.",
  },
  {
    phase: "03",
    title: "حجز الخدمة المناسبة",
    description:
      "اختر الميكانيكي أو الورشة، ثبّت الموعد، وتابع تفاصيل الطلب والوقت المتوقع للإنجاز.",
  },
  {
    phase: "04",
    title: "توثيق ما تم وبناء القيمة المستقبلية",
    description:
      "أغلق الخدمة بسجل واضح وفواتير وملاحظات تساعدك في الصيانة القادمة وفي رفع قيمة المركبة.",
  },
];

const testimonials = [
  {
    name: "دعاء بن طوبال",
    role: "تدير ثلاث مركبات عائلية",
    quote:
      "أكثر ما أعجبني هو أن المنصة تبدو فاخرة لكن عملية جدًا. أعرف ماذا فعلت بكل سيارة ومتى يجب أن أتحرك قبل أن تتحول الصيانة إلى مشكلة أكبر.",
    photo:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=cinematic%20portrait%20of%20a%20confident%20north%20african%20woman%20car%20owner%2C%20premium%20automotive%20editorial%20lighting%2C%20graphite%20and%20amber%20tones%2C%20realistic%2C%20luxury%20garage%20background%2C%20professional%20headshot&image_size=square_hd",
  },
  {
    name: "وائل صالحي",
    role: "يعتمد على الصيانة الوقائية",
    quote:
      "تجربة الحجز والذكاء الاصطناعي اختصرت علي الوقت. صرت أصل للورشة وأنا أفهم الحالة أكثر، وهذا انعكس حتى على التكلفة والقرار النهائي.",
    photo:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=realistic%20portrait%20of%20a%20north%20african%20man%20driver%20in%20a%20premium%20garage%2C%20automotive%20luxury%20editorial%20style%2C%20warm%20amber%20rim%20light%2C%20graphite%20background%2C%20detailed%20photography&image_size=square_hd",
  },
  {
    name: "نوفل مسعودي",
    role: "يبحث عن منصة موثوقة للعائلة",
    quote:
      "سيارتي جمعت السجل، التوصيات، والحجز في واجهة واحدة مرتبة. أشعر أنني أمتلك نظام متابعة حقيقي وليس مجرد تطبيق آخر للمعلومات.",
    photo:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=cinematic%20portrait%20of%20an%20elegant%20north%20african%20family%20car%20owner%2C%20premium%20automotive%20brand%20campaign%2C%20realistic%20skin%20texture%2C%20golden%20hour%20studio%20lighting%2C%20luxury%20service%20center%20background&image_size=square_hd",
  },
];

const faqs = [
  {
    question: "هل سيارتي مناسبة للأفراد فقط؟",
    answer:
      "لا، المنصة مناسبة للأفراد، العائلات، وحتى أصحاب أكثر من مركبة أو ورش ترغب في متابعة الطلبات بشكل احترافي.",
  },
  {
    question: "هل أحتاج خبرة ميكانيكية لاستخدام المنصة؟",
    answer:
      "التجربة مبنية لتبسيط القرارات. تحصل على شرح واضح، تنبيهات مفهومة، وسياق يساعدك على التصرف بثقة حتى لو لم تكن خبيرًا.",
  },
  {
    question: "كيف يعمل اختيار الدور؟",
    answer:
      "تبدأ من شاشة اختيار النوع لتحديد ما إذا كنت عميلًا أو ميكانيكيًا، ثم تتكيّف الرحلة والواجهة مع احتياجك مباشرة.",
  },
];

const mapCities = [
  { name: "El Taref", top: "26%", right: "18%" },
  { name: "Annaba", top: "44%", right: "33%" },
  { name: "Constantine", top: "63%", right: "52%" },
  { name: "Skikda", top: "34%", right: "58%" },
];

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
      <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-[11px] font-bold tracking-[0.3em] text-primary/90 uppercase">
        <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_18px_var(--glow-primary)]" />
        {eyebrow}
      </div>
      <h2 className="mt-6 font-display text-3xl font-bold leading-tight text-foreground sm:text-5xl">
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

export default function LandingUI() {
  return (
    <div dir="rtl" className="relative overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(230,179,74,0.18),transparent_22%),radial-gradient(circle_at_84%_8%,rgba(247,191,70,0.14),transparent_18%),radial-gradient(circle_at_55%_46%,rgba(24,27,31,0.22),transparent_30%),linear-gradient(180deg,rgba(9,11,14,0.95)_0%,rgba(12,15,19,0.98)_48%,rgba(8,9,12,1)_100%)]" />
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(230,179,74,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(230,179,74,0.05)_1px,transparent_1px)] [background-size:120px_120px]" />
        <div className="absolute inset-x-[16%] top-0 h-48 rounded-full bg-primary/14 blur-[120px]" />
      </div>

      <header id="home" className="relative z-30">
        <div className="container-app pt-5">
          <div className="rounded-full border border-border/80 bg-card/85 px-4 shadow-[0_20px_56px_-38px_var(--shadow-ambient-strong)] backdrop-blur-xl">
            <div className="flex h-18 items-center justify-between gap-3">
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
                  Start Now
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                </Link>
              </div>

              <LandingMobileMenu navItems={navItems} />
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section className="container-app grid min-h-[calc(100svh-92px)] items-center gap-12 pb-20 pt-10 lg:grid-cols-[0.92fr_minmax(0,1.08fr)] lg:pb-24">
          <div className="order-2 space-y-8 lg:order-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold tracking-[0.28em] text-primary uppercase">
              <Sparkles className="h-4 w-4" aria-hidden />
              Premium Automotive 2026
            </div>

            <div className="space-y-5">
              <h1 className="font-display text-4xl font-black leading-[1.02] text-foreground sm:text-6xl lg:text-[4.85rem]">
                تجربة فاخرة لإدارة سيارتك
                <span className="block text-primary">بوضوح أسرع وقرار أذكى.</span>
              </h1>
              <p className="max-w-2xl text-base leading-8 text-muted sm:text-xl sm:leading-10">
                من أول تنبيه وقائي إلى حجز الورشة وتوثيق ما تم، تمنحك سيارتي منصة عربية راقية
                تجمع الصيانة والذكاء الاصطناعي والخدمات في رحلة واحدة تبدو حديثة وتعمل بجدية.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/choose-role" className="btn-primary h-14 px-8 text-base">
                Start Now
                <ArrowLeft className="h-5 w-5" aria-hidden />
              </Link>
              <a href="#services" className="btn-secondary h-14 px-8 text-base">
                استكشف الخدمات
                <ArrowUpRight className="h-5 w-5" aria-hidden />
              </a>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {heroMetrics.map((item) => (
                <GlassCard key={item.label} className="p-4">
                  <div className="text-2xl font-black text-primary">{item.value}</div>
                  <div className="mt-2 text-sm text-muted">{item.label}</div>
                </GlassCard>
              ))}
            </div>

            <div>
              <div className="text-xs font-bold tracking-[0.3em] text-muted uppercase">Trusted Flow</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {trustMarks.map((item) => (
                  <span key={item} className="chip border-primary/15 bg-card/75 text-foreground/82">
                    <span className="chip-dot bg-primary" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="order-1 mx-auto w-full max-w-[780px] lg:order-2">
            <div className="relative">
              <div className="absolute inset-x-[18%] top-14 h-32 rounded-full bg-primary/18 blur-[62px]" />
              <div className="absolute -right-3 top-10 z-20 hidden w-44 rounded-[28px] border border-primary/20 bg-card/92 p-4 shadow-[0_28px_60px_-38px_var(--shadow-ambient-strong)] backdrop-blur-xl sm:block">
                <div className="text-[11px] font-bold tracking-[0.24em] text-muted uppercase">Booking Confidence</div>
                <div className="mt-3 text-2xl font-black text-foreground">+38%</div>
                <div className="mt-1 text-sm leading-6 text-muted">تحويل أسرع من التوصية إلى الحجز الفعلي.</div>
              </div>
              <div className="absolute -left-4 bottom-8 z-20 hidden w-48 rounded-[28px] border border-primary/20 bg-[#12161b]/86 p-4 text-primary-foreground shadow-[0_28px_60px_-38px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:block">
                <div className="flex items-center gap-2 text-primary">
                  <BadgeCheck className="h-4 w-4" aria-hidden />
                  <span className="text-[11px] font-bold tracking-[0.24em] uppercase">AI + Human Care</span>
                </div>
                <div className="mt-3 text-lg font-bold text-white">أعطال أوضح. قرارات أهدأ.</div>
              </div>

              <GlassCard className="overflow-hidden p-4 sm:p-5">
                <div className="relative overflow-hidden rounded-[36px] border border-border bg-[linear-gradient(180deg,rgba(17,20,25,0.34),rgba(5,6,8,0.92))]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_4%,rgba(255,255,255,0.15),transparent_26%),radial-gradient(circle_at_80%_20%,rgba(230,179,74,0.18),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(8,10,12,0.18)_44%,rgba(2,3,5,0.82)_100%)]" />
                  <Image
                    src={heroVehicle}
                    alt="Premium vehicle showcased by Sayarati"
                    width={1280}
                    height={864}
                    priority
                    quality={75}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="relative z-10 h-auto w-full object-cover saturate-[1.02] contrast-110 drop-shadow-[0_22px_48px_rgba(0,0,0,0.42)]"
                  />
                  <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(180deg,rgba(0,0,0,0.06)_0%,transparent_38%,rgba(0,0,0,0.58)_100%)]" />

                  <div className="absolute right-4 top-4 z-30 rounded-[24px] border border-border/80 bg-card/88 px-4 py-4 backdrop-blur-xl">
                    <div className="text-[11px] font-bold tracking-[0.22em] text-muted uppercase">Garage View</div>
                    <div className="mt-2 text-lg font-bold text-foreground">Executive Dashboard</div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 z-30 grid gap-3 md:grid-cols-3">
                    {[
                      { icon: Clock3, label: "زمن استجابة أسرع", value: "11 min" },
                      { icon: MapPinned, label: "شبكة خدمات مرئية", value: "4 cities" },
                      { icon: ShieldCheck, label: "ثقة وتجربة راقية", value: "Arabic first" },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.label}
                          className="rounded-[24px] border border-border/80 bg-[#111418]/80 px-4 py-4 text-white backdrop-blur-xl"
                        >
                          <div className="flex items-center gap-2 text-primary">
                            <Icon className="h-4 w-4" aria-hidden />
                            <span className="text-[11px] font-bold tracking-[0.2em] uppercase">{item.value}</span>
                          </div>
                          <div className="mt-2 text-sm text-white/78">{item.label}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>

        <section id="services" className="border-t border-border/70 py-20 sm:py-24">
          <div className="container-app">
            <SectionHeader
              eyebrow="Services"
              title="خدمات تغطي دورة ملكية السيارة بالكامل"
              description="كل جزء في سيارتي مصمم ليحوّل المعلومات المبعثرة إلى قرارات محسوبة وتجربة خدمة تبدو أكثر أناقة وانضباطًا."
            />

            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <GlassCard key={service.title} className="group h-full p-6 sm:p-7">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-[22px] border border-primary/20 bg-primary/10 text-primary transition duration-300 group-hover:-translate-y-1 group-hover:scale-105">
                        <Icon className="h-7 w-7" aria-hidden />
                      </div>
                      <span className="rounded-full border border-primary/18 bg-primary/10 px-3 py-1 text-[11px] font-bold tracking-[0.2em] text-primary uppercase">
                        {service.stat}
                      </span>
                    </div>
                    <div className="mt-6 text-xs font-bold tracking-[0.24em] text-muted uppercase">{service.eyebrow}</div>
                    <h3 className="mt-3 text-2xl font-bold text-foreground">{service.title}</h3>
                    <p className="mt-4 text-sm leading-8 text-muted">{service.description}</p>
                  </GlassCard>
                );
              })}
            </div>
          </div>
        </section>

        <section id="timeline" className="border-t border-border/70 py-20 sm:py-24">
          <div className="container-app">
            <SectionHeader
              eyebrow="Ownership Timeline"
              title="رحلة تشغيلية تبدأ قبل العطل ولا تنتهي عند الحجز"
              description="تتابع سيارتي كامل المسار من تجهيز ملف المركبة حتى توثيق ما تم، لتبقى صورة السيارة واضحة في كل قرار قادم."
            />

            <div className="relative mt-16 grid gap-6 lg:grid-cols-4">
              <div className="pointer-events-none absolute right-8 top-8 hidden h-[calc(100%-4rem)] w-px bg-[linear-gradient(180deg,rgba(230,179,74,0.42),transparent)] lg:block" />
              {timeline.map((step) => (
                <GlassCard key={step.phase} className="relative p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-lg font-black text-primary">
                      {step.phase}
                    </div>
                    <div className="text-xl font-bold text-foreground">{step.title}</div>
                  </div>
                  <p className="mt-5 text-sm leading-8 text-muted">{step.description}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="border-t border-border/70 py-20 sm:py-24">
          <div className="container-app">
            <SectionHeader
              eyebrow="Testimonials"
              title="ثقة مبنية على وضوح فعلي في الرحلة اليومية"
              description="الانطباع الفاخر مهم، لكن القيمة الحقيقية تظهر عندما يفهم المستخدم ماذا يجب أن يفعل بسيارته ومتى ولماذا."
            />

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <GlassCard key={testimonial.name} className="h-full p-7">
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
                    <div className="flex items-center gap-1 text-primary">
                      {Array.from({ length: 5 }, (_, index) => (
                        <Star key={`${testimonial.name}-${index}`} className="h-4 w-4 fill-current" aria-hidden />
                      ))}
                    </div>
                  </div>
                  <p className="mt-6 text-sm leading-8 text-muted">&quot;{testimonial.quote}&quot;</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-border/70 py-20 sm:py-24">
          <div className="container-app">
            <SectionHeader
              eyebrow="Contact, FAQ & Coverage"
              title="تواصل أوضح، إجابات أسرع، وخريطة خدمة قابلة للتوسع"
              description="قسم نهائي أكثر ثراءً يجمع التواصل، الأسئلة الشائعة، ومشهدًا بصريًا لنقاط التغطية والخدمة الحالية."
            />

            <div className="mt-14 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
              <div className="grid gap-6">
                <GlassCard className="p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                      <Mail className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <div className="text-xs font-bold tracking-[0.22em] text-muted uppercase">Direct Contact</div>
                      <div className="mt-1 text-2xl font-bold text-foreground">دعنا نرتب تجربتك</div>
                    </div>
                  </div>
                  <div className="mt-6 grid gap-3 text-sm text-muted">
                    <div className="rounded-[22px] border border-border/80 bg-card-2/70 px-4 py-4">
                      <span className="block text-xs font-bold tracking-[0.2em] text-primary uppercase">Email</span>
                      <span className="mt-2 block text-base font-semibold text-foreground">{SITE.email}</span>
                    </div>
                    <div className="rounded-[22px] border border-border/80 bg-card-2/70 px-4 py-4">
                      <span className="block text-xs font-bold tracking-[0.2em] text-primary uppercase">Phone</span>
                      <span className="mt-2 block text-base font-semibold text-foreground">{SITE.phone}</span>
                    </div>
                    <div className="rounded-[22px] border border-border/80 bg-card-2/70 px-4 py-4">
                      <span className="block text-xs font-bold tracking-[0.2em] text-primary uppercase">City</span>
                      <span className="mt-2 block text-base font-semibold text-foreground">{SITE.city}</span>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard className="p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                      <MessageSquareText className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <div className="text-xs font-bold tracking-[0.22em] text-muted uppercase">Ask Anything</div>
                      <div className="mt-1 text-2xl font-bold text-foreground">أرسل رسالتك</div>
                    </div>
                  </div>

                  <form className="mt-6 grid gap-5">
                    <label className="grid gap-2 text-sm text-muted">
                      <span>Name</span>
                      <input type="text" className="input" placeholder="اكتب اسمك" />
                    </label>
                    <label className="grid gap-2 text-sm text-muted">
                      <span>Email</span>
                      <input type="email" className="input" placeholder="name@example.com" />
                    </label>
                    <label className="grid gap-2 text-sm text-muted">
                      <span>Message</span>
                      <textarea className="textarea min-h-36" placeholder="اكتب رسالتك هنا" />
                    </label>
                    <button type="submit" className="btn-primary h-12">
                      إرسال الرسالة
                      <ArrowLeft className="h-4 w-4" aria-hidden />
                    </button>
                  </form>
                </GlassCard>
              </div>

              <div className="grid gap-6">
                <GlassCard className="overflow-hidden p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold tracking-[0.22em] text-muted uppercase">Service Coverage</div>
                      <div className="mt-2 text-2xl font-bold text-foreground">خريطة شبكة الخدمة الحالية</div>
                    </div>
                    <span className="rounded-full border border-primary/18 bg-primary/10 px-3 py-1 text-[11px] font-bold tracking-[0.2em] text-primary uppercase">
                      Expanding 2026
                    </span>
                  </div>

                  <div className="relative mt-6 h-[320px] overflow-hidden rounded-[30px] border border-border bg-[linear-gradient(180deg,rgba(18,21,26,0.84),rgba(7,9,12,0.98))]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_14%,rgba(230,179,74,0.14),transparent_18%),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:auto,64px_64px,64px_64px]" />
                    {mapCities.map((city) => (
                      <div
                        key={city.name}
                        className="absolute flex -translate-y-1/2 items-center gap-3"
                        style={{ top: city.top, right: city.right }}
                      >
                        <span className="inline-flex h-3 w-3 rounded-full bg-primary shadow-[0_0_0_6px_rgba(230,179,74,0.12),0_0_24px_rgba(230,179,74,0.42)]" />
                        <span className="rounded-full border border-primary/20 bg-[#12161b]/88 px-3 py-1 text-xs font-bold tracking-[0.16em] text-white uppercase backdrop-blur-md">
                          {city.name}
                        </span>
                      </div>
                    ))}
                    <div className="absolute bottom-4 left-4 right-4 grid gap-3 md:grid-cols-3">
                      {[
                        "Onboarding workshops",
                        "Premium maintenance journeys",
                        "Arabic-first support flow",
                      ].map((item) => (
                        <div key={item} className="rounded-[22px] border border-border/80 bg-[#111418]/82 px-4 py-4 text-sm text-white/78 backdrop-blur-xl">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </GlassCard>

                <GlassCard className="p-6 sm:p-7">
                  <div className="text-xs font-bold tracking-[0.22em] text-muted uppercase">FAQ</div>
                  <div className="mt-2 text-2xl font-bold text-foreground">أسئلة متكررة قبل الانطلاق</div>
                  <div className="mt-6 grid gap-3">
                    {faqs.map((item) => (
                      <div key={item.question} className="rounded-[24px] border border-border/80 bg-card-2/72 px-5 py-5">
                        <div className="flex items-center gap-3 text-foreground">
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary">
                            <BadgeCheck className="h-4 w-4" aria-hidden />
                          </span>
                          <h3 className="text-base font-bold">{item.question}</h3>
                        </div>
                        <p className="mt-4 text-sm leading-8 text-muted">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20 pt-4 sm:pb-24">
          <div className="container-app">
            <div className="relative overflow-hidden rounded-[40px] border border-border bg-card px-6 py-10 shadow-[0_24px_72px_-46px_var(--shadow-ambient-strong)] backdrop-blur-xl sm:px-10 sm:py-14">
              <div className="absolute left-1/2 top-0 h-44 w-[28rem] -translate-x-1/2 rounded-full bg-primary/14 blur-[72px]" />
              <div className="relative z-10 mx-auto max-w-3xl text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold tracking-[0.2em] text-primary uppercase">
                  Final CTA
                </div>
                <h2 className="mt-6 font-display text-3xl font-bold leading-tight text-foreground sm:text-5xl">
                  ابدأ من الدور المناسب لك واترك الباقي لتجربة صُممت بعناية.
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
                  شاشة الاختيار هي بوابة الرحلة الجديدة: أوضح، أفخم، وأكثر جاهزية لتجربة العميل أو
                  الميكانيكي في 2026.
                </p>
                <div className="mt-8 flex justify-center">
                  <Link href="/choose-role" className="btn-primary h-14 px-8 text-base">
                    Choose Your Role
                    <ArrowLeft className="h-5 w-5" aria-hidden />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-border/70 pb-10 pt-8">
        <div className="container-app flex flex-col items-center justify-between gap-4 text-sm text-muted md:flex-row">
          <div>© 2026 Sayarati</div>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <span>Premium Automotive Platform</span>
            <span>{SITE.city}</span>
            <span>{SITE.phone}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
