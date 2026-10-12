import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, CreditCard, MapPin, Truck, Wrench } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/contexts/CartContext";
import { useShop } from "@/contexts/ShopContext";
import { toast } from "sonner";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const { user, placeOrder, login, updateProfile } = useShop();
  const [step, setStep] = useState(1);
  const [placed, setPlaced] = useState(false);
  
  // Shipping info
  const [fullName, setFullName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  
  // Services
  const [needMeasurement, setNeedMeasurement] = useState(false);
  const [needInstallation, setNeedInstallation] = useState(false);
  const [measurementDate, setMeasurementDate] = useState("");
  const [installationDate, setInstallationDate] = useState("");
  const [serviceNotes, setServiceNotes] = useState("");
  
  // Payment
  const [paymentMethod, setPaymentMethod] = useState("card");

  const tax = Math.round(cartTotal * 0.18);
  const serviceFee = (needMeasurement ? 0 : 0) + (needInstallation ? 500 : 0);
  const total = cartTotal + tax + serviceFee;

  const handlePlaceOrder = () => {
    // Validate
    if (!fullName || !email || !phone || !address || !city || !state || !pincode) {
      toast.error("Please fill all shipping details");
      return;
    }

    if (needMeasurement && !measurementDate) {
      toast.error("Please select measurement date");
      return;
    }

    if (needInstallation && !installationDate) {
      toast.error("Please select installation date");
      return;
    }

    if (!/^\d{6}$/.test(pincode.trim())) {
      toast.error("Please enter a valid 6-digit pincode");
      return;
    }

    // Guest checkout creates a local demo account from the shipping details.
    if (!user) { login(email, fullName); setTimeout(() => updateProfile({ phone }), 0); }
    const order = placeOrder({
      items: cart,
      total,
      shippingAddress: `${address}, ${city}, ${state} ${pincode}`,
      measurementDate: needMeasurement ? measurementDate : undefined,
      installationDate: needInstallation ? installationDate : undefined,
      notes: serviceNotes,
    });
    setPlaced(true);
    toast.success(`Order ${order.id} placed successfully!`);
    clearCart();
    navigate("/dashboard/orders");
  };

  useEffect(() => {
    if (cart.length === 0 && !placed) navigate("/cart");
  }, [cart.length, placed, navigate]);

  if (cart.length === 0) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 lg:px-8 py-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
          Checkout
        </h1>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step >= s ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
                }`}>
                  {step > s ? <Check className="h-5 w-5" /> : s}
                </div>
                {s < 3 && <div className={`w-16 h-0.5 ${step > s ? 'bg-primary' : 'bg-secondary'}`} />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Shipping */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Textarea
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Street address"
                      rows={3}
                    />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Mumbai"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="Maharashtra"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pincode">Pincode *</Label>
                      <Input
                        id="pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="400001"
                      />
                    </div>
                  </div>

                  <Button onClick={() => { if (!fullName || !email || !phone || !address || !city || !state || !pincode) { toast.error("Please fill all shipping details"); return; } setStep(2); }} size="lg" className="w-full mt-6">
                    Continue to Services
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Services */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wrench className="h-5 w-5" />
                    Additional Services
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-3 p-4 border rounded-lg">
                    <Checkbox
                      id="measurement"
                      checked={needMeasurement}
                      onCheckedChange={(checked) => setNeedMeasurement(checked as boolean)}
                    />
                    <div className="flex-1">
                      <Label htmlFor="measurement" className="cursor-pointer font-semibold">
                        Free Professional Measurement
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Our team will visit to take accurate measurements
                      </p>
                      {needMeasurement && (
                        <div className="mt-3">
                          <Label htmlFor="measurementDate">Preferred Date</Label>
                          <Input
                            id="measurementDate"
                            type="datetime-local"
                            value={measurementDate}
                            onChange={(e) => setMeasurementDate(e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                    <span className="font-bold text-primary">FREE</span>
                  </div>

                  <div className="flex items-start gap-3 p-4 border rounded-lg">
                    <Checkbox
                      id="installation"
                      checked={needInstallation}
                      onCheckedChange={(checked) => setNeedInstallation(checked as boolean)}
                    />
                    <div className="flex-1">
                      <Label htmlFor="installation" className="cursor-pointer font-semibold">
                        Professional Installation
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Expert installation by certified professionals
                      </p>
                      {needInstallation && (
                        <div className="mt-3">
                          <Label htmlFor="installationDate">Preferred Date</Label>
                          <Input
                            id="installationDate"
                            type="datetime-local"
                            value={installationDate}
                            onChange={(e) => setInstallationDate(e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                    <span className="font-bold">₹500</span>
                  </div>

                  <div>
                    <Label htmlFor="notes">Special Instructions (Optional)</Label>
                    <Textarea
                      id="notes"
                      value={serviceNotes}
                      onChange={(e) => setServiceNotes(e.target.value)}
                      placeholder="Any special requirements or instructions"
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button onClick={() => setStep(1)} variant="outline" size="lg" className="flex-1">
                      Back
                    </Button>
                    <Button onClick={() => setStep(3)} size="lg" className="flex-1">
                      Continue to Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="cursor-pointer flex-1">
                        <div className="font-semibold">Credit / Debit Card</div>
                        <div className="text-sm text-muted-foreground">Visa, Mastercard, Rupay</div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border rounded-lg">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="cursor-pointer flex-1">
                        <div className="font-semibold">UPI</div>
                        <div className="text-sm text-muted-foreground">Google Pay, PhonePe, Paytm</div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border rounded-lg">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="cursor-pointer flex-1">
                        <div className="font-semibold">Cash on Delivery</div>
                        <div className="text-sm text-muted-foreground">Pay when you receive</div>
                      </Label>
                    </div>
                  </RadioGroup>

                  <div className="flex gap-4 mt-6">
                    <Button onClick={() => setStep(2)} variant="outline" size="lg" className="flex-1">
                      Back
                    </Button>
                    <Button onClick={handlePlaceOrder} size="lg" className="flex-1 bg-gradient-hero">
                      Place Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.map((item) => (
                  <div key={`${item.id}-${JSON.stringify(item.customSize)}`} className="flex gap-3">
                    <img src={item.images[0]} alt={item.name} className="w-16 h-16 rounded object-cover" />
                    <div className="flex-1 text-sm">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-muted-foreground">Qty: {item.quantity}</p>
                      {item.customSize && (
                        <p className="text-xs text-muted-foreground">
                          {item.customSize.width}×{item.customSize.height}cm
                        </p>
                      )}
                    </div>
                    <p className="font-semibold">₹{(item.totalPrice * item.quantity).toLocaleString()}</p>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-primary font-semibold">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (18%)</span>
                    <span>₹{tax.toLocaleString()}</span>
                  </div>
                  {serviceFee > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Service Fee</span>
                      <span>₹{serviceFee.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
