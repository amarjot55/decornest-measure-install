import { Flower2, Home, Lightbulb, Image } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    icon: Image,
    title: "Wall Décor",
    description: "Wallpapers, panels & art",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=300&fit=crop",
    gradient: "from-accent/20 to-accent/5"
  },
  {
    icon: Home,
    title: "Floor Décor",
    description: "Mats, carpets & tiles",
    image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=400&h=300&fit=crop",
    gradient: "from-primary/20 to-primary/5"
  },
  {
    icon: Flower2,
    title: "Green Décor",
    description: "Artificial grass & plants",
    image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=400&h=300&fit=crop",
    gradient: "from-green-500/20 to-green-500/5"
  },
  {
    icon: Lightbulb,
    title: "Lighting & More",
    description: "Lamps, LED & accessories",
    image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=300&fit=crop",
    gradient: "from-yellow-500/20 to-yellow-500/5"
  }
];

const Categories = () => {
  return (
    <section id="categories" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Explore Our Collections
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover curated décor solutions for every space in your home or office
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card 
              key={index}
              className="group cursor-pointer overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-elegant"
            >
              <CardContent className="p-0">
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} z-10`} />
                  <img 
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <div className="h-12 w-12 rounded-lg bg-background/90 backdrop-blur-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <category.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
