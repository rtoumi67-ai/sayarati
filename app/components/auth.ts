import { createSupabaseBrowserClient } from "../lib/supabase/client";

export type Role = "customer" | "mechanic";

export type CustomerCar = {
  type:
    | "sedan"
    | "suv"
    | "pickup"
    | "van"
    | "hatchback"
    | "crossover"
    | "coupe"
    | "wagon"
    | "convertible"
    | "minivan"
    | "mpv"
    | "truck";
  make: string;
  model: string;
  year: string;
  km: number;
  engineType?: "petrol" | "diesel" | "hybrid" | "electric";
  trim?: string;
  color?: string;
  plateNumber?: string;
  vin?: string;
  transmission?: "manual" | "automatic" | "cvt" | "dct";
  drivetrain?: "fwd" | "rwd" | "awd" | "4wd";
  nickname?: string;
};

export type ServiceRequestStatus =
  | "pending"
  | "accepted"
  | "in_progress"
  | "completed"
  | "cancelled";

export type ServiceRequest = {
  id: string;
  clientName: string;
  carType: string;
  carLabel: string;
  requestedService: string;
  status: ServiceRequestStatus;
  location: string;
  mechanicName: string;
  notes: string;
  source: "oil" | "store" | "maintenance";
  createdAt: string;
};

export type MarketplaceCartItemKind = "oil" | "part" | "service";
export type MarketplaceCartItemMetadataValue = string | number | boolean | null;

export type MarketplaceCartItem = {
  id: string;
  productId: string;
  kind: MarketplaceCartItemKind;
  title: string;
  quantity: number;
  unitPriceDa: number;
  currency: "DZD";
  addedAt: string;
  subtitle?: string;
  image?: string;
  vendorName?: string;
  sku?: string;
  compatibilityLabel?: string;
  vehicleLabel?: string;
  metadata?: Record<string, MarketplaceCartItemMetadataValue>;
};

export type MarketplaceOrderStatus =
  | "draft"
  | "pending_confirmation"
  | "confirmed"
  | "processing"
  | "ready_for_pickup"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export type MarketplaceOrderTrackingEvent = {
  status: MarketplaceOrderStatus;
  note: string;
  createdAt: string;
};

export type MarketplaceOrder = {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  status: MarketplaceOrderStatus;
  statusHistory: MarketplaceOrderTrackingEvent[];
  items: MarketplaceCartItem[];
  subtotalDa: number;
  shippingDa: number;
  totalDa: number;
  currency: "DZD";
  fulfillmentMethod: "delivery" | "pickup";
  deliveryAddress?: string;
  notes: string;
  source: "marketplace" | "store";
  vehicle: CustomerCar | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateMarketplaceOrderInput = {
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  items?: MarketplaceCartItem[];
  status?: MarketplaceOrderStatus;
  shippingDa?: number;
  fulfillmentMethod?: MarketplaceOrder["fulfillmentMethod"];
  deliveryAddress?: string;
  notes?: string;
  source?: MarketplaceOrder["source"];
  vehicle?: CustomerCar | null;
};

export type MarketplaceOrderPersistenceOptions = {
  clearCart?: boolean;
  useSupabaseBrowserInsertFallback?: boolean;
  supabaseTableName?: string;
};

export type MarketplaceOrderStatusUpdateOptions = {
  note?: string;
  useSupabaseBrowserInsertFallback?: boolean;
  supabaseTableName?: string;
};

export type MarketplaceOrderPersistenceResult = {
  order: MarketplaceOrder;
  persistedLocally: true;
  persistedToSupabase: boolean;
  supabaseError: string | null;
};

export const MARKETPLACE_ORDER_TRACKING_STATUSES: MarketplaceOrderStatus[] = [
  "draft",
  "pending_confirmation",
  "confirmed",
  "processing",
  "ready_for_pickup",
  "out_for_delivery",
  "delivered",
  "cancelled",
];

const ROLE_STORAGE_KEY = "sayarati.role";
const AUTH_STORAGE_KEY = "sayarati.authed";
const CUSTOMER_CAR_STORAGE_KEY = "sayarati.customer.car";
const SERVICE_REQUESTS_STORAGE_KEY = "sayarati.service.requests";
const MARKETPLACE_CART_STORAGE_KEY = "sayarati.marketplace.cart";
const MARKETPLACE_ORDERS_STORAGE_KEY = "sayarati.marketplace.orders";

export function getRole(): Role | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(ROLE_STORAGE_KEY);
  if (value === "customer" || value === "mechanic") return value;
  return null;
}

export function setRole(role: Role) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ROLE_STORAGE_KEY, role);
}

export function isAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(AUTH_STORAGE_KEY) === "1";
}

export function setAuthed(value: boolean) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(AUTH_STORAGE_KEY, value ? "1" : "0");
}

export function getCustomerCar(): CustomerCar | null {
  return readStorageValue(CUSTOMER_CAR_STORAGE_KEY, normalizeCustomerCar, null);
}

export function setCustomerCar(car: CustomerCar) {
  const nextCar = normalizeCustomerCar(car);
  if (!nextCar) return;
  writeStorageValue(CUSTOMER_CAR_STORAGE_KEY, nextCar);
}

export function getServiceRequests(): ServiceRequest[] {
  return readStorageValue(SERVICE_REQUESTS_STORAGE_KEY, normalizeServiceRequestList, []);
}

export function setServiceRequests(requests: ServiceRequest[]) {
  writeStorageValue(
    SERVICE_REQUESTS_STORAGE_KEY,
    requests
      .map((request) => normalizeServiceRequest(request))
      .filter((request): request is ServiceRequest => request != null),
  );
}

export function createServiceRequest(
  input: Omit<ServiceRequest, "id" | "createdAt" | "status"> & { status?: ServiceRequestStatus },
) {
  const nextRequest = normalizeServiceRequest({
    ...input,
    id: createEntityId("req"),
    createdAt: new Date().toISOString(),
    status: input.status ?? "pending",
  });

  if (!nextRequest) {
    throw new Error("Invalid service request payload.");
  }

  const nextRequests = [nextRequest, ...getServiceRequests()];
  setServiceRequests(nextRequests);
  return nextRequest;
}

export function updateServiceRequestStatus(id: string, status: ServiceRequestStatus) {
  let updatedRequest: ServiceRequest | null = null;
  const nextRequests = getServiceRequests().map((request) => {
    if (request.id !== id) return request;
    updatedRequest = { ...request, status };
    return updatedRequest;
  });

  if (!updatedRequest) return null;
  setServiceRequests(nextRequests);
  return updatedRequest;
}

export function getMarketplaceCart(): MarketplaceCartItem[] {
  return readStorageValue(MARKETPLACE_CART_STORAGE_KEY, normalizeMarketplaceCartList, []);
}

export function setMarketplaceCart(items: MarketplaceCartItem[]) {
  writeStorageValue(
    MARKETPLACE_CART_STORAGE_KEY,
    items
      .map((item) => normalizeMarketplaceCartItem(item))
      .filter((item): item is MarketplaceCartItem => item != null),
  );
}

export function addMarketplaceCartItem(
  item: Omit<MarketplaceCartItem, "id" | "addedAt" | "currency"> &
    Partial<Pick<MarketplaceCartItem, "id" | "addedAt" | "currency">>,
  options?: { mergeQuantity?: boolean },
) {
  const nextItem = normalizeMarketplaceCartItem({
    ...item,
    id: item.id ?? createEntityId("cart"),
    addedAt: item.addedAt ?? new Date().toISOString(),
    currency: item.currency ?? "DZD",
  });

  if (!nextItem) {
    throw new Error("Invalid marketplace cart item payload.");
  }

  const currentCart = getMarketplaceCart();
  const shouldMerge = options?.mergeQuantity ?? true;

  if (shouldMerge) {
    const existingIndex = currentCart.findIndex(
      (entry) => entry.productId === nextItem.productId && entry.kind === nextItem.kind,
    );

    if (existingIndex >= 0) {
      const mergedItem: MarketplaceCartItem = {
        ...currentCart[existingIndex],
        ...nextItem,
        quantity: currentCart[existingIndex].quantity + nextItem.quantity,
      };
      const mergedCart = currentCart.map((entry, index) => (index === existingIndex ? mergedItem : entry));
      setMarketplaceCart(mergedCart);
      return mergedItem;
    }
  }

  const nextCart = [nextItem, ...currentCart];
  setMarketplaceCart(nextCart);
  return nextItem;
}

export function updateMarketplaceCartItemQuantity(id: string, quantity: number) {
  if (!Number.isFinite(quantity) || quantity < 1) {
    return removeMarketplaceCartItem(id);
  }

  let updatedItem: MarketplaceCartItem | null = null;
  const nextCart = getMarketplaceCart().map((item) => {
    if (item.id !== id) return item;
    updatedItem = { ...item, quantity: Math.round(quantity) };
    return updatedItem;
  });

  if (!updatedItem) return null;
  setMarketplaceCart(nextCart);
  return updatedItem;
}

export function removeMarketplaceCartItem(id: string) {
  const currentCart = getMarketplaceCart();
  const nextCart = currentCart.filter((item) => item.id !== id);
  if (nextCart.length === currentCart.length) return null;
  setMarketplaceCart(nextCart);
  return nextCart;
}

export function clearMarketplaceCart() {
  setMarketplaceCart([]);
}

export function getMarketplaceOrders(): MarketplaceOrder[] {
  return readStorageValue(MARKETPLACE_ORDERS_STORAGE_KEY, normalizeMarketplaceOrderList, []);
}

export function setMarketplaceOrders(orders: MarketplaceOrder[]) {
  writeStorageValue(
    MARKETPLACE_ORDERS_STORAGE_KEY,
    orders
      .map((order) => normalizeMarketplaceOrder(order))
      .filter((order): order is MarketplaceOrder => order != null),
  );
}

export async function createMarketplaceOrder(
  input: CreateMarketplaceOrderInput,
  options?: MarketplaceOrderPersistenceOptions,
): Promise<MarketplaceOrderPersistenceResult> {
  const customerName = normalizeRequiredString(input.customerName);
  const items = (input.items ?? getMarketplaceCart())
    .map((item) => normalizeMarketplaceCartItem(item))
    .filter((item): item is MarketplaceCartItem => item != null);

  if (!customerName) {
    throw new Error("Marketplace order requires a customer name.");
  }

  if (!items.length) {
    throw new Error("Marketplace order requires at least one cart item.");
  }

  const subtotalDa = items.reduce((sum, item) => sum + item.unitPriceDa * item.quantity, 0);
  const shippingDa = normalizeNumber(input.shippingDa) ?? 0;
  const now = new Date().toISOString();
  const status = normalizeMarketplaceOrderStatus(input.status) ?? "pending_confirmation";
  const nextOrder = normalizeMarketplaceOrder({
    id: createEntityId("order"),
    orderNumber: createOrderNumber(),
    customerName,
    customerPhone: normalizeOptionalString(input.customerPhone),
    customerEmail: normalizeOptionalString(input.customerEmail),
    status,
    statusHistory: [createTrackingEvent(status, input.notes ?? "Order created from marketplace flow.")],
    items,
    subtotalDa,
    shippingDa,
    totalDa: subtotalDa + shippingDa,
    currency: "DZD",
    fulfillmentMethod: input.fulfillmentMethod ?? "delivery",
    deliveryAddress: normalizeOptionalString(input.deliveryAddress),
    notes: normalizeOptionalString(input.notes) ?? "",
    source: input.source ?? "marketplace",
    vehicle: input.vehicle === undefined ? getCustomerCar() : input.vehicle,
    createdAt: now,
    updatedAt: now,
  });

  if (!nextOrder) {
    throw new Error("Invalid marketplace order payload.");
  }

  setMarketplaceOrders([nextOrder, ...getMarketplaceOrders()]);

  if (options?.clearCart ?? true) {
    clearMarketplaceCart();
  }

  const supabaseSync = options?.useSupabaseBrowserInsertFallback
    ? await insertMarketplaceOrderWithSupabaseBrowserFallback(
        nextOrder,
        options.supabaseTableName,
      )
    : { persistedToSupabase: false, supabaseError: null };

  return {
    order: nextOrder,
    persistedLocally: true,
    persistedToSupabase: supabaseSync.persistedToSupabase,
    supabaseError: supabaseSync.supabaseError,
  };
}

export async function updateMarketplaceOrderStatus(
  orderId: string,
  status: MarketplaceOrderStatus,
  options?: MarketplaceOrderStatusUpdateOptions,
): Promise<MarketplaceOrderPersistenceResult | null> {
  const nextStatus = normalizeMarketplaceOrderStatus(status);
  if (!nextStatus) return null;

  let updatedOrder: MarketplaceOrder | null = null;
  const nextOrders = getMarketplaceOrders().map((order) => {
    if (order.id !== orderId) return order;

    updatedOrder = {
      ...order,
      status: nextStatus,
      updatedAt: new Date().toISOString(),
      statusHistory: [createTrackingEvent(nextStatus, options?.note ?? `Status changed to ${nextStatus}.`), ...order.statusHistory],
    };
    return updatedOrder;
  });

  if (!updatedOrder) return null;

  setMarketplaceOrders(nextOrders);

  const supabaseSync = options?.useSupabaseBrowserInsertFallback
    ? await syncMarketplaceOrderStatusWithSupabaseBrowserFallback(
        updatedOrder,
        options.supabaseTableName,
      )
    : { persistedToSupabase: false, supabaseError: null };

  return {
    order: updatedOrder,
    persistedLocally: true,
    persistedToSupabase: supabaseSync.persistedToSupabase,
    supabaseError: supabaseSync.supabaseError,
  };
}

export async function insertMarketplaceOrderWithSupabaseBrowserFallback(
  order: MarketplaceOrder,
  tableName = "marketplace_orders",
) {
  try {
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.from(tableName).insert([toSupabaseMarketplaceOrderRow(order)]);
    if (error) {
      return {
        persistedToSupabase: false,
        supabaseError: error.message,
      };
    }

    return {
      persistedToSupabase: true,
      supabaseError: null,
    };
  } catch (error) {
    return {
      persistedToSupabase: false,
      supabaseError: error instanceof Error ? error.message : "Supabase browser insert failed.",
    };
  }
}

function readStorageValue<T>(
  storageKey: string,
  normalize: (raw: unknown) => T,
  fallback: T,
): T {
  if (typeof window === "undefined") return fallback;
  const raw = window.localStorage.getItem(storageKey);
  if (!raw) return fallback;

  try {
    return normalize(JSON.parse(raw));
  } catch {
    return fallback;
  }
}

function writeStorageValue(storageKey: string, value: unknown) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(storageKey, JSON.stringify(value));
}

function createEntityId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function createOrderNumber() {
  const stamp = new Date().toISOString().replace(/\D/g, "").slice(2, 14);
  return `SYR-${stamp}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

function createTrackingEvent(status: MarketplaceOrderStatus, note: string): MarketplaceOrderTrackingEvent {
  return {
    status,
    note,
    createdAt: new Date().toISOString(),
  };
}

function toSupabaseMarketplaceOrderRow(order: MarketplaceOrder) {
  return {
    id: order.id,
    order_number: order.orderNumber,
    customer_name: order.customerName,
    customer_phone: order.customerPhone ?? null,
    customer_email: order.customerEmail ?? null,
    status: order.status,
    status_history: order.statusHistory,
    items: order.items,
    subtotal_da: order.subtotalDa,
    shipping_da: order.shippingDa,
    total_da: order.totalDa,
    currency: order.currency,
    fulfillment_method: order.fulfillmentMethod,
    delivery_address: order.deliveryAddress ?? null,
    notes: order.notes || null,
    source: order.source,
    vehicle: order.vehicle,
    created_at: order.createdAt,
    updated_at: order.updatedAt,
  };
}

async function syncMarketplaceOrderStatusWithSupabaseBrowserFallback(
  order: MarketplaceOrder,
  tableName = "marketplace_orders",
) {
  try {
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase
      .from(tableName)
      .update({
        status: order.status,
        status_history: order.statusHistory,
        updated_at: order.updatedAt,
      })
      .eq("id", order.id);

    if (error) {
      return {
        persistedToSupabase: false,
        supabaseError: error.message,
      };
    }

    return {
      persistedToSupabase: true,
      supabaseError: null,
    };
  } catch (error) {
    return {
      persistedToSupabase: false,
      supabaseError: error instanceof Error ? error.message : "Supabase browser status sync failed.",
    };
  }
}

function normalizeCustomerCar(raw: unknown): CustomerCar | null {
  const entry = asRecord(raw);
  if (!entry) return null;

  const type = normalizeCarType(entry.type);
  const make = normalizeRequiredString(entry.make);
  const model = normalizeRequiredString(entry.model);
  const year = normalizeYear(entry.year);
  const km = normalizeNumber(entry.km) ?? 0;
  const engineType = normalizeEngineType(entry.engineType);

  if (!type || !make || !model || !year) return null;

  return {
    type,
    make,
    model,
    year,
    km: Math.max(0, Math.round(km)),
    engineType,
    trim: normalizeOptionalString(entry.trim),
    color: normalizeOptionalString(entry.color),
    plateNumber: normalizeOptionalString(entry.plateNumber),
    vin: normalizeOptionalString(entry.vin),
    transmission: normalizeTransmission(entry.transmission),
    drivetrain: normalizeDrivetrain(entry.drivetrain),
    nickname: normalizeOptionalString(entry.nickname),
  };
}

function normalizeServiceRequestList(raw: unknown): ServiceRequest[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((entry) => normalizeServiceRequest(entry))
    .filter((entry): entry is ServiceRequest => entry != null);
}

function normalizeServiceRequest(raw: unknown): ServiceRequest | null {
  const entry = asRecord(raw);
  if (!entry) return null;

  const status = normalizeRequestStatus(entry.status);
  const source = normalizeRequestSource(entry.source);

  if (
    typeof entry.id !== "string" ||
    typeof entry.clientName !== "string" ||
    typeof entry.carType !== "string" ||
    typeof entry.carLabel !== "string" ||
    typeof entry.requestedService !== "string" ||
    !status ||
    typeof entry.location !== "string" ||
    typeof entry.mechanicName !== "string" ||
    typeof entry.notes !== "string" ||
    !source ||
    typeof entry.createdAt !== "string"
  ) {
    return null;
  }

  return {
    id: entry.id,
    clientName: entry.clientName,
    carType: entry.carType,
    carLabel: entry.carLabel,
    requestedService: entry.requestedService,
    status,
    location: entry.location,
    mechanicName: entry.mechanicName,
    notes: entry.notes,
    source,
    createdAt: entry.createdAt,
  };
}

function normalizeMarketplaceCartList(raw: unknown): MarketplaceCartItem[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => normalizeMarketplaceCartItem(item))
    .filter((item): item is MarketplaceCartItem => item != null);
}

function normalizeMarketplaceCartItem(raw: unknown): MarketplaceCartItem | null {
  const entry = asRecord(raw);
  if (!entry) return null;

  const id = normalizeRequiredString(entry.id);
  const productId = normalizeRequiredString(entry.productId);
  const kind = normalizeMarketplaceCartItemKind(entry.kind);
  const title = normalizeRequiredString(entry.title);
  const quantity = normalizeNumber(entry.quantity);
  const unitPriceDa = normalizeNumber(entry.unitPriceDa);
  const currency = entry.currency === "DZD" ? "DZD" : null;
  const addedAt = normalizeRequiredString(entry.addedAt);

  if (
    !id ||
    !productId ||
    !kind ||
    !title ||
    quantity == null ||
    quantity < 1 ||
    unitPriceDa == null ||
    !currency ||
    !addedAt
  ) {
    return null;
  }

  return {
    id,
    productId,
    kind,
    title,
    quantity: Math.max(1, Math.round(quantity)),
    unitPriceDa: Math.max(0, unitPriceDa),
    currency,
    addedAt,
    subtitle: normalizeOptionalString(entry.subtitle),
    image: normalizeOptionalString(entry.image),
    vendorName: normalizeOptionalString(entry.vendorName),
    sku: normalizeOptionalString(entry.sku),
    compatibilityLabel: normalizeOptionalString(entry.compatibilityLabel),
    vehicleLabel: normalizeOptionalString(entry.vehicleLabel),
    metadata: normalizeMetadata(entry.metadata),
  };
}

function normalizeMarketplaceOrderList(raw: unknown): MarketplaceOrder[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((order) => normalizeMarketplaceOrder(order))
    .filter((order): order is MarketplaceOrder => order != null);
}

function normalizeMarketplaceOrder(raw: unknown): MarketplaceOrder | null {
  const entry = asRecord(raw);
  if (!entry) return null;

  const id = normalizeRequiredString(entry.id);
  const orderNumber = normalizeRequiredString(entry.orderNumber);
  const customerName = normalizeRequiredString(entry.customerName);
  const status = normalizeMarketplaceOrderStatus(entry.status);
  const items = normalizeMarketplaceCartList(entry.items);
  const subtotalDa = normalizeNumber(entry.subtotalDa);
  const shippingDa = normalizeNumber(entry.shippingDa);
  const totalDa = normalizeNumber(entry.totalDa);
  const currency = entry.currency === "DZD" ? "DZD" : null;
  const fulfillmentMethod = normalizeFulfillmentMethod(entry.fulfillmentMethod);
  const source = normalizeMarketplaceOrderSource(entry.source);
  const createdAt = normalizeRequiredString(entry.createdAt);
  const updatedAt = normalizeRequiredString(entry.updatedAt);

  if (
    !id ||
    !orderNumber ||
    !customerName ||
    !status ||
    !items.length ||
    subtotalDa == null ||
    shippingDa == null ||
    totalDa == null ||
    !currency ||
    !fulfillmentMethod ||
    !source ||
    !createdAt ||
    !updatedAt
  ) {
    return null;
  }

  const statusHistory = normalizeTrackingHistory(entry.statusHistory, status, createdAt);

  return {
    id,
    orderNumber,
    customerName,
    customerPhone: normalizeOptionalString(entry.customerPhone),
    customerEmail: normalizeOptionalString(entry.customerEmail),
    status,
    statusHistory,
    items,
    subtotalDa,
    shippingDa,
    totalDa,
    currency,
    fulfillmentMethod,
    deliveryAddress: normalizeOptionalString(entry.deliveryAddress),
    notes: normalizeOptionalString(entry.notes) ?? "",
    source,
    vehicle: entry.vehicle == null ? null : normalizeCustomerCar(entry.vehicle),
    createdAt,
    updatedAt,
  };
}

function normalizeTrackingHistory(
  raw: unknown,
  fallbackStatus: MarketplaceOrderStatus,
  fallbackCreatedAt: string,
): MarketplaceOrderTrackingEvent[] {
  if (!Array.isArray(raw)) {
    return [
      {
        status: fallbackStatus,
        note: "Order created.",
        createdAt: fallbackCreatedAt,
      },
    ];
  }

  const events = raw
    .map((entry) => {
      const event = asRecord(entry);
      if (!event) return null;

      const status = normalizeMarketplaceOrderStatus(event.status);
      const note = normalizeOptionalString(event.note) ?? "";
      const createdAt = normalizeRequiredString(event.createdAt);

      if (!status || !createdAt) return null;
      return { status, note, createdAt };
    })
    .filter((event): event is MarketplaceOrderTrackingEvent => event != null);

  if (!events.length) {
    return [
      {
        status: fallbackStatus,
        note: "Order created.",
        createdAt: fallbackCreatedAt,
      },
    ];
  }

  return events;
}

function normalizeMetadata(
  raw: unknown,
): Record<string, MarketplaceCartItemMetadataValue> | undefined {
  const entry = asRecord(raw);
  if (!entry) return undefined;

  const metadata = Object.entries(entry).reduce<Record<string, MarketplaceCartItemMetadataValue>>(
    (acc, [key, value]) => {
      if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean" ||
        value === null
      ) {
        acc[key] = value;
      }
      return acc;
    },
    {},
  );

  return Object.keys(metadata).length ? metadata : undefined;
}

function asRecord(raw: unknown): Record<string, unknown> | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  return raw as Record<string, unknown>;
}

function normalizeRequiredString(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const value = raw.trim();
  return value ? value : null;
}

function normalizeOptionalString(raw: unknown): string | undefined {
  return normalizeRequiredString(raw) ?? undefined;
}

function normalizeNumber(raw: unknown): number | null {
  if (typeof raw === "number" && Number.isFinite(raw)) return raw;
  if (typeof raw === "string" && raw.trim()) {
    const parsed = Number(raw);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

function normalizeYear(raw: unknown): string | null {
  if (typeof raw === "string" && raw.trim()) return raw.trim();
  if (typeof raw === "number" && Number.isFinite(raw)) return String(Math.round(raw));
  return null;
}

// Multilingual storage: keep car type in stable keys (sedan/suv/...) and support legacy Arabic values.
function normalizeCarType(raw: unknown): CustomerCar["type"] | null {
  if (
    raw === "sedan" ||
    raw === "suv" ||
    raw === "pickup" ||
    raw === "van" ||
    raw === "hatchback" ||
    raw === "crossover" ||
    raw === "coupe" ||
    raw === "wagon" ||
    raw === "convertible" ||
    raw === "minivan" ||
    raw === "mpv" ||
    raw === "truck"
  ) {
    return raw;
  }
  if (raw === "سيدان") return "sedan";
  if (raw === "SUV") return "suv";
  if (raw === "بيكاب") return "pickup";
  if (raw === "فان") return "van";
  if (raw === "هاتشباك") return "hatchback";
  if (raw === "كروس أوفر") return "crossover";
  if (raw === "كوبيه") return "coupe";
  if (raw === "واجن") return "wagon";
  if (raw === "مكشوفة") return "convertible";
  if (raw === "ميني فان") return "minivan";
  if (raw === "MPV") return "mpv";
  if (raw === "شاحنة") return "truck";
  return null;
}

function normalizeEngineType(raw: unknown): CustomerCar["engineType"] {
  if (raw === "petrol" || raw === "diesel" || raw === "hybrid" || raw === "electric") {
    return raw;
  }
  if (raw === "بنزين") return "petrol";
  if (raw === "ديزل") return "diesel";
  if (raw === "هايبرد") return "hybrid";
  if (raw === "كهربائي") return "electric";
  return undefined;
}

function normalizeTransmission(raw: unknown): CustomerCar["transmission"] {
  if (raw === "manual" || raw === "automatic" || raw === "cvt" || raw === "dct") {
    return raw;
  }
  return undefined;
}

function normalizeDrivetrain(raw: unknown): CustomerCar["drivetrain"] {
  if (raw === "fwd" || raw === "rwd" || raw === "awd" || raw === "4wd") {
    return raw;
  }
  return undefined;
}

function normalizeRequestStatus(raw: unknown): ServiceRequestStatus | null {
  if (
    raw === "pending" ||
    raw === "accepted" ||
    raw === "in_progress" ||
    raw === "completed" ||
    raw === "cancelled"
  ) {
    return raw;
  }
  return null;
}

function normalizeRequestSource(raw: unknown): ServiceRequest["source"] | null {
  if (raw === "oil" || raw === "store" || raw === "maintenance") return raw;
  return null;
}

function normalizeMarketplaceCartItemKind(raw: unknown): MarketplaceCartItemKind | null {
  if (raw === "oil" || raw === "part" || raw === "service") return raw;
  return null;
}

function normalizeMarketplaceOrderStatus(raw: unknown): MarketplaceOrderStatus | null {
  if (
    raw === "draft" ||
    raw === "pending_confirmation" ||
    raw === "confirmed" ||
    raw === "processing" ||
    raw === "ready_for_pickup" ||
    raw === "out_for_delivery" ||
    raw === "delivered" ||
    raw === "cancelled"
  ) {
    return raw;
  }
  return null;
}

function normalizeFulfillmentMethod(raw: unknown): MarketplaceOrder["fulfillmentMethod"] | null {
  if (raw === "delivery" || raw === "pickup") return raw;
  return null;
}

function normalizeMarketplaceOrderSource(raw: unknown): MarketplaceOrder["source"] | null {
  if (raw === "marketplace" || raw === "store") return raw;
  return null;
}
