import { useState } from "react";
import { Link } from "react-router-dom";
import { Filter, SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockProducts, categories } from "@/lib/mockData";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(true);

  // Get unique colors and styles
  const allColors = Array.from(new Set(mockProducts.flatMap(p => p.colors)));
  const allStyles = Array.from(new Set(mockProducts.flatMap(p => p.styles)));

  // Filter products
  let filteredProducts = mockProducts.filter(p => 
    selectedCategory === "all" || p.category === selectedCategory
  );

  if (selectedColors.length > 0) {
    filteredProducts = filteredProducts.filter(p => 
      p.colors.some(c => selectedColors.includes(c))
    );
  }

  if (selectedStyles.length > 0) {
    filteredProducts = filteredProducts.filter(p => 
      p.styles.some(s => selectedStyles.includes(s))
    );
  }

  // Sort products
  switch (sortBy) {
    case "price-low":
      filteredProducts.sort((a, b) => a.basePrice - b.basePrice);
      break;
    case "price-high":
      filteredProducts.sort((a, b) => b.basePrice - a.basePrice);
      break;
    case "rating":
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    case "featured":
    default:
      filteredProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const toggleStyle = (style: string) => {
    setSelectedStyles(prev => 
      prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Our Products
          </h1>
          <p className="text-muted-foreground">
            Discover our complete collection of home and office décor
          </p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-64 flex-shrink-0 space-y-6`}>
            <Card>
              <CardContent className="pt-6 space-y-6">
                {/* Categories */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.map(cat => (
                      <Button
                        key={cat.id}
                        variant={selectedCategory === cat.id ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(cat.id)}
                      >
                        {cat.name}
                        <span className="ml-auto text-xs text-muted-foreground">
                          ({cat.count})
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Colors</h3>
                  <div className="space-y-2">
                    {allColors.map(color => (
                      <div key={color} className="flex items-center gap-2">
                        <Checkbox
                          id={`color-${color}`}
                          checked={selectedColors.includes(color)}
                          onCheckedChange={() => toggleColor(color)}
                        />
                        <Label htmlFor={`color-${color}`} className="cursor-pointer">
                          {color}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Styles */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Styles</h3>
                  <div className="space-y-2">
                    {allStyles.map(style => (
                      <div key={style} className="flex items-center gap-2">
                        <Checkbox
                          id={`style-${style}`}
                          checked={selectedStyles.includes(style)}
                          onCheckedChange={() => toggleStyle(style)}
                        />
                        <Label htmlFor={`style-${style}`} className="cursor-pointer">
                          {style}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                {(selectedColors.length > 0 || selectedStyles.length > 0 || selectedCategory !== "all") && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSelectedCategory("all");
                      setSelectedColors([]);
                      setSelectedStyles([]);
                    }}
                  >
                    Clear All Filters
                  </Button>
                )}
              </CardContent>
            </Card>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <p className="text-sm text-muted-foreground">
                  {filteredProducts.length} products found
                </p>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="group overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-card">
                  <Link to={`/products/${product.id}`}>
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden">
                        <img 
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {product.featured && (
                          <Badge className="absolute top-3 left-3 bg-accent hover:bg-accent">
                            Featured
                          </Badge>
                        )}
                        {product.customSizingEnabled && (
                          <Badge className="absolute top-3 right-3 bg-primary hover:bg-primary">
                            Custom Size
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start gap-3 p-4">
                      <div className="flex items-center gap-1 text-sm">
                        <span className="text-yellow-500">★</span>
                        <span className="font-medium">{product.rating}</span>
                        <span className="text-muted-foreground">({product.reviews})</span>
                      </div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 w-full">
                        <span className="text-xl font-bold text-foreground">
                          ₹{product.basePrice.toLocaleString()}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {product.stockQuantity} in stock
                        </span>
                      </div>
                    </CardFooter>
                  </Link>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">
                  No products found matching your filters
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedColors([]);
                    setSelectedStyles([]);
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
