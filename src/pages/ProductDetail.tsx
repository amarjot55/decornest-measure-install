import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, ShoppingCart, Ruler, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockProducts } from "@/lib/mockData";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = mockProducts.find(p => p.id === id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [customWidth, setCustomWidth] = useState("");
  const [customHeight, setCustomHeight] = useState("");
  const [useCustomSize, setUseCustomSize] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const calculateCustomPrice = () => {
    if (!useCustomSize || !customWidth || !customHeight) return product.basePrice;
    
    const width = parseFloat(customWidth);
    const height = parseFloat(customHeight);
    
    if (isNaN(width) || isNaN(height)) return product.basePrice;
    
    // Price calculation: base price + (area in sq.cm * price per sq.cm)
    const area = width * height;
    const basePricePerSqCm = product.basePrice / 10000; // Assuming base is for 100x100
    return Math.round(product.basePrice + (area * basePricePerSqCm * 0.01));
  };

  const finalPrice = calculateCustomPrice();

  const handleAddToCart = () => {
    const customSize = useCustomSize && customWidth && customHeight
      ? { width: parseFloat(customWidth), height: parseFloat(customHeight) }
      : undefined;

    addToCart({
      ...product,
      quantity,
      customSize,
      totalPrice: finalPrice
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 lg:px-8 py-8">
        <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-secondary">
              <img 
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              {product.featured && (
                <Badge className="mb-2 bg-accent">Featured Product</Badge>
              )}
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-muted-foreground">({product.reviews} reviews)</span>
                </div>
                <Badge variant="outline">{product.stockQuantity} in stock</Badge>
              </div>
            </div>

            <div className="text-3xl font-bold text-foreground">
              ₹{finalPrice.toLocaleString()}
              {useCustomSize && customWidth && customHeight && (
                <span className="text-sm text-muted-foreground ml-2">
                  ({customWidth}cm × {customHeight}cm)
                </span>
              )}
            </div>

            <p className="text-muted-foreground">{product.description}</p>

            {/* Custom Sizing */}
            {product.customSizingEnabled && (
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Ruler className="h-5 w-5 text-primary" />
                      <span className="font-semibold">Custom Sizing Available</span>
                    </div>
                    <Button
                      variant={useCustomSize ? "default" : "outline"}
                      size="sm"
                      onClick={() => setUseCustomSize(!useCustomSize)}
                    >
                      {useCustomSize ? <Check className="h-4 w-4 mr-1" /> : null}
                      {useCustomSize ? "Enabled" : "Enable"}
                    </Button>
                  </div>

                  {useCustomSize && (
                    <div className="grid grid-cols-2 gap-4 animate-fade-in">
                      <div>
                        <Label htmlFor="width">Width (cm)</Label>
                        <Input
                          id="width"
                          type="number"
                          placeholder={`${product.minSize?.width}-${product.maxSize?.width}`}
                          value={customWidth}
                          onChange={(e) => setCustomWidth(e.target.value)}
                          min={product.minSize?.width}
                          max={product.maxSize?.width}
                        />
                      </div>
                      <div>
                        <Label htmlFor="height">Height (cm)</Label>
                        <Input
                          id="height"
                          type="number"
                          placeholder={`${product.minSize?.height}-${product.maxSize?.height}`}
                          value={customHeight}
                          onChange={(e) => setCustomHeight(e.target.value)}
                          min={product.minSize?.height}
                          max={product.maxSize?.height}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground col-span-2">
                        Min: {product.minSize?.width}×{product.minSize?.height}cm | 
                        Max: {product.maxSize?.width}×{product.maxSize?.height}cm
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Attributes */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Materials</h3>
                <div className="flex flex-wrap gap-2">
                  {product.materials.map(mat => (
                    <Badge key={mat} variant="secondary">{mat}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(color => (
                    <Badge key={color} variant="secondary">{color}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Styles</h3>
                <div className="flex flex-wrap gap-2">
                  {product.styles.map(style => (
                    <Badge key={style} variant="secondary">{style}</Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <Label>Quantity</Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                size="lg"
                className="flex-1 bg-gradient-hero hover:opacity-90"
                onClick={handleBuyNow}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Buy Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
              <Button size="lg" variant="outline" className="px-6">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <dl className="space-y-4">
                  <div className="flex justify-between">
                    <dt className="font-semibold">Category</dt>
                    <dd className="text-muted-foreground">{product.category}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-semibold">Materials</dt>
                    <dd className="text-muted-foreground">{product.materials.join(", ")}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-semibold">Available Colors</dt>
                    <dd className="text-muted-foreground">{product.colors.join(", ")}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-semibold">Stock</dt>
                    <dd className="text-muted-foreground">{product.stockQuantity} units</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">Reviews feature coming soon!</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
