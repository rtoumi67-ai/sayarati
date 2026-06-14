import type { HTMLAttributes, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpLeft,
  BadgeCheck,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  Droplets,
  Gauge,
  Package,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";

import { SITE } from "../components/site";

const heroVehicle = "/assets/doblo.jpg";
const logoSrc = "/favicon.ico";

const trustBadges = [
  "سجل صيانة رقمي",
  "توصيات زيوت دقيقة",
  "ميكانيكيون موثوقون",
  "سوق قطع غيار متكامل",
];

const features = [
  {
    title: "سجل الصيانة",
    description: "كل الخدمات والفواتير والتنبيهات محفوظة داخل ملف رقمي واضح وسهل الرجوع إليه.",
    icon: ClipboardList,
  },
  {
    title: "توصيات الزيوت",
    description: "اقتراحات دقيقة حسب العلامة التجارية والمحرك وطبيعة الاستخدام الفعلي.",
    icon: Droplets,
  },
  {
    title: "ملف المركبة الذكي",
    description: "صورة تشغيلية موحدة للمركبة تشمل الحالة الحالية والخدمات القادمة والقطع المناسبة.",
    icon: ShieldCheck,
  },
  {
    title: "تشخيص الأعطال",
    description: "فهم أوضح للأعراض والأعطال قبل الذهاب للورشة مع تنبيهات تساعد على القرار.",
    icon: Gauge,
  },
  {
    title: "حجز الميكانيكيين",
    description: "اختيار الفني المناسب، تحديد الموعد، ومتابعة حالة الخدمة من نفس المنصة.",
    icon: CalendarCheck,
  },
  {
    title: "سوق قطع الغيار",
    description: "اكتشف الزيوت والقطع والخدمات ضمن بطاقات شراء مرتبة ومرئية وواضحة.",
    icon: Package,
  },
  {
    title: "غسل وتلميع",
    description: "خيارات عناية وتنظيف وتلميع ضمن تجربة فاخرة تحافظ على قيمة المركبة ومظهرها.",
    icon: Sparkles,
  },
];

const oilProducts = [
  {
    brand: "Liqui Moly",
    productName: "Top Tec 4200",
    viscosity: "5W30",
    image:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=luxury%20engine%20oil%20bottle%20product%20photography%2C%20premium%20automotive%20saas%20store%2C%20dark%20studio%20background%2C%20gold%20accent%20lighting%2C%20realistic%2C%20high-end%20ecommerce%20shot&image_size=portrait_4_3",
  },
  {
    brand: "Motul",
    productName: "8100 X-clean",
    viscosity: "5W40",
    image:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=premium%20motor%20oil%20container%20for%20performance%20cars%2C%20dark%20glass%20surface%2C%20cinematic%20gold%20rim%20light%2C%20luxury%20automotive%20product%20shot%2C%20realistic&image_size=portrait_4_3",
  },
  {
    brand: "TotalEnergies",
    productName: "Quartz 9000",
    viscosity: "5W30",
    image:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=high-end%20engine%20oil%20bottle%20on%20premium%20dark%20background%2C%20automotive%20luxury%20catalog%20photography%2C%20subtle%20gold%20glow%2C%20realistic%20studio%20lighting&image_size=portrait_4_3",
  },
];

const steps = [
  {
    number: "01",
    title: "أضف سيارتك",
    description: "أنشئ ملف المركبة بإدخال بياناتها الأساسية لتصبح كل التوصيات والخدمات مبنية على واقع سيارتك.",
  },
  {
    number: "02",
    title: "احصل على توصيات وخدمات مناسبة",
    description: "اكتشف الزيوت والقطع والخدمات والميكانيكيين المناسبين في واجهة واحدة مرتبة وواضحة.",
  },
  {
    number: "03",
    title: "تابع الصيانة من مكان واحد",
    description: "راقب تاريخ الخدمات والتنبيهات والحجوزات من لوحة متابعة عربية مصممة بعناية.",
  },
];

const benefits = [
  {
    value: "وفر وقتك",
    title: "توفير الوقت",
    description: "كل ما تحتاجه لسيارتك مجمع في رحلة واحدة بدل التنقل بين تطبيقات وورش متعددة.",
  },
  {
    value: "وضوح أعلى",
    title: "قرارات صيانة أوضح",
    description: "المعلومات الصحيحة تظهر في الوقت المناسب لتعرف ماذا تحتاج سيارتك ولماذا.",
  },
  {
    value: "متابعة دقيقة",
    title: "متابعة دقيقة للمركبة",
    description: "ملف صيانة حي يربط بين الزيوت والخدمات والتشخيص والحجوزات.",
  },
  {
    value: "شبكة موثوقة",
    title: "الوصول إلى خدمات موثوقة",
    description: "ورش وميكانيكيون وخدمات مختارة ضمن تجربة شراء وعناية أكثر احترافية.",
  },
];

const testimonials = [
  {
    name: "أمينة بوبكر",
    role: "مالكة BMW X3",
    quote:
      "الواجهة راقية وسهلة، لكن الأهم أنها فعلاً جعلتني أفهم ما تحتاجه سيارتي قبل ما تتحول الصيانة إلى تكلفة مفاجئة.",
    image:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=cinematic%20portrait%20of%20an%20elegant%20north%20african%20woman%20car%20owner%2C%20premium%20automotive%20brand%20campaign%2C%20dark%20studio%20background%2C%20gold%20accent%20lighting%2C%20realistic&image_size=square_hd",
  },
  {
    name: "حسام بن رابح",
    role: "يعتمد على الصيانة الوقائية",
    quote:
      "أكثر شيء أعجبني هو وضوح رحلة القرار: من الزيت المناسب إلى الحجز والمتابعة، كل شيء منطقي وسريع.",
    image:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=professional%20north%20african%20man%20driver%20portrait%2C%20luxury%20garage%20campaign%2C%20automotive%20technology%20atmosphere%2C%20dark%20premium%20lighting%2C%20realistic&image_size=square_hd",
  },
  {
    name: "سارة قاسمي",
    role: "تدير أكثر من مركبة للعائلة",
    quote:
      "سيارتي منحتني فعلاً منصة واحدة لكل شيء: سجل الصيانة، الزيت، الخدمات، وقطع الغيار بدون فوضى.",
    image:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=realistic%20portrait%20of%20a%20stylish%20arab%20female%20car%20owner%20in%20a%20premium%20automotive%20studio%2C%20graphite%20background%2C%20subtle%20gold%20glow%2C%20luxury%20editorial%20look&image_size=square_hd",
  },
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
      <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-[11px] font-bold tracking-[0.3em] text-primary uppercase">
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
  ...props
}: {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={["card", className, props.className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}

export default function LandingUI() {
  return (
    <div className="dark" dir="rtl">
      <div className="relative overflow-hidden bg-background text-foreground">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(201,168,76,0.18),transparent_18%),radial-gradient(circle_at_82%_10%,rgba(201,168,76,0.12),transparent_20%),linear-gradient(180deg,#020304_0%,#06080b_44%,#050608_100%)]" />
          <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(201,168,76,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(201,168,76,0.05)_1px,transparent_1px)] [background-size:118px_118px]" />
          <div className="absolute left-[8%] top-0 h-72 w-72 rounded-full bg-primary/12 blur-[150px]" />
          <div className="absolute right-[10%] top-[18%] h-72 w-72 rounded-full bg-primary/10 blur-[170px]" />
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
                    <div className="font-display text-xl font-black text-foreground">سيارتي</div>
                    <div className="text-[11px] tracking-[0.34em] text-primary/80 uppercase">
                      Automotive Technology Platform
                    </div>
                  </div>
                </div>

                <div className="hidden items-center gap-3 lg:flex">
                  <Link href="/choose-role" className="btn-primary h-11 px-6 text-sm">
                    ابدأ الآن
                    <ArrowLeft className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </div>
            </GlassCard>
          </div>
        </header>

        <main className="relative z-10">
          <section className="container-app grid min-h-[calc(100svh-88px)] items-center gap-14 pb-20 pt-12 lg:grid-cols-[0.9fr_1.1fr] lg:pb-28">
            <div className="order-2 space-y-8 lg:order-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold tracking-[0.28em] text-primary uppercase">
                <Sparkles className="h-4 w-4" aria-hidden />
                Tesla Simplicity, Porsche Elegance
              </div>

              <div className="space-y-5">
                <h1 className="max-w-3xl font-display text-4xl font-black leading-[1.02] text-foreground sm:text-6xl lg:text-[4.8rem]">
                  قرارات صيانة أفضل تبدأ بمعلومات أوضح.
                </h1>
                <p className="max-w-2xl text-base leading-8 text-muted sm:text-xl sm:leading-10">
                  من سجل الصيانة وتوصيات الزيوت المناسبة إلى تشخيص الأعطال وحجز الخدمات، تمنحك
                  سيارتي رؤية أوضح وتحكماً أكبر في كل ما يخص سيارتك، لتتخذ قرارات صيانة أكثر
                  ذكاءً وتجنب التكاليف غير المتوقعة.
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

              <div className="flex flex-wrap gap-3">
                {trustBadges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-2 rounded-full border border-primary/16 bg-card/72 px-4 py-2 text-sm text-foreground/88 backdrop-blur-xl"
                  >
                    <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_14px_rgba(201,168,76,0.55)]" />
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="order-1 mx-auto w-full max-w-[860px] lg:order-2">
              <div className="relative">
                <div className="absolute inset-x-[18%] top-16 h-40 rounded-full bg-primary/22 blur-[78px]" />
                <div className="absolute -left-2 top-14 hidden w-52 rounded-[30px] border border-primary/20 bg-black/45 p-5 backdrop-blur-2xl lg:block">
                  <div className="text-[11px] font-bold tracking-[0.24em] text-primary uppercase">
                    Premium Maintenance OS
                  </div>
                  <div className="mt-3 text-2xl font-black text-white">+42%</div>
                  <div className="mt-2 text-sm leading-6 text-white/72">
                    انتقال أسرع من فهم الحالة إلى اتخاذ قرار الخدمة الصحيح.
                  </div>
                </div>
                <div className="absolute -right-3 bottom-12 hidden w-56 rounded-[30px] border border-primary/20 bg-black/52 p-5 backdrop-blur-2xl lg:block">
                  <div className="flex items-center gap-2 text-primary">
                    <CheckCircle2 className="h-4 w-4" aria-hidden />
                    <span className="text-[11px] font-bold tracking-[0.24em] uppercase">
                      Luxury Automotive UX
                    </span>
                  </div>
                  <div className="mt-3 text-lg font-bold text-white">
                    صورة أوضح للمركبة. تكلفة أقل للمفاجآت.
                  </div>
                </div>

                <GlassCard className="overflow-hidden p-4 sm:p-6">
                  <div className="relative overflow-hidden rounded-[40px] border border-white/8 bg-[linear-gradient(180deg,rgba(14,16,20,0.55),rgba(4,5,7,0.96))] px-4 pb-8 pt-8 sm:px-8">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_0%,rgba(255,255,255,0.16),transparent_24%),radial-gradient(circle_at_84%_16%,rgba(201,168,76,0.22),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(0,0,0,0.75))]" />
                    <div className="absolute inset-x-[15%] top-[14%] h-32 rounded-full bg-white/8 blur-[70px]" />

                    <div className="relative z-10">
                      <div className="mx-auto w-full max-w-[720px] [transform:perspective(1800px)_rotateY(-14deg)_rotateX(7deg)_translateY(-2px)] drop-shadow-[0_50px_70px_rgba(0,0,0,0.55)] transition duration-500 hover:[transform:perspective(1800px)_rotateY(-10deg)_rotateX(5deg)_translateY(-6px)]">
                        <div className="relative">
                          <div className="absolute inset-x-[18%] bottom-1 h-10 rounded-full bg-black/70 blur-[34px]" />
                          <Image
                            src={heroVehicle}
                            alt="المركبة الرئيسية في واجهة سيارتي"
                            width={1440}
                            height={960}
                            priority
                            quality={92}
                            sizes="(max-width: 1024px) 100vw, 55vw"
                            className="relative z-10 h-auto w-full object-contain saturate-[1.08] contrast-125 brightness-[1.04]"
                          />
                          <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_24%,rgba(0,0,0,0.18)_58%,rgba(0,0,0,0.44)_100%)]" />
                          <div className="pointer-events-none absolute inset-x-[18%] top-[12%] z-20 h-16 rounded-full bg-white/14 blur-[28px]" />
                        </div>
                      </div>

                      <div className="mt-8 grid gap-3 md:grid-cols-3">
                        {[
                          { value: "Digital Service Ledger", label: "سجل خدمات موثق" },
                          { value: "Oil Intelligence", label: "مطابقة دقيقة للزيوت" },
                          { value: "Trusted Mechanics", label: "شبكة خدمات موثوقة" },
                        ].map((item) => (
                          <div
                            key={item.label}
                            className="rounded-[24px] border border-white/8 bg-black/52 px-4 py-4 text-white backdrop-blur-2xl"
                          >
                            <div className="text-[11px] font-bold tracking-[0.22em] text-primary uppercase">
                              {item.value}
                            </div>
                            <div className="mt-2 text-sm text-white/74">{item.label}</div>
                          </div>
                        ))}
                      </div>
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
                description="واجهة عربية فائقة الوضوح تجمع البيانات والخدمات والحجوزات والتوصيات داخل تجربة واحدة راقية ومتماسكة."
              />

              <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {features.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <GlassCard
                      key={feature.title}
                      className="group h-full p-6 transition duration-300 hover:-translate-y-2 hover:border-primary/30"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-[22px] border border-primary/20 bg-primary/10 text-primary transition duration-300 group-hover:scale-105">
                        <Icon className="h-7 w-7" aria-hidden />
                      </div>
                      <h3 className="mt-6 text-2xl font-black text-foreground">{feature.title}</h3>
                      <p className="mt-4 text-sm leading-8 text-muted">{feature.description}</p>
                    </GlassCard>
                  );
                })}
              </div>
            </div>
          </section>

          <section id="oils" className="border-t border-border/70 py-20 sm:py-24">
            <div className="container-app">
              <SectionHeader
                eyebrow="Recommended Oil"
                title="الزيت المناسب لسيارتك"
                description="بطاقات منتجات مرئية مصممة لتجعل اختيار الزيت المناسب أكثر وضوحاً وثقة بدون توصيات نصية جافة."
              />

              <div className="mt-14 grid gap-6 lg:grid-cols-3">
                {oilProducts.map((oil) => (
                  <GlassCard key={`${oil.brand}-${oil.productName}`} className="overflow-hidden">
                    <div className="relative h-72">
                      <Image
                        src={oil.image}
                        alt={oil.productName}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.78)_100%)]" />
                      <div className="absolute right-4 top-4 rounded-full border border-primary/20 bg-black/45 px-3 py-1 text-xs font-bold tracking-[0.18em] text-primary uppercase backdrop-blur-xl">
                        {oil.viscosity}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="text-sm font-semibold text-primary">{oil.brand}</div>
                      <div className="mt-2 text-2xl font-black text-foreground">{oil.productName}</div>
                      <div className="mt-3 text-sm leading-7 text-muted">
                        تركيبة مناسبة للمحركات الحديثة مع أداء ثابت وحماية أعلى في ظروف القيادة اليومية.
                      </div>
                      <Link href="/customer/store" className="btn-primary mt-6 w-full">
                        عرض في المتجر
                        <ArrowLeft className="h-4 w-4" aria-hidden />
                      </Link>
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
                description="رحلة حديثة وسلسة تبدأ من إضافة المركبة وتنتهي بمتابعة الصيانة والخدمات من مكان واحد."
              />

              <div className="relative mt-16 grid gap-6 lg:grid-cols-3">
                <div className="pointer-events-none absolute right-[16.7%] left-[16.7%] top-12 hidden h-px bg-[linear-gradient(90deg,rgba(201,168,76,0.02),rgba(201,168,76,0.5),rgba(201,168,76,0.02))] lg:block" />
                {steps.map((step) => (
                  <GlassCard key={step.number} className="relative p-6 sm:p-7">
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-lg font-black text-primary">
                        {step.number}
                      </div>
                      <div className="text-2xl font-black text-foreground">{step.title}</div>
                    </div>
                    <p className="mt-6 text-sm leading-8 text-muted">{step.description}</p>
                  </GlassCard>
                ))}
              </div>
            </div>
          </section>

          <section id="benefits" className="border-t border-border/70 py-20 sm:py-24">
            <div className="container-app">
              <SectionHeader
                eyebrow="Benefits"
                title="لماذا يستخدم أصحاب السيارات سيارتي؟"
                description="لأن المنصة لا تكتفي بجمع المعلومات، بل ترتبها وتحوّلها إلى قرارات تشغيلية أوضح وأكثر هدوءاً."
              />

              <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {benefits.map((benefit) => (
                  <GlassCard key={benefit.title} className="h-full p-6">
                    <div className="text-sm font-bold tracking-[0.24em] text-primary uppercase">
                      {benefit.value}
                    </div>
                    <h3 className="mt-4 text-2xl font-black text-foreground">{benefit.title}</h3>
                    <p className="mt-4 text-sm leading-8 text-muted">{benefit.description}</p>
                  </GlassCard>
                ))}
              </div>
            </div>
          </section>

          <section id="testimonials" className="border-t border-border/70 py-20 sm:py-24">
            <div className="container-app">
              <SectionHeader
                eyebrow="Testimonials"
                title="أصحاب سيارات وجدوا تجربة أوضح وأكثر أناقة"
                description="ثقة المستخدم تبدأ عندما تبدو الواجهة راقية، لكنها تكتمل عندما تتحول القرارات اليومية إلى شيء مفهوم وسلس."
              />

              <div className="mt-14 grid gap-6 lg:grid-cols-3">
                {testimonials.map((testimonial) => (
                  <GlassCard key={testimonial.name} className="h-full p-7">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={88}
                          height={88}
                          className="h-16 w-16 rounded-2xl object-cover ring-1 ring-primary/20"
                        />
                        <div>
                          <div className="text-lg font-black text-foreground">{testimonial.name}</div>
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

          <section className="border-t border-border/70 py-20 sm:py-24">
            <div className="container-app">
              <GlassCard className="overflow-hidden px-6 py-10 sm:px-10 sm:py-14">
                <div className="absolute inset-x-[20%] top-0 h-44 rounded-full bg-primary/16 blur-[80px]" />
                <div className="relative z-10 mx-auto max-w-3xl text-center">
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold tracking-[0.24em] text-primary uppercase">
                    <BadgeCheck className="h-4 w-4" aria-hidden />
                    Final CTA
                  </div>
                  <h2 className="mt-6 font-display text-3xl font-black leading-tight text-foreground sm:text-5xl">
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

        <footer id="about" className="relative z-10 border-t border-border/70 pb-12 pt-10">
          <div className="container-app">
            <GlassCard className="p-6 sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr_0.8fr]">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                      <Image src={logoSrc} alt="Sayarati" width={24} height={24} className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-lg font-black text-foreground">{SITE.nameAr}</div>
                      <div className="text-[11px] tracking-[0.32em] text-primary/80 uppercase">
                        About
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 max-w-xl text-sm leading-8 text-muted">
                    سيارتي منصة تقنية سيارات فاخرة تساعدك على متابعة الصيانة، فهم الاحتياجات
                    الصحيحة للمركبة، والوصول إلى خدمات وقطع غيار موثوقة ضمن تجربة واحدة واضحة.
                  </p>
                </div>

                <div id="contact">
                  <div className="text-[11px] font-bold tracking-[0.28em] text-primary uppercase">
                    Contact
                  </div>
                  <div className="mt-4 grid gap-3 text-sm text-muted">
                    <a href={`mailto:${SITE.email}`} className="transition hover:text-foreground">
                      {SITE.email}
                    </a>
                    <a href={`tel:${SITE.phone}`} className="transition hover:text-foreground">
                      {SITE.phone}
                    </a>
                    <div>{SITE.city}</div>
                  </div>
                </div>

                <div className="grid gap-3 text-sm">
                  <Link href="/privacy" className="transition hover:text-foreground">
                    Privacy Policy
                  </Link>
                  <Link href="/terms" className="transition hover:text-foreground">
                    Terms of Service
                  </Link>
                  <Link href="/choose-role" className="transition hover:text-foreground">
                    ابدأ الآن
                  </Link>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 border-t border-border/70 pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
                <div>© 2026 {SITE.nameEn}</div>
                <div>Premium automotive SaaS experience in Arabic RTL.</div>
              </div>
            </GlassCard>
          </div>
        </footer>
      </div>
    </div>
  );
}
