import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useShop } from "@/contexts/ShopContext";
import { toast } from "sonner";

export default function ConsultationDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const { user, requestConsultation } = useShop();
  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [city, setCity] = useState("");
  const [room, setRoom] = useState("living-room");
  const [preferredDate, setPreferredDate] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[+\d][\d\s-]{8,}$/.test(phone.trim())) {
      toast.error("Please enter a valid phone number");
      return;
    }
    requestConsultation({ name: name.trim(), phone: phone.trim(), city: city.trim(), room, preferredDate });
    toast.success("Consultation requested! A designer will call you within 24 hours.");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Book a free design consultation</DialogTitle>
          <DialogDescription>A designer visits, measures the space and suggests options. No charge.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-3">
          <div><Label htmlFor="c-name">Name</Label><Input id="c-name" required value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div><Label htmlFor="c-phone">Phone</Label><Input id="c-phone" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" /></div>
          <div><Label htmlFor="c-city">City</Label><Input id="c-city" required value={city} onChange={(e) => setCity(e.target.value)} /></div>
          <div>
            <Label>Space</Label>
            <Select value={room} onValueChange={setRoom}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="living-room">Living room</SelectItem>
                <SelectItem value="bedroom">Bedroom</SelectItem>
                <SelectItem value="office">Office</SelectItem>
                <SelectItem value="balcony">Balcony / terrace</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div><Label htmlFor="c-date">Preferred date</Label><Input id="c-date" type="date" required value={preferredDate} min={new Date().toISOString().slice(0, 10)} onChange={(e) => setPreferredDate(e.target.value)} /></div>
          <DialogFooter><Button type="submit" className="w-full bg-gradient-hero">Request consultation</Button></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
