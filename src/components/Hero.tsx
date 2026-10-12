import { useState } from "react";
import ConsultationDialog from "@/components/ConsultationDialog";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [consultOpen, setConsultOpen] = useState(false);
  return (
    <section className="relative overflow-hidden bg-gradient-subtle py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 text-sm font-medium">
              <Sparkles className="h-4 w-4 text-accent" />
              <span>Personalized Design at Your Doorstep</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-foreground">
              Transform Your Space Into a
              <span className="block mt-2 bg-gradient-hero bg-clip-text text-transparent">
                Beautiful Haven
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-lg">
              From floor mats to wallpapers, green décor to lighting – we bring professional installation and personalized design right to your home or office.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button size="lg" className="bg-gradient-hero hover:opacity-90 transition-opacity">
                  Explore Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-2" onClick={() => setConsultOpen(true)}>
                Book Free Consultation
              </Button>
              <ConsultationDialog open={consultOpen} onOpenChange={setConsultOpen} />
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8">
              <div>
                <div className="text-3xl font-bold text-foreground">500+</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">1000+</div>
                <div className="text-sm text-muted-foreground">Happy Homes</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">4.9★</div>
                <div className="text-sm text-muted-foreground">Rating</div>
              </div>
            </div>
          </div>

          {/* Right Image Grid */}
          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            <div className="space-y-4 lg:space-y-6 pt-8">
              <div className="aspect-square rounded-2xl bg-secondary shadow-card overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=600&fit=crop" 
                  alt="Modern living room décor"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="aspect-[4/3] rounded-2xl bg-secondary shadow-card overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=450&fit=crop" 
                  alt="Cozy home interior"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="space-y-4 lg:space-y-6">
              <div className="aspect-[4/3] rounded-2xl bg-secondary shadow-card overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=450&fit=crop" 
                  alt="Elegant home office"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="aspect-square rounded-2xl bg-secondary shadow-card overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?w=600&h=600&fit=crop" 
                  alt="Beautiful décor details"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
