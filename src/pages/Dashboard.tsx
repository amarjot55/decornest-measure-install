import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Package, Calendar, Heart, Wallet, Check, Truck, Wrench, Ruler } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useShop } from "@/contexts/ShopContext";
import { useCart } from "@/contexts/CartContext";
import { mockProducts, Order } from "@/lib/mockData";
import ConsultationDialog from "@/components/ConsultationDialog";
import { toast } from "sonner";

const TABS = ["overview", "orders", "services", "wishlist", "profile"] as const;
type Tab = (typeof TABS)[number];
const STEPS: Order["status"][] = ["pending", "processing", "shipped", "delivered"];

const statusColor = (status: string) =>
  ({ delivered: "bg-green-600", completed: "bg-green-600", processing: "bg-blue-600", confirmed: "bg-blue-600", shipped: "bg-yellow-600", cancelled: "bg-red-600" } as Record<string, string>)[status] ?? "bg-gray-500";

const Dashboard = () => {
  const { tab: tabParam } = useParams();
  const navigate = useNavigate();
  const shop = useShop();
  const { addToCart } = useCart();
  const tab: Tab = (TABS as readonly string[]).includes(tabParam ?? "") ? (tabParam as Tab) : "overview";
  const [trackId, setTrackId] = useState<string | null>(null);
  const [rescheduleId, setRescheduleId] = useState<string | null>(null);
  const [newWhen, setNewWhen] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [consultOpen, setConsultOpen] = useState(false);
  const [draft, setDraft] = useState({ name: "", phone: "", email: "" });

  if (!shop.user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-3">Log in to see your dashboard</h1>
          <p className="text-muted-foreground mb-6">Orders, measurement and installation visits, and your wishlist live here.</p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => { shop.demoLogin(); toast.success("Logged in to the demo account"); }}>Try the demo account</Button>
            <Link to="/auth"><Button variant="outline">Log in / Sign up</Button></Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const active = shop.bookings.filter((b) => b.status !== "completed" && b.status !== "cancelled");
  const spent = shop.orders.filter((o) => o.status !== "cancelled").reduce((s, o) => s + o.total, 0);
  const wishProducts = mockProducts.filter((p) => shop.wishlist.includes(p.id));
  const tracked = shop.orders.find((o) => o.id === trackId);

  const OrderCard = ({ order }: { order: Order }) => (
    <div className="p-4 border rounded-lg">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-semibold">{order.id}</p>
          <p className="text-sm text-muted-foreground">{new Date(order.date).toLocaleDateString()} · {order.items.length} item(s)</p>
        </div>
        <Badge className={`${statusColor(order.status)} capitalize`}>{order.status}</Badge>
      </div>
      <div className="flex items-center gap-3 mb-3">
        {order.items.slice(0, 3).map((item, idx) => (
          <img key={idx} src={item.images[0]} alt={item.name} className="w-12 h-12 rounded object-cover" />
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-bold">₹{order.total.toLocaleString()}</p>
        <div className="flex gap-2">
          {(order.status === "pending" || order.status === "processing") && (
            <Button variant="ghost" size="sm" onClick={() => { shop.cancelOrder(order.id); toast.success(`${order.id} cancelled`); }}>Cancel</Button>
          )}
          <Button variant="outline" size="sm" onClick={() => setTrackId(order.id)}>Track Order</Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 lg:px-8 py-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Hi {shop.user.name.split(" ")[0]}</h1>
          <Button onClick={() => setConsultOpen(true)} className="bg-gradient-hero">Book free consultation</Button>
        </div>

        <Tabs value={tab} onValueChange={(v) => navigate(v === "overview" ? "/dashboard" : `/dashboard/${v}`)} className="mb-8">
          <TabsList className="flex-wrap h-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders ({shop.orders.length})</TabsTrigger>
            <TabsTrigger value="services">Services ({active.length})</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist ({shop.wishlist.length})</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>
        </Tabs>

        {tab === "overview" && (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { label: "Total orders", value: shop.orders.length, icon: Package, to: "orders" },
                { label: "Upcoming visits", value: active.length, icon: Calendar, to: "services" },
                { label: "Total spent", value: `₹${spent.toLocaleString()}`, icon: Wallet, to: "orders" },
                { label: "Wishlist", value: shop.wishlist.length, icon: Heart, to: "wishlist" },
              ].map((s) => (
                <button key={s.label} type="button" onClick={() => navigate(`/dashboard/${s.to}`)} className="text-left">
                  <Card className="hover:border-primary transition-colors">
                    <CardContent className="pt-6 flex items-center justify-between">
                      <div><p className="text-sm text-muted-foreground">{s.label}</p><p className="text-2xl font-bold">{s.value}</p></div>
                      <s.icon className="h-8 w-8 text-primary" />
                    </CardContent>
                  </Card>
                </button>
              ))}
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div><CardTitle>Recent orders</CardTitle><CardDescription>View and track your orders</CardDescription></div>
                    <Link to="/dashboard/orders"><Button variant="outline">View All</Button></Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {shop.orders.slice(0, 2).map((o) => <OrderCard key={o.id} order={o} />)}
                  {shop.orders.length === 0 && <p className="text-sm text-muted-foreground">No orders yet. <Link to="/products" className="text-primary">Start shopping</Link></p>}
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Upcoming services</CardTitle><CardDescription>Measurement and installation visits</CardDescription></CardHeader>
                <CardContent className="space-y-3">
                  {active.slice(0, 3).map((b) => (
                    <div key={b.id} className="p-3 border rounded-lg">
                      <p className="font-semibold capitalize flex items-center gap-2">{b.serviceType === "measurement" ? <Ruler className="h-4 w-4 text-primary" /> : <Wrench className="h-4 w-4 text-primary" />}{b.serviceType}</p>
                      <p className="text-sm text-muted-foreground">{new Date(b.scheduledDate).toLocaleString()}</p>
                    </div>
                  ))}
                  {active.length === 0 && <p className="text-sm text-muted-foreground text-center py-6">No upcoming services</p>}
                  {shop.consultations.length > 0 && <p className="text-sm">Design consultations requested: <b>{shop.consultations.length}</b></p>}
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {tab === "orders" && (
          <div className="space-y-4 max-w-3xl">
            {shop.orders.map((o) => <OrderCard key={o.id} order={o} />)}
            {shop.orders.length === 0 && <p className="text-muted-foreground">No orders yet.</p>}
          </div>
        )}

        {tab === "services" && (
          <div className="space-y-4 max-w-3xl">
            {shop.bookings.map((b) => (
              <Card key={b.id}>
                <CardContent className="pt-6 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2"><p className="font-semibold capitalize">{b.serviceType}</p><Badge className={`${statusColor(b.status)} capitalize`}>{b.status}</Badge></div>
                    <p className="text-sm text-muted-foreground">{new Date(b.scheduledDate).toLocaleString()} · Order {b.orderId}</p>
                    <p className="text-sm text-muted-foreground">{b.address}</p>
                    {b.notes && <p className="text-sm italic">“{b.notes}”</p>}
                  </div>
                  {b.status !== "completed" && b.status !== "cancelled" && (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => { setRescheduleId(b.id); setNewWhen(""); }}>Reschedule</Button>
                      <Button size="sm" variant="ghost" onClick={() => { shop.cancelBooking(b.id); toast.success("Visit cancelled"); }}>Cancel</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            {shop.consultations.map((c) => (
              <Card key={c.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2"><p className="font-semibold">Design consultation · {c.room.replace("-", " ")}</p><Badge variant="outline">{c.status}</Badge></div>
                  <p className="text-sm text-muted-foreground">{c.city} · preferred {c.preferredDate}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {tab === "wishlist" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishProducts.map((p) => (
              <Card key={p.id} className="overflow-hidden">
                <Link to={`/products/${p.id}`}><img src={p.images[0]} alt={p.name} className="w-full aspect-square object-cover" /></Link>
                <CardContent className="pt-4 space-y-2">
                  <p className="font-semibold">{p.name}</p>
                  <p className="font-bold">₹{p.basePrice.toLocaleString()}</p>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1" onClick={() => addToCart({ ...p, quantity: 1, totalPrice: p.basePrice })}>Add to cart</Button>
                    <Button size="sm" variant="outline" aria-label="Remove from wishlist" onClick={() => shop.toggleWishlist(p.id)}><Heart className="h-4 w-4 fill-current text-red-500" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {wishProducts.length === 0 && <p className="text-muted-foreground">Your wishlist is empty. Tap the heart on any product to save it.</p>}
          </div>
        )}

        {tab === "profile" && (
          <Card className="max-w-2xl">
            <CardHeader><CardTitle>Account information</CardTitle><CardDescription>Manage your profile</CardDescription></CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div><p className="text-sm font-semibold mb-1">Full name</p><p className="text-muted-foreground">{shop.user.name}</p></div>
                <div><p className="text-sm font-semibold mb-1">Email</p><p className="text-muted-foreground">{shop.user.email}</p></div>
                <div><p className="text-sm font-semibold mb-1">Phone</p><p className="text-muted-foreground">{shop.user.phone || "Not added"}</p></div>
                <div><p className="text-sm font-semibold mb-1">Member since</p><p className="text-muted-foreground">{new Date(shop.user.memberSince).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}</p></div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => { setDraft({ name: shop.user!.name, phone: shop.user!.phone, email: shop.user!.email }); setEditOpen(true); }}>Edit Profile</Button>
                <Button variant="outline" onClick={() => { shop.resetDemo(); toast.success("Demo data reset"); }}>Reset demo data</Button>
                <Button variant="destructive" onClick={() => { shop.logout(); navigate("/"); toast.success("Logged out"); }}>Log out</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <Dialog open={!!tracked} onOpenChange={(o) => !o && setTrackId(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Tracking {tracked?.id}</DialogTitle></DialogHeader>
          {tracked?.status === "cancelled" ? <p className="text-sm text-muted-foreground">This order was cancelled. Any payment is refunded in 5–7 working days.</p> : (
            <ol className="space-y-4">
              {STEPS.map((s, i) => {
                const done = tracked ? STEPS.indexOf(tracked.status) >= i : false;
                return (
                  <li key={s} className="flex items-center gap-3">
                    <span className={`h-8 w-8 rounded-full flex items-center justify-center ${done ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                      {done ? <Check className="h-4 w-4" /> : i === 2 ? <Truck className="h-4 w-4" /> : i + 1}
                    </span>
                    <span className={`capitalize ${done ? "font-semibold" : "text-muted-foreground"}`}>{s === "pending" ? "Order placed" : s}</span>
                  </li>
                );
              })}
            </ol>
          )}
          {tracked && <p className="text-sm text-muted-foreground">Delivering to {tracked.shippingAddress}</p>}
        </DialogContent>
      </Dialog>

      <Dialog open={!!rescheduleId} onOpenChange={(o) => !o && setRescheduleId(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Reschedule visit</DialogTitle></DialogHeader>
          <Label htmlFor="when">New date and time</Label>
          <Input id="when" type="datetime-local" value={newWhen} min={new Date().toISOString().slice(0, 16)} onChange={(e) => setNewWhen(e.target.value)} />
          <DialogFooter>
            <Button disabled={!newWhen} onClick={() => { shop.rescheduleBooking(rescheduleId!, newWhen); setRescheduleId(null); toast.success("Visit rescheduled. We'll confirm shortly."); }}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Edit profile</DialogTitle></DialogHeader>
          <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); shop.updateProfile(draft); setEditOpen(false); toast.success("Profile updated"); }}>
            <div><Label htmlFor="p-name">Full name</Label><Input id="p-name" required value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} /></div>
            <div><Label htmlFor="p-email">Email</Label><Input id="p-email" type="email" required value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} /></div>
            <div><Label htmlFor="p-phone">Phone</Label><Input id="p-phone" value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} /></div>
            <DialogFooter><Button type="submit">Save changes</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ConsultationDialog open={consultOpen} onOpenChange={setConsultOpen} />
      <Footer />
    </div>
  );
};

export default Dashboard;
