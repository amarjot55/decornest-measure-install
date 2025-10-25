import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const products = [
  {
    id: 1,
    name: "Luxury Persian Floor Mat",
    price: 2499,
    originalPrice: 3499,
    image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=500&h=500&fit=crop",
    badge: "Best Seller",
    rating: 4.8
  },
  {
    id: 2,
    name: "Modern Geometric Wallpaper",
    price: 1899,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&h=500&fit=crop",
    badge: "New",
    rating: 4.9
  },
  {
    id: 3,
    name: "Premium Artificial Grass",
    price: 3299,
    originalPrice: 4199,
    image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=500&h=500&fit=crop",
    badge: "Eco-Friendly",
    rating: 4.7
  },
  {
    id: 4,
    name: "Designer LED Wall Lamp",
    price: 1599,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=500&h=500&fit=crop",
    badge: "Trending",
    rating: 4.6
  }
];

const FeaturedProducts = () => {
  return (
    <section id="products" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Featured Products
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Handpicked items to transform your space
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-card">
              <Link to={`/products/${product.id}`}>
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <Badge className="absolute top-3 left-3 bg-accent hover:bg-accent">
                      {product.badge}
                    </Badge>
                    <Button 
                      size="icon" 
                      variant="secondary"
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity rounded-full shadow-lg"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-3 p-4">
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-yellow-500">★</span>
                    <span className="font-medium">{product.rating}</span>
                    <span className="text-muted-foreground">(120)</span>
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 w-full">
                    <span className="text-xl font-bold text-foreground">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
                    )}
                  </div>
                  <Button className="w-full bg-gradient-hero hover:opacity-90 transition-opacity">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </CardFooter>
              </Link>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/products">
            <Button variant="outline" size="lg" className="border-2">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
