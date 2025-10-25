import { Ruler, Wrench, Palette, HeadphonesIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Ruler,
    title: "Free Measurement",
    description: "Professional on-site measurements to ensure perfect fit for your space"
  },
  {
    icon: Wrench,
    title: "Expert Installation",
    description: "Skilled labour partners for seamless setup and installation services"
  },
  {
    icon: Palette,
    title: "Design Consultation",
    description: "Personalized design advice from our interior décor experts"
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Round-the-clock customer service for all your queries and concerns"
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Why Choose DecorNest?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We don't just sell products – we deliver complete décor solutions
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="group text-center border-2 hover:border-primary transition-all duration-300 hover:shadow-elegant"
            >
              <CardContent className="pt-8 pb-6 px-6">
                <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-gradient-hero flex items-center justify-center group-hover:scale-110 transition-transform">
                  <service.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
