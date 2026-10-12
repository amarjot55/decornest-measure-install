import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-hero">
                <span className="text-xl font-bold text-primary-foreground">D</span>
              </div>
              <span className="text-xl font-bold">DecorNest</span>
            </div>
            <p className="text-sm text-background/70 mb-4">
              Transform your space into a beautiful haven with our premium décor solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/help/about" className="hover:text-background transition-colors">About Us</Link></li>
              <li><Link to="/help/story" className="hover:text-background transition-colors">Our Story</Link></li>
              <li><Link to="/help/careers" className="hover:text-background transition-colors">Careers</Link></li>
              <li><Link to="/help/blog" className="hover:text-background transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/help/help" className="hover:text-background transition-colors">Help Center</Link></li>
              <li><Link to="/help/returns" className="hover:text-background transition-colors">Returns & Refunds</Link></li>
              <li><Link to="/help/shipping" className="hover:text-background transition-colors">Shipping Info</Link></li>
              <li><Link to="/help/track" className="hover:text-background transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4">Stay Connected</h3>
            <div className="space-y-3 text-sm text-background/70 mb-4">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>hello@decornest.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
            <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); const f = e.currentTarget; const v = (f.elements.namedItem("email") as HTMLInputElement).value; if (!/\S+@\S+\.\S+/.test(v)) { toast.error("Enter a valid email"); return; } toast.success("Subscribed! Watch your inbox for décor ideas."); f.reset(); }}>
              <Input 
                name="email"
                placeholder="Your email" 
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
              />
              <Button type="submit" variant="secondary">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="border-t border-background/20 pt-6 text-center text-sm text-background/70">
          <p>&copy; 2025 DecorNest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
