import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItem, LaborBooking, Order, mockBookings, mockOrders } from "@/lib/mockData";

// Demo-mode account, orders, service bookings and wishlist, kept in localStorage.

export interface ShopUser {
  name: string;
  email: string;
  phone: string;
  memberSince: string;
}

export interface Consultation {
  id: string;
  name: string;
  phone: string;
  city: string;
  room: string;
  preferredDate: string;
  createdAt: string;
  status: "requested" | "confirmed";
}

interface State {
  user: ShopUser | null;
  orders: Order[];
  bookings: LaborBooking[];
  consultations: Consultation[];
  wishlist: string[];
}

const KEY = "decornest-shop-v1";
const DEMO_USER: ShopUser = { name: "Amar Demo", email: "demo@decornest.in", phone: "+91 98765 43210", memberSince: "2025-01-10" };

const seed = (): State => ({ user: null, orders: mockOrders, bookings: mockBookings, consultations: [], wishlist: [] });

const load = (): State => {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...seed(), ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return seed();
};

interface PlaceOrderInput {
  items: CartItem[];
  total: number;
  shippingAddress: string;
  measurementDate?: string;
  installationDate?: string;
  notes?: string;
}

interface Ctx extends State {
  login: (email: string, name?: string) => void;
  demoLogin: () => void;
  logout: () => void;
  updateProfile: (u: Partial<ShopUser>) => void;
  placeOrder: (o: PlaceOrderInput) => Order;
  cancelOrder: (id: string) => void;
  rescheduleBooking: (id: string, when: string) => void;
  cancelBooking: (id: string) => void;
  requestConsultation: (c: Omit<Consultation, "id" | "createdAt" | "status">) => void;
  toggleWishlist: (productId: string) => boolean;
  resetDemo: () => void;
}

const ShopContext = createContext<Ctx | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<State>(load);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* ignore */ }
  }, [state]);

  const login: Ctx["login"] = (email, name) =>
    setState((s) => ({
      ...s,
      user: { name: name || email.split("@")[0].replace(/^\w/, (c) => c.toUpperCase()), email, phone: "", memberSince: new Date().toISOString().slice(0, 10) },
    }));
  const demoLogin = () => setState((s) => ({ ...s, user: DEMO_USER }));
  const logout = () => setState((s) => ({ ...s, user: null }));
  const updateProfile: Ctx["updateProfile"] = (u) => setState((s) => (s.user ? { ...s, user: { ...s.user, ...u } } : s));

  const placeOrder: Ctx["placeOrder"] = (o) => {
    const year = new Date().getFullYear();
    const order: Order = {
      id: `ORD-${year}-${String(Math.floor(Math.random() * 900) + 100)}`,
      date: new Date().toISOString(),
      status: "processing",
      items: o.items,
      total: o.total,
      shippingAddress: o.shippingAddress,
      measurementRequested: !!o.measurementDate,
      installationRequested: !!o.installationDate,
    };
    const newBookings: LaborBooking[] = [];
    if (o.measurementDate) newBookings.push({ id: `BK-${Date.now()}-M`, orderId: order.id, serviceType: "measurement", scheduledDate: o.measurementDate, status: "pending", address: o.shippingAddress, notes: o.notes ?? "" });
    if (o.installationDate) newBookings.push({ id: `BK-${Date.now()}-I`, orderId: order.id, serviceType: "installation", scheduledDate: o.installationDate, status: "pending", address: o.shippingAddress, notes: o.notes ?? "" });
    setState((s) => ({ ...s, orders: [order, ...s.orders], bookings: [...newBookings, ...s.bookings] }));
    return order;
  };

  const cancelOrder = (id: string) =>
    setState((s) => ({
      ...s,
      orders: s.orders.map((o) => (o.id === id ? { ...o, status: "cancelled" } : o)),
      bookings: s.bookings.map((b) => (b.orderId === id && b.status !== "completed" ? { ...b, status: "cancelled" } : b)),
    }));
  const rescheduleBooking = (id: string, when: string) =>
    setState((s) => ({ ...s, bookings: s.bookings.map((b) => (b.id === id ? { ...b, scheduledDate: when, status: "pending" } : b)) }));
  const cancelBooking = (id: string) =>
    setState((s) => ({ ...s, bookings: s.bookings.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b)) }));
  const requestConsultation: Ctx["requestConsultation"] = (c) =>
    setState((s) => ({ ...s, consultations: [{ ...c, id: `CN-${Date.now()}`, createdAt: new Date().toISOString(), status: "requested" }, ...s.consultations] }));
  const toggleWishlist = (productId: string) => {
    const adding = !state.wishlist.includes(productId);
    setState((s) => ({ ...s, wishlist: adding ? [...s.wishlist, productId] : s.wishlist.filter((w) => w !== productId) }));
    return adding;
  };
  const resetDemo = () => setState((s) => ({ ...seed(), user: s.user }));

  return (
    <ShopContext.Provider value={{ ...state, login, demoLogin, logout, updateProfile, placeOrder, cancelOrder, rescheduleBooking, cancelBooking, requestConsultation, toggleWishlist, resetDemo }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
};
