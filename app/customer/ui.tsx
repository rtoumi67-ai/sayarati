"use client";

import {
  ArrowLeft,
  CalendarCheck,
  CarFront,
  CheckCircle2,
  Droplets,
  Gauge,
  MapPin,
  ScanSearch,
  ShieldCheck,
  ShoppingBag,
  Star,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";

import {
  createServiceRequest,
  getCustomerCar,
  setCustomerCar,
  type CustomerCar,
} from "../components/auth";
import RequireAuth from "../components/RequireAuth";
import { CAR_CATALOG, DEFAULT_MAKE } from "./onboarding/car/catalog";
import { getAllOilStoreProducts } from "./store/catalog";

const STORE_UNLOCK_KEY = "sayarati.customer.store-visited";

const engineOptions: Array<{ value: NonNullable<CustomerCar["engineType"]>; label: string }> = [
  { value: "petrol", label: "بنزين" },
  { value: "diesel", label: "ديزل" },
  { value: "hybrid", label: "هايبرد" },
  { value: "electric", label: "كهربائي" },
];

const mechanicOptions = [
  {
    id: "hydra-premium",
    name: "Hydra Premium Garage",
    location: "الجزائر - حيدرة",
    rating: 4.9,
    services: ["تغيير زيت", "تشخيص أعطال", "صيانة دورية"],
  },
  {
    id: "oran-vidange",
    name: "Vidange Center Oran",
    location: "وهران - المدينة الجديدة",
    rating: 4.8,
    services: ["تغيير زيت", "فلترة", "صيانة سريعة"],
  },
  {
    id: "constantine-tech",
    name: "Constantine Auto Tech",
    location: "قسنطينة - علي منجلي",
    rating: 4.7,
    services: ["تشخيص إلكتروني", "صيانة", "فحص شامل"],
  },
];

const storePreviewCards = [
  {
    id: "engine-oils",
    category: "زيوت المحركات",
    title: "مجموعة زيوت Premium",
    subtitle: "بطاقات زيت فاخرة مع لزوجة واضحة وتوصيات مرتبطة بمركبتك.",
    image:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Luxury%20automotive%20engine%20oil%20product%20display%20for%20a%20premium%20SaaS%20store%2C%20dark%20studio%20background%2C%20gold%20accent%20lighting%2C%20multiple%20oil%20containers%2C%20high-end%20ecommerce%20style&image_size=square",
  },
  {
    id: "spare-parts",
    category: "قطع الغيار",
    title: "قطع غيار مختارة",
    subtitle: "فلاتر، فرامل، وبطاريات مع عرض نظيف وسهل المقارنة.",
    image:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Premium%20automotive%20spare%20parts%20arrangement%20for%20ecommerce%2C%20filters%20brake%20pads%20and%20battery%20on%20dark%20reflective%20surface%2C%20gold%20accent%20lighting%2C%20high%20detail&image_size=square",
  },
  {
    id: "services",
    category: "الخدمات",
    title: "خدمات ميكانيكية مرئية",
    subtitle: "تغيير زيت، تشخيص، وصيانة ضمن بطاقات بخبرة Garage OS فاخرة.",
    image:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Premium%20car%20service%20cards%20visual%20concept%2C%20luxury%20garage%20interior%2C%20mechanic%20tools%2C%20dark%20theme%20with%20gold%20accents%2C%20cinematic%20lighting%2C%20high%20detail&image_size=square",
  },
];

const brandVehicleTypeMap: Record<string, CustomerCar["type"]> = {
  BMW: "sedan",
  Audi: "sedan",
  "Mercedes-Benz": "sedan",
  Toyota: "sedan",
  Hyundai: "sedan",
  Fiat: "van",
};

function inferVehicleType(make: string, model: string): CustomerCar["type"] {
  if (brandVehicleTypeMap[make]) return brandVehicleTypeMap[make];
  const normalizedModel = model.toLowerCase();
  if (normalizedModel.includes("x") || normalizedModel.includes("q") || normalizedModel.includes("gl")) {
    return "suv";
  }
  if (normalizedModel.includes("doblo") || normalizedModel.includes("van")) {
    return "van";
  }
  return "sedan";
}

export default function CustomerDashboard() {
  const router = useRouter();
  const oilCatalog = useMemo(() => getAllOilStoreProducts(), []);
  const [savedVehicle, setSavedVehicle] = useState<CustomerCar | null>(() => getCustomerCar());
  const [brand, setBrand] = useState(() => savedVehicle?.make ?? DEFAULT_MAKE);
  const [model, setModel] = useState(() => savedVehicle?.model ?? CAR_CATALOG[DEFAULT_MAKE][0] ?? "");
  const [engineType, setEngineType] = useState<NonNullable<CustomerCar["engineType"]>>(
    () => savedVehicle?.engineType ?? "petrol",
  );
  const [selectedOilId, setSelectedOilId] = useState<string | null>(null);
  const [storeUnlocked, setStoreUnlocked] = useState(
    () => typeof window !== "undefined" && window.localStorage.getItem(STORE_UNLOCK_KEY) === "1",
  );
  const [bookingMessage, setBookingMessage] = useState<string | null>(null);

  const brands = useMemo(() => Object.keys(CAR_CATALOG), []);
  const models = useMemo(() => CAR_CATALOG[brand] ?? [], [brand]);
  const activeModel = models.includes(model) ? model : (models[0] ?? "");

  const recommendedOils = useMemo(() => {
    const premiumBrands = new Set(["BMW", "Audi", "Mercedes-Benz"]);
    const efficientBrands = new Set(["Toyota", "Hyundai"]);
    const desiredViscosities = new Set<string>();

    if (engineType === "diesel") {
      desiredViscosities.add("5W-40");
    }

    if (premiumBrands.has(brand)) {
      desiredViscosities.add("5W-30");
      desiredViscosities.add("5W-40");
    }

    if (efficientBrands.has(brand)) {
      desiredViscosities.add("5W-30");
    }

    if (!desiredViscosities.size) {
      desiredViscosities.add(engineType === "diesel" ? "5W-40" : "5W-30");
    }

    const filtered = oilCatalog.filter((product) => desiredViscosities.has(product.viscosity.toUpperCase()));
    return (filtered.length ? filtered : oilCatalog).slice(0, 3);
  }, [brand, engineType, oilCatalog]);

  const selectedOil = useMemo(
    () => recommendedOils.find((oil) => oil.id === selectedOilId) ?? recommendedOils[0] ?? null,
    [recommendedOils, selectedOilId],
  );

  const canShowMechanics = Boolean(selectedOilId) || storeUnlocked;
  const selectedEngineLabel = engineOptions.find((item) => item.value === engineType)?.label ?? "بنزين";

  function handleVehicleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const vehicle: CustomerCar = {
      type: inferVehicleType(brand, activeModel),
      make: brand,
      model: activeModel,
      year: String(new Date().getFullYear()),
      km: 0,
      engineType,
    };

    setCustomerCar(vehicle);
    setSavedVehicle(vehicle);
    setSelectedOilId(recommendedOils[0]?.id ?? null);
    setBookingMessage(null);
  }

  function openStore(productId?: string) {
    setStoreUnlocked(true);
    window.localStorage.setItem(STORE_UNLOCK_KEY, "1");
    router.push(productId ? `/customer/store#${productId}` : "/customer/store");
  }

  function bookMechanic(mechanic: (typeof mechanicOptions)[number]) {
    const activeVehicle = savedVehicle ?? {
      type: inferVehicleType(brand, activeModel),
      make: brand,
      model: activeModel,
      year: String(new Date().getFullYear()),
      km: 0,
      engineType,
    };

    const requestedService = selectedOil
      ? `تغيير زيت ${selectedOil.viscosity}`
      : "صيانة دورية وفحص مبدئي";

    createServiceRequest({
      clientName: "عميل سيارتي",
      carType: `${activeVehicle.make} ${activeVehicle.model}`,
      carLabel: `${activeVehicle.make} ${activeVehicle.model} - ${engineOptions.find((item) => item.value === activeVehicle.engineType)?.label ?? "بنزين"}`,
      requestedService,
      location: mechanic.location,
      mechanicName: mechanic.name,
      notes: selectedOil
        ? `تم اختيار زيت ${selectedOil.title} قبل الحجز.`
        : "تم إنشاء الطلب من تدفق العميل داخل المنصة.",
      source: selectedOil ? "oil" : "maintenance",
    });

    setBookingMessage(`تم إرسال طلبك إلى ${mechanic.name} بنجاح.`);
  }

  return (
    <RequireAuth role="customer">
      <div className="relative min-h-[100svh] overflow-hidden py-10 sm:py-14" dir="rtl">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.16),transparent_22%),radial-gradient(circle_at_85%_20%,rgba(96,165,250,0.12),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(248,250,252,0.96)_44%,rgba(255,255,255,0.98)_100%)] dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_22%),radial-gradient(circle_at_85%_20%,rgba(96,165,250,0.12),transparent_26%),linear-gradient(180deg,#0b0f19_0%,#111827_44%,#0a0a0f_100%)]" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(37,99,235,0.04)_1px,transparent_1px),linear-gradient(180deg,rgba(37,99,235,0.03)_1px,transparent_1px)] bg-[size:88px_88px] opacity-30 dark:bg-[linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.02)_1px,transparent_1px)] dark:opacity-20" />
        <div className="pointer-events-none absolute right-[10%] top-16 -z-10 h-72 w-72 rounded-full bg-primary/16 blur-[140px]" />
        <div className="pointer-events-none absolute left-[8%] top-1/3 -z-10 h-80 w-80 rounded-full bg-sky-500/10 blur-[170px]" />

        <div className="container-app max-w-7xl">
          <section className="overflow-hidden rounded-[40px] border border-border bg-card/82 p-6 shadow-[0_36px_120px_-68px_var(--shadow-ambient-strong)] backdrop-blur-2xl sm:p-10">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold tracking-[0.2em] text-primary">
                  <ShieldCheck className="h-4 w-4" aria-hidden />
                  CLIENT FLOW
                </div>
                <h1 className="mt-6 font-display text-4xl font-semibold text-foreground sm:text-6xl">
                  مسار مالك السيارة من المركبة إلى الحجز
                </h1>
                <p className="mt-5 max-w-2xl text-sm leading-8 text-muted sm:text-base">
                  واجهة عربية RTL بطابع سيارات فاخر: اختر مركبتك، استعرض زيوت موصى بها على شكل
                  بطاقات منتجات فقط، ادخل المتجر، ثم احجز ميكانيكيًا قريبًا بثقة.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-4">
                  {[
                    { title: "01", label: "Vehicle" },
                    { title: "02", label: "Oil" },
                    { title: "03", label: "Store" },
                    { title: "04", label: "Mechanics" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[24px] border border-border bg-card/72 px-4 py-4 shadow-[0_18px_50px_-34px_var(--shadow-ambient-strong)] backdrop-blur-xl"
                    >
                      <div className="text-xs tracking-[0.2em] text-muted">{item.title}</div>
                      <div className="mt-2 text-sm font-semibold text-foreground">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[32px] border border-border bg-card/72 p-5 backdrop-blur-xl">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[24px] border border-primary/20 bg-primary/10 p-4">
                    <div className="text-xs tracking-[0.18em] text-primary">نوع الحساب</div>
                    <div className="mt-2 text-xl font-semibold text-foreground dark:text-primary-foreground">مالك سيارة</div>
                  </div>
                  <div className="rounded-[24px] border border-border bg-card-2/80 p-4">
                    <div className="text-xs tracking-[0.18em] text-muted">الحالة</div>
                    <div className="mt-2 text-xl font-semibold text-foreground">
                      {savedVehicle ? "جاهز للتوصيات" : "ابدأ باختيار المركبة"}
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {[
                    { icon: CarFront, label: "المركبة", value: savedVehicle ? `${savedVehicle.make} ${savedVehicle.model}` : "غير محددة" },
                    { icon: Droplets, label: "الزيت", value: selectedOil ? selectedOil.viscosity : "بانتظار التحديد" },
                    { icon: CalendarCheck, label: "الحجز", value: canShowMechanics ? "جاهز" : "بعد المتجر أو الزيت" },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.label}
                        className="rounded-[24px] border border-border bg-card-2/80 p-4"
                      >
                        <Icon className="h-4 w-4 text-primary" aria-hidden />
                        <div className="mt-3 text-xs tracking-[0.16em] text-muted">{item.label}</div>
                        <div className="mt-2 text-sm font-semibold text-foreground">{item.value}</div>
                      </div>
                    );
                  })}
                </div>

                {savedVehicle ? (
                  <div className="mt-4 rounded-[24px] border border-border bg-card-2/80 p-4 text-sm text-muted">
                    <div className="text-xs tracking-[0.16em] text-muted">المركبة المحفوظة</div>
                    <div className="mt-2 font-semibold text-foreground">
                      {savedVehicle.make} {savedVehicle.model}
                    </div>
                    <div className="mt-1">
                      {engineOptions.find((item) => item.value === savedVehicle.engineType)?.label ?? "بنزين"}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </section>

          <section className="mt-8 grid gap-8 lg:grid-cols-[0.92fr_minmax(0,1.08fr)]">
            <form
              onSubmit={handleVehicleSubmit}
              className="rounded-[34px] border border-border bg-card/82 p-6 shadow-[0_28px_90px_-54px_var(--shadow-ambient-strong)] backdrop-blur-2xl sm:p-8"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card-2/80 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-muted">
                <CarFront className="h-4 w-4 text-primary" aria-hidden />
                STEP 1
              </div>
              <h2 className="mt-5 text-3xl font-semibold text-foreground">اختيار السيارة</h2>
              <p className="mt-3 text-sm leading-8 text-muted">
                اختر الماركة والموديل ونوع المحرك. من هذه الخطوة يبدأ التدفق الرسمي للعميل نحو
                توصية زيت مرئية ثم المتجر ثم الميكانيكيين القريبين.
              </p>

              <div className="mt-8 grid gap-4">
                <label className="grid gap-2 text-sm text-muted">
                  <span>الماركة</span>
                  <select
                    className="input"
                    value={brand}
                    onChange={(event) => setBrand(event.target.value)}
                  >
                    {brands.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-2 text-sm text-muted">
                  <span>الموديل</span>
                  <select
                    className="input"
                    value={activeModel}
                    onChange={(event) => setModel(event.target.value)}
                  >
                    {models.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-2 text-sm text-muted">
                  <span>نوع المحرك</span>
                  <select
                    className="input"
                    value={engineType}
                    onChange={(event) =>
                      setEngineType(event.target.value as NonNullable<CustomerCar["engineType"]>)
                    }
                  >
                    {engineOptions.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <button type="submit" className="btn-primary mt-8 h-13 px-7">
                حفظ المركبة وإظهار التوصيات
                <ArrowLeft className="h-5 w-5" aria-hidden />
              </button>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[24px] border border-primary/20 bg-primary/10 p-4">
                  <div className="flex items-center gap-2 text-xs tracking-[0.18em] text-primary">
                    <Gauge className="h-4 w-4" aria-hidden />
                    ENGINE TYPE
                  </div>
                  <div className="mt-3 text-lg font-semibold text-foreground dark:text-primary-foreground">{selectedEngineLabel}</div>
                </div>
                <div className="rounded-[24px] border border-border bg-card-2/80 p-4">
                  <div className="flex items-center gap-2 text-xs tracking-[0.18em] text-muted">
                    <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden />
                    NEXT STEP
                  </div>
                  <div className="mt-3 text-lg font-semibold text-foreground">بطاقات الزيت الموصى بها</div>
                </div>
              </div>
            </form>

            <div className="rounded-[34px] border border-border bg-card/78 p-6 backdrop-blur-2xl sm:p-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-primary">
                <Droplets className="h-4 w-4" aria-hidden />
                STEP 2
              </div>
              <h2 className="mt-5 text-3xl font-semibold text-foreground">الزيت المناسب لسيارتك</h2>
              <p className="mt-3 text-sm leading-8 text-muted">
                التوصية تعتمد على القاعدة التالية: BMW / Audi / Mercedes نحو 5W30 أو 5W40،
                Toyota / Hyundai نحو 5W30، ومحركات الديزل نحو 5W40. النتيجة تظهر دائمًا كبطاقات
                منتجات فعلية.
              </p>

              <div className="mt-8 grid gap-5 xl:grid-cols-3">
                {recommendedOils.map((product) => (
                  <article
                    key={product.id}
                    className={[
                      "overflow-hidden rounded-[28px] border bg-card/86 shadow-[0_22px_70px_-44px_var(--shadow-ambient-strong)] backdrop-blur-xl transition",
                      selectedOilId === product.id
                        ? "border-primary/35 ring-1 ring-primary/30"
                        : "border-border hover:-translate-y-1",
                    ].join(" ")}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedOilId(product.id);
                        setBookingMessage(null);
                      }}
                      className="block w-full text-right"
                    >
                      <div className="border-b border-border/70 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.16),transparent_44%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5 dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_44%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]">
                        <div className="mx-auto flex h-48 items-center justify-center">
                          <Image
                            src={product.image}
                            alt={product.title}
                            width={320}
                            height={320}
                            sizes="(max-width: 768px) 100vw, (max-width: 1440px) 50vw, 33vw"
                            className="h-full w-auto object-contain drop-shadow-[0_26px_60px_rgba(0,0,0,0.38)]"
                          />
                        </div>
                      </div>
                      <div className="space-y-4 p-5">
                        <div>
                          <div className="text-xs uppercase tracking-[0.18em] text-primary">{product.brand}</div>
                          <h3 className="mt-3 text-xl font-semibold leading-tight text-foreground">{product.title}</h3>
                        </div>
                        <div className="rounded-[18px] border border-border bg-card-2/80 px-4 py-3 text-sm text-muted">
                          اللزوجة: <span className="font-semibold text-foreground">{product.viscosity}</span>
                        </div>
                      </div>
                    </button>

                    <div className="px-5 pb-5">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedOilId(product.id);
                          openStore(product.id);
                        }}
                        className="inline-flex h-12 w-full items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-sm font-semibold text-primary transition hover:-translate-y-0.5 hover:bg-primary/14"
                      >
                        عرض في المتجر
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button type="button" className="btn-primary h-13 px-7" onClick={() => openStore()}>
                  الدخول إلى المتجر
                  <ShoppingBag className="h-5 w-5" aria-hidden />
                </button>
                {selectedOil ? (
                  <div className="rounded-full border border-border bg-card/78 px-5 py-3 text-sm text-muted">
                    الزيت المحدد: <span className="font-semibold text-foreground">{selectedOil.title}</span>
                  </div>
                ) : null}
              </div>
            </div>
          </section>

          <section className="mt-8 rounded-[34px] border border-border bg-card/82 p-6 shadow-[0_28px_90px_-54px_var(--shadow-ambient-strong)] backdrop-blur-2xl sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-primary">
                  <ShoppingBag className="h-4 w-4" aria-hidden />
                  STEP 3
                </div>
                <h2 className="mt-5 text-3xl font-semibold text-foreground">الوصول إلى المتجر</h2>
                <p className="mt-3 max-w-2xl text-sm leading-8 text-muted">
                  المتجر يحتوي على زيوت محركات وقطع غيار وخدمات، وكل قسم يظهر كبطاقات مرئية مع
                  صور ضمن تجربة Tesla-style راقية بلمسات زرقاء متناسقة.
                </p>
              </div>
              <button type="button" className="btn-secondary h-12 px-6" onClick={() => openStore()}>
                الدخول إلى المتجر
              </button>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {storePreviewCards.map((item) => (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-[28px] border border-border bg-card/82 shadow-[0_22px_70px_-44px_var(--shadow-ambient-strong)] backdrop-blur-xl"
                >
                  <div className="border-b border-border/70 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.14),transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5 dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]">
                    <div className="mx-auto flex h-56 items-center justify-center">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={360}
                        height={360}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="h-full w-auto object-contain drop-shadow-[0_24px_60px_rgba(0,0,0,0.38)]"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 p-5">
                    <div className="text-xs tracking-[0.18em] text-primary">{item.category}</div>
                    <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm leading-8 text-muted">{item.subtitle}</p>
                    <button
                      type="button"
                      onClick={() => openStore()}
                      className="inline-flex h-12 w-full items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-sm font-semibold text-primary transition hover:-translate-y-0.5 hover:bg-primary/14"
                    >
                      الدخول إلى المتجر
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {canShowMechanics ? (
            <section
              id="mechanics"
              className="mt-8 rounded-[34px] border border-border bg-card/78 p-6 shadow-[0_28px_90px_-54px_var(--shadow-ambient-strong)] backdrop-blur-2xl sm:p-8"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-primary">
                    <CalendarCheck className="h-4 w-4" aria-hidden />
                    STEP 4
                  </div>
                  <h2 className="mt-5 text-3xl font-semibold text-foreground">الميكانيكيون القريبون</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-8 text-muted">
                    بعد اختيار الزيت أو الدخول إلى المتجر، تظهر لك بطاقات الميكانيكيين القريبين مع
                    الموقع والتقييم والخدمات المتاحة لتكمل التدفق بشكل طبيعي.
                  </p>
                </div>
                {bookingMessage ? (
                  <div className="rounded-full border border-primary/20 bg-primary/10 px-4 py-3 text-sm text-primary">
                    {bookingMessage}
                  </div>
                ) : null}
              </div>

              <div className="mt-8 grid gap-5 xl:grid-cols-3">
                {mechanicOptions.map((mechanic) => (
                  <article
                    key={mechanic.id}
                    className="rounded-[28px] border border-border bg-card/84 p-6 shadow-[0_22px_70px_-44px_var(--shadow-ambient-strong)] backdrop-blur-xl"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{mechanic.name}</h3>
                        <div className="mt-2 flex items-center gap-2 text-sm text-muted">
                          <MapPin className="h-4 w-4 text-primary" aria-hidden />
                          {mechanic.location}
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-1 rounded-full border border-border bg-card-2/80 px-3 py-2 text-sm font-semibold text-foreground">
                        <Star className="h-4 w-4 fill-primary text-primary" aria-hidden />
                        {mechanic.rating}
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {mechanic.services.map((service) => (
                        <span
                          key={service}
                          className="rounded-full border border-border bg-card-2/80 px-3 py-2 text-xs text-muted"
                        >
                          {service}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => bookMechanic(mechanic)}
                      className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-sm font-semibold text-primary transition hover:-translate-y-0.5 hover:bg-primary/14"
                    >
                      احجز ميكانيكي
                    </button>
                  </article>
                ))}
              </div>
            </section>
          ) : (
            <section className="mt-8 rounded-[30px] border border-dashed border-border bg-card/68 p-6 text-sm leading-8 text-muted backdrop-blur-xl">
              اختر زيتًا من البطاقات أو ادخل إلى المتجر أولًا، ثم ستظهر لك بطاقات الميكانيكيين
              القريبين للحجز.
            </section>
          )}

          <section className="mt-8 grid gap-4 md:grid-cols-4">
            {[
              { icon: ShieldCheck, label: "سجل واضح للمركبة" },
              { icon: Droplets, label: "بطاقات زيوت مرئية" },
              { icon: ScanSearch, label: "متجر بصري متكامل" },
              { icon: Wrench, label: "حجز مباشر للميكانيكي" },
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
