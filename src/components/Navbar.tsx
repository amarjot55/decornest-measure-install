import { useState } from "react";
import { ShoppingCart, Search, Menu, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { useShop } from "@/contexts/ShopContext";

const LINKS = [
  { to: "/products", label: "Products" },
  { to: "/#categories", label: "Categories" },
  { to: "/#services", label: "Services" },
  { to: "/dashboard", label: "Dashboard" },
];

const Navbar = () => {
  const { cartCount } = useCart();
  const { user } = useShop();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (to: string) => {
    setMenuOpen(false);
    if (to.startsWith("/#")) {
      navigate("/");
      setTimeout(() => document.getElementById(to.slice(2))?.scrollIntoView({ behavior: "smooth" }), 50);
    } else navigate(to);
  };

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/products?q=${encodeURIComponent(q.trim())}`);
    setSearchOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-hero">
              <span className="text-xl font-bold text-primary-foreground">D</span>
            </div>
            <span className="text-xl font-bold text-foreground">DecorNest</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {LINKS.map((l) => (
              <button key={l.to} type="button" onClick={() => go(l.to)} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                {l.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {searchOpen && (
              <form onSubmit={submitSearch} className="hidden md:block">
                <Input autoFocus placeholder="Search décor" value={q} onChange={(e) => setQ(e.target.value)} className="w-48" />
              </form>
            )}
            <Button variant="ghost" size="icon" className="hidden md:flex" aria-label="Search" onClick={() => setSearchOpen((v) => !v)}>
              <Search className="h-5 w-5" />
            </Button>
            <Link to={user ? "/dashboard/profile" : "/auth"} aria-label={user ? "Account" : "Log in"}>
              <Button variant="ghost" size="icon" tabIndex={-1}>
                {user ? <span className="h-7 w-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">{user.name.charAt(0)}</span> : <User className="h-5 w-5" />}
              </Button>
            </Link>
            <Link to="/cart" aria-label="Cart">
              <Button variant="ghost" size="icon" className="relative" tabIndex={-1}>
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-[10px] font-bold text-accent-foreground flex items-center justify-center">{cartCount}</span>
                )}
              </Button>
            </Link>
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu"><Menu className="h-5 w-5" /></Button>
              </SheetTrigger>
              <SheetContent side="right" className="space-y-4 pt-12">
                <form onSubmit={(e) => { submitSearch(e); setMenuOpen(false); }}>
                  <Input placeholder="Search décor" value={q} onChange={(e) => setQ(e.target.value)} />
                </form>
                {LINKS.map((l) => (
                  <button key={l.to} type="button" onClick={() => go(l.to)} className="block w-full text-left text-lg font-medium py-2">{l.label}</button>
                ))}
                <button type="button" onClick={() => go(user ? "/dashboard/profile" : "/auth")} className="block w-full text-left text-lg font-medium py-2">{user ? "My account" : "Log in"}</button>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
