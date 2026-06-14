"use client";

import { ArrowLeft, Cog, Droplets, Settings2, ShoppingBag, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import RequireAuth from "../../components/RequireAuth";
import { getCustomerCar, type CustomerCar } from "../../components/auth";
import { formatDaPrice, getAllOilStoreProducts, getRecommendedOilProducts } from "./catalog";

const STORE_UNLOCK_KEY = "sayarati.customer.store-visited";
const OIL_PAGE_SIZE = 3;
const CATALOG_SECTION_PAGE_SIZE = 2;

type VisualCatalogItem = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  price: string;
};

const spareParts: VisualCatalogItem[] = [
  {
    id: "filters-kit",
    title: "طقم فلاتر احترافي",
    subtitle: "فلتر زيت + فلتر هواء + فلتر مقصورة",
    image:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Premium%20automotive%20spare%20parts%20kit%20with%20oil%20filter%2C%20air%20filter%20and%20cabin%20filter%2C%20luxury%20ecommerce%20product%20photography%2C%20dark%20reflective%20surface%2C%20studio%20lighting%2C%20high%20detail&image_size=square",
    price: "7 900 DA",
  },
  {
    id: "brake-kit",
    title: "طقم فرامل أمامية",
    subtitle: "مناسب للصيانة الوقائية والقيادة اليومية",
    image:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Premium%20front%20brake%20service%20kit%20for%20a%20modern%20car%2C%20luxury%20ecommerce%20product%20photo%2C%20dark%20background%2C%20gold%20accent%20lighting%2C%20studio%20detail&image_size=square",
    price: "12 400 DA",
  },
  {
    id: "battery-pack",
    title: "بطارية أداء عالي",
    subtitle: "تشغيل ثابت واعتمادية أعلى في جميع الظروف",
    image:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Premium%20car%20battery%20product%20shot%2C%20luxury%20automotive%20ecommerce%2C%20dark%20studio%20background%2C%20elegant%20gold%20accent%20lighting%2C%20high%20detail&image_size=square",
    price: "18 600 DA",
  },
];

const serviceCards: VisualCatalogItem[] = [
  {
    id: "oil-service",
    title: "خدمة تغيير زيت",
    subtitle: "تنفيذ سريع مع فحص أساسي للمحرك والسوائل",
    image:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Premium%20automotive%20oil%20change%20service%20scene%20inside%20a%20luxury%20garage%2C%20dark%20cinematic%20lighting%2C%20professional%20mechanic%2C%20clean%20tools%2C%20high%20detail&image_size=square",
    price: "ابتداءً من 3 500 DA",
  },
  {
    id: "diagnostics-service",
    title: "تشخيص إلكتروني",
    subtitle: "فحص شامل للأعطال والتنبيهات ومؤشرات الأداء",
    image:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Premium%20car%20diagnostics%20service%20with%20digital%20scanner%20inside%20a%20luxury%20garage%2C%20dark%20tech%20aesthetic%2C%20clean%20cinematic%20lighting%2C%20high%20detail&image_size=square",
    price: "ابتداءً من 4 800 DA",
  },
  {
    id: "maintenance-service",
    title: "صيانة دورية",
    subtitle: "باقة متابعة دورية للحفاظ على جاهزية المركبة",
    image:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Premium%20scheduled%20car%20maintenance%20service%20scene%2C%20luxury%20garage%20interior%2C%20sleek%20tools%2C%20dark%20theme%2C%20cinematic%20lighting%2C%20high%20detail&image_size=square",
    price: "ابتداءً من 6 200 DA",
  },
];

function SectionHeader({
  icon: Icon,
  label,
  title,
  description,
}: {
  icon: typeof Droplets;
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-primary">
          <Icon className="h-4 w-4" aria-hidden />
          {label}
        </div>
        <h2 className="mt-5 text-3xl font-semibold text-foreground">{title}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-8 text-muted">{description}</p>
      </div>
    </div>
  );
}

function VisualCatalogCard({ item }: { item: VisualCatalogItem }) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-border bg-card/82 shadow-[0_16px_48px_-34px_var(--shadow-ambient-strong)] backdrop-blur-lg">
      <div className="border-b border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]">
        <div className="mx-auto flex h-56 items-center justify-center">
          <Image
            src={item.image}
            alt={item.title}
            width={320}
            height={320}
            quality={68}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="h-full w-auto object-contain drop-shadow-[0_16px_40px_rgba(0,0,0,0.28)]"
          />
        </div>
      </div>
      <div className="space-y-4 p-5">
        <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
        <p className="text-sm leading-8 text-muted">{item.subtitle}</p>
        <div className="text-lg font-semibold text-foreground">{item.price}</div>
      </div>
    </article>
  );
}

export default function CustomerStoreUI() {
  const [car] = useState<CustomerCar | null>(() => getCustomerCar());
  const oilProducts = useMemo(() => getAllOilStoreProducts(), []);
  const [oilPage, setOilPage] = useState(0);
  const [visibleSections, setVisibleSections] = useState(1);
  const [sparePartsPage, setSparePartsPage] = useState(1);
  const [serviceCardsPage, setServiceCardsPage] = useState(1);

  useEffect(() => {
    window.localStorage.setItem(STORE_UNLOCK_KEY, "1");
  }, []);

  const recommendedOils = useMemo(() => {
    if (!car) return oilProducts.slice(0, 3);
    return getRecommendedOilProducts(car, 3);
  }, [car, oilProducts]);

  const recommendedOilIds = useMemo(
    () => new Set(recommendedOils.map((product) => product.id)),
    [recommendedOils],
  );

  const prioritizedOilProducts = useMemo(() => {
    const recommended = oilProducts.filter((product) => recommendedOilIds.has(product.id));
    const rest = oilProducts.filter((product) => !recommendedOilIds.has(product.id));
    return [...recommended, ...rest];
  }, [oilProducts, recommendedOilIds]);

  const oilPageCount = Math.max(1, Math.ceil(prioritizedOilProducts.length / OIL_PAGE_SIZE));
  const currentOilPage = Math.min(oilPage, oilPageCount - 1);
  const visibleOilProducts = useMemo(() => {
    const start = currentOilPage * OIL_PAGE_SIZE;
    return prioritizedOilProducts.slice(start, start + OIL_PAGE_SIZE);
  }, [currentOilPage, prioritizedOilProducts]);
  const visibleSpareParts = useMemo(
    () => spareParts.slice(0, sparePartsPage * CATALOG_SECTION_PAGE_SIZE),
    [sparePartsPage],
  );
  const visibleServiceCards = useMemo(
    () => serviceCards.slice(0, serviceCardsPage * CATALOG_SECTION_PAGE_SIZE),
    [serviceCardsPage],
  );

  return (
    <RequireAuth role="customer">
      <div className="relative min-h-[100svh] overflow-hidden py-10 sm:py-14" dir="rtl">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.14),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(248,250,252,0.96)_44%,rgba(255,255,255,0.98)_100%)] dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_22%),linear-gradient(180deg,#0b0f19_0%,#111827_44%,#0a0a0f_100%)]" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(37,99,235,0.04)_1px,transparent_1px),linear-gradient(180deg,rgba(37,99,235,0.03)_1px,transparent_1px)] bg-[size:88px_88px] opacity-30 dark:bg-[linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.02)_1px,transparent_1px)] dark:opacity-20" />
        <div className="pointer-events-none absolute left-[8%] top-20 -z-10 h-72 w-72 rounded-full bg-primary/14 blur-[88px]" />

        <div className="container-app max-w-7xl">
          <section className="rounded-[40px] border border-border bg-card/82 p-6 shadow-[0_36px_120px_-68px_var(--shadow-ambient-strong)] backdrop-blur-2xl sm:p-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold tracking-[0.2em] text-primary">
                  <ShoppingBag className="h-4 w-4" aria-hidden />
                  STORE ACCESS
                </div>
                <h1 className="mt-6 font-display text-4xl font-semibold text-foreground sm:text-6xl">
                  متجر سيارتي
                </h1>
                <p className="mt-4 max-w-3xl text-sm leading-8 text-muted">
                  المتجر يعرض المنتجات والخدمات كبطاقات مرئية فقط: زيوت محركات، قطع غيار، وخدمات
                  قابلة للاختيار ضمن واجهة عربية بطابع SaaS فاخر ومتناسق.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/customer" className="btn-secondary h-12 px-6">
                  العودة لتدفّق العميل
                </Link>
                <Link href="/customer#mechanics" className="btn-primary h-12 px-6">
                  الانتقال إلى الميكانيكيين
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>

            {car ? (
              <div className="mt-6 rounded-[24px] border border-border bg-card-2/80 p-4 text-sm text-muted">
                السيارة الحالية:{" "}
                <span className="font-semibold text-foreground">
                  {car.make} {car.model}
                </span>
                {" - "}
                {car.engineType === "diesel"
                  ? "ديزل"
                  : car.engineType === "hybrid"
                    ? "هايبرد"
                    : car.engineType === "electric"
                      ? "كهربائي"
                      : "بنزين"}
              </div>
            ) : null}
          </section>

          <section
            className="mt-8 rounded-[34px] border border-border bg-card/82 p-6 shadow-[0_24px_72px_-48px_var(--shadow-ambient-strong)] backdrop-blur-xl sm:p-8"
            style={{ contentVisibility: "auto", containIntrinsicSize: "1200px" }}
          >
            <SectionHeader
              icon={Droplets}
              label="ENGINE OILS"
              title="زيوت المحركات"
              description="منتجات مرئية موصى بها لسيارتك الحالية مع العلامة، اسم المنتج، اللزوجة، والسعر."
            />

            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {visibleOilProducts.map((product) => (
                <article
                  key={product.id}
                  id={product.id}
                  className="overflow-hidden rounded-[28px] border border-border bg-card/82 shadow-[0_22px_70px_-44px_var(--shadow-ambient-strong)] backdrop-blur-xl"
                >
                  <div className="border-b border-border/70 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.16),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5 dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]">
                    <div className="mx-auto flex h-56 items-center justify-center">
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={320}
                        height={320}
                        quality={68}
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="h-full w-auto object-contain drop-shadow-[0_16px_40px_rgba(0,0,0,0.28)]"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 p-5">
                    {recommendedOilIds.has(product.id) ? (
                      <div className="w-fit rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        موصى به لسيارتك
                      </div>
                    ) : null}
                    <div className="text-xs uppercase tracking-[0.18em] text-primary">{product.brand}</div>
                    <h3 className="text-xl font-semibold leading-tight text-foreground">{product.title}</h3>
                    <div className="rounded-[18px] border border-border bg-card-2/80 px-4 py-3 text-sm text-muted">
                      اللزوجة: <span className="font-semibold text-foreground">{product.viscosity}</span>
                    </div>
                    <div className="text-lg font-semibold text-foreground">{formatDaPrice(product.priceDa)}</div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-muted">
                الصفحة {currentOilPage + 1} من {oilPageCount}
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  className="btn-secondary h-11 px-5 disabled:opacity-50"
                  disabled={currentOilPage === 0}
                  onClick={() => setOilPage((page) => Math.max(0, page - 1))}
                >
                  السابق
                </button>
                <button
                  type="button"
                  className="btn-secondary h-11 px-5 disabled:opacity-50"
                  disabled={currentOilPage >= oilPageCount - 1}
                  onClick={() => setOilPage((page) => Math.min(oilPageCount - 1, page + 1))}
                >
                  التالي
                </button>
              </div>
            </div>
          </section>

          {visibleSections >= 2 ? (
          <section
            className="mt-8 rounded-[34px] border border-border bg-card/78 p-6 shadow-[0_24px_72px_-48px_var(--shadow-ambient-strong)] backdrop-blur-xl sm:p-8"
            style={{ contentVisibility: "auto", containIntrinsicSize: "1000px" }}
          >
            <SectionHeader
              icon={Settings2}
              label="SPARE PARTS"
              title="قطع الغيار"
              description="بطاقات قطع غيار مختارة بعرض بصري نظيف لتسهيل الوصول إلى ما تحتاجه المركبة."
            />

            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {visibleSpareParts.map((item) => (
                <VisualCatalogCard key={item.id} item={item} />
              ))}
            </div>

            {visibleSpareParts.length < spareParts.length ? (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  className="btn-secondary h-11 px-5"
                  onClick={() => setSparePartsPage((page) => page + 1)}
                >
                  تحميل المزيد من قطع الغيار
                </button>
              </div>
            ) : null}
          </section>
          ) : null}

          {visibleSections >= 3 ? (
          <section
            className="mt-8 rounded-[34px] border border-border bg-card/82 p-6 shadow-[0_24px_72px_-48px_var(--shadow-ambient-strong)] backdrop-blur-xl sm:p-8"
            style={{ contentVisibility: "auto", containIntrinsicSize: "1000px" }}
          >
            <SectionHeader
              icon={Sparkles}
              label="SERVICES"
              title="الخدمات"
              description="خدمات صيانة وعناية وتشخيص على هيئة بطاقات قابلة للاستكشاف بصريًا."
            />

            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {visibleServiceCards.map((item) => (
                <VisualCatalogCard key={item.id} item={item} />
              ))}
            </div>

            {visibleServiceCards.length < serviceCards.length ? (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  className="btn-secondary h-11 px-5"
                  onClick={() => setServiceCardsPage((page) => page + 1)}
                >
                  تحميل المزيد من الخدمات
                </button>
              </div>
            ) : null}
          </section>
          ) : null}

          {visibleSections < 3 ? (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                className="btn-secondary h-12 px-6"
                onClick={() => setVisibleSections((current) => Math.min(3, current + 1))}
              >
                تحميل المزيد من أقسام المتجر
              </button>
            </div>
          ) : null}

          <section className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { icon: Droplets, label: "منتجات زيوت مرئية" },
              { icon: Cog, label: "قطع غيار مختارة" },
              { icon: ShoppingBag, label: "خدمات قابلة للحجز" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="rounded-[24px] border border-border bg-card/78 p-5 text-muted shadow-[0_18px_50px_-36px_var(--shadow-ambient-strong)] backdrop-blur-xl"
                >
                  <Icon className="h-5 w-5 text-primary" aria-hidden />
                  <div className="mt-4 text-sm font-semibold text-foreground">{item.label}</div>
                </div>
              );
            })}
          </section>
        </div>
      </div>
    </RequireAuth>
  );
}
