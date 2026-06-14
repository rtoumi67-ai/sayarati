import type { CustomerCar } from "../../components/auth";

export type StoreProduct = {
  id: string;
  title: string;
  brand: string;
  viscosity: string;
  packageSize: string;
  priceDa: number;
  deliveryFeeDa: number;
  deliveryEta: string;
  sellerName: string;
  storeName: string;
  storeCity: string;
  image: string;
  minKm: number;
  maxKm: number | null;
  supportedMakes?: string[];
  supportedModels?: string[];
  highlights: string[];
};

type CarSelection = Pick<CustomerCar, "make" | "model" | "year" | "km">;

const OIL_STORE_PRODUCTS: StoreProduct[] = [
  {
    id: "shell-helix-hx8-5w30",
    title: "Shell Helix HX8 5W-30",
    brand: "Shell",
    viscosity: "5W-30",
    packageSize: "5L",
    priceDa: 8900,
    deliveryFeeDa: 600,
    deliveryEta: "24h - 48h",
    sellerName: "Lubri DZ",
    storeName: "Lubri DZ Store",
    storeCity: "Alger",
    image:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Ultra%20realistic%20studio%20product%20photo%20of%20a%20Shell%20Helix%20HX8%205W-30%20motor%20oil%20container%2C%20premium%20ecommerce%20lighting%2C%20clean%20white%20background%2C%20high%20detail%2C%20no%20text%2C%20no%20watermark&image_size=square",
    minKm: 15000,
    maxKm: 70000,
    supportedMakes: ["Toyota", "Hyundai", "Kia", "Honda", "Nissan"],
    highlights: ["Protects engine on daily use", "Good fuel economy", "Works well for city traffic"],
  },
  {
    id: "mobil1-esp-0w20",
    title: "Mobil 1 ESP 0W-20",
    brand: "Mobil 1",
    viscosity: "0W-20",
    packageSize: "4L",
    priceDa: 11200,
    deliveryFeeDa: 700,
    deliveryEta: "24h - 72h",
    sellerName: "Auto Fluids Pro",
    storeName: "AF Pro",
    storeCity: "Oran",
    image:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Ultra%20realistic%20studio%20product%20photo%20of%20a%20Mobil%201%20ESP%200W-20%20engine%20oil%20bottle%2C%20modern%20ecommerce%20style%2C%20soft%20shadow%2C%20white%20background%2C%20high%20detail%2C%20no%20text%2C%20no%20watermark&image_size=square",
    minKm: 0,
    maxKm: 40000,
    supportedMakes: ["Toyota", "Honda", "Lexus", "Nissan"],
    supportedModels: ["Corolla", "Camry", "Civic", "Accord", "Altima"],
    highlights: ["Low-viscosity cold start support", "Premium synthetic formula", "Fits newer engines"],
  },
  {
    id: "castrol-edge-5w40",
    title: "Castrol EDGE 5W-40",
    brand: "Castrol",
    viscosity: "5W-40",
    packageSize: "5L",
    priceDa: 9800,
    deliveryFeeDa: 650,
    deliveryEta: "24h - 48h",
    sellerName: "Speed Parts",
    storeName: "Speed Parts Oil Center",
    storeCity: "Constantine",
    image:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Ultra%20realistic%20studio%20product%20photo%20of%20a%20Castrol%20EDGE%205W-40%20motor%20oil%20container%2C%20premium%20retail%20packaging%2C%20ecommerce%20photography%2C%20white%20background%2C%20high%20detail%2C%20no%20text%2C%20no%20watermark&image_size=square",
    minKm: 40000,
    maxKm: 100000,
    supportedMakes: ["BMW", "Mercedes-Benz", "Audi", "Volkswagen", "Renault", "Peugeot"],
    highlights: ["Strong protection at high temperature", "Good for turbo engines", "Stable on longer intervals"],
  },
  {
    id: "total-quartz-7000-10w40",
    title: "Total Quartz 7000 10W-40",
    brand: "Total",
    viscosity: "10W-40",
    packageSize: "4L",
    priceDa: 6900,
    deliveryFeeDa: 500,
    deliveryEta: "24h - 48h",
    sellerName: "Meca Market",
    storeName: "Meca Market",
    storeCity: "Setif",
    image:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Ultra%20realistic%20studio%20product%20photo%20of%20a%20Total%20Quartz%207000%2010W-40%20engine%20oil%20bottle%2C%20clean%20ecommerce%20lighting%2C%20white%20background%2C%20high%20detail%2C%20no%20text%2C%20no%20watermark&image_size=square",
    minKm: 70000,
    maxKm: null,
    supportedMakes: ["Renault", "Peugeot", "Fiat", "Opel", "Chevrolet", "Hyundai"],
    highlights: ["Great for older daily drivers", "Reliable viscosity at high mileage", "Budget-friendly maintenance choice"],
  },
  {
    id: "liqui-moly-toptec-4200-5w30",
    title: "Liqui Moly Top Tec 4200 5W-30",
    brand: "Liqui Moly",
    viscosity: "5W-30",
    packageSize: "5L",
    priceDa: 12400,
    deliveryFeeDa: 800,
    deliveryEta: "48h - 72h",
    sellerName: "German Auto Care",
    storeName: "German Auto Care",
    storeCity: "Alger",
    image:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Ultra%20realistic%20studio%20product%20photo%20of%20a%20Liqui%20Moly%20Top%20Tec%204200%205W-30%20motor%20oil%20container%2C%20premium%20ecommerce%20product%20shot%2C%20white%20background%2C%20high%20detail%2C%20no%20text%2C%20no%20watermark&image_size=square",
    minKm: 30000,
    maxKm: 120000,
    supportedMakes: ["BMW", "Mercedes-Benz", "Audi", "Volkswagen", "Skoda"],
    highlights: ["Clean running synthetic oil", "Premium European spec", "Useful for mixed highway and city driving"],
  },
  {
    id: "motul-8100-xclean-5w40",
    title: "Motul 8100 X-clean 5W-40",
    brand: "Motul",
    viscosity: "5W-40",
    packageSize: "5L",
    priceDa: 10900,
    deliveryFeeDa: 750,
    deliveryEta: "24h - 72h",
    sellerName: "Racing Oil Shop",
    storeName: "Racing Oil Shop",
    storeCity: "Annaba",
    image:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Ultra%20realistic%20studio%20product%20photo%20of%20a%20Motul%208100%20X-clean%205W-40%20engine%20oil%20container%2C%20premium%20ecommerce%20catalog%20style%2C%20white%20background%2C%20high%20detail%2C%20no%20text%2C%20no%20watermark&image_size=square",
    minKm: 60000,
    maxKm: null,
    supportedMakes: ["BMW", "Mercedes-Benz", "Audi", "Peugeot", "Renault", "Volkswagen"],
    highlights: ["High-temperature protection", "Good for performance-oriented driving", "Supports cleaner engine operation"],
  },
];

function normalizeValue(value: string) {
  return value.trim().toLowerCase();
}

function matchesProductList(list: string[] | undefined, value: string) {
  if (!list?.length) return true;
  return list.some((item) => normalizeValue(item) === normalizeValue(value));
}

function isWithinMileage(product: StoreProduct, km: number) {
  if (km < product.minKm) return false;
  if (product.maxKm != null && km > product.maxKm) return false;
  return true;
}

function getProductScore(product: StoreProduct, car: CarSelection) {
  let score = 0;

  if (matchesProductList(product.supportedMakes, car.make)) {
    score += product.supportedMakes?.length ? 25 : 10;
  } else {
    return -1;
  }

  if (matchesProductList(product.supportedModels, car.model)) {
    score += product.supportedModels?.length ? 35 : 8;
  } else if (product.supportedModels?.length) {
    return -1;
  }

  if (isWithinMileage(product, car.km)) {
    score += 30;
  } else {
    const distanceFromRange =
      car.km < product.minKm
        ? product.minKm - car.km
        : car.km - (product.maxKm ?? car.km);
    score += Math.max(0, 15 - Math.floor(distanceFromRange / 10000));
  }

  return score;
}

export function getAllOilStoreProducts() {
  return OIL_STORE_PRODUCTS;
}

export function getRecommendedOilProducts(car: CarSelection, limit = 6) {
  return [...OIL_STORE_PRODUCTS]
    .map((product) => ({
      product,
      score: getProductScore(product, car),
    }))
    .filter((entry) => entry.score >= 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.product.priceDa - b.product.priceDa;
    })
    .slice(0, limit)
    .map((entry) => entry.product);
}

export function formatDaPrice(value: number) {
  return `${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} DA`;
}

export function formatMileageBand(minKm: number, maxKm: number | null, unit: string) {
  const from = String(minKm).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  if (maxKm == null) {
    return `${from}+ ${unit}`;
  }

  const to = String(maxKm).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${from} - ${to} ${unit}`;
}
