import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
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
            <div className="flex gap-2">
              <Button size="icon" variant="secondary" className="rounded-full">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="secondary" className="rounded-full">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="secondary" className="rounded-full">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="#" className="hover:text-background transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="#" className="hover:text-background transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Track Order</a></li>
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
            <div className="flex gap-2">
              <Input 
                placeholder="Your email" 
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
              />
              <Button variant="secondary">Subscribe</Button>
            </div>
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
