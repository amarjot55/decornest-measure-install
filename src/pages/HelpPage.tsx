import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const PAGES: Record<string, { title: string; body: string[] }> = {
  about: { title: "About DecorNest", body: ["DecorNest is a one-stop shop for home and office décor: floor mats, wallpapers, artificial grass and lighting, sized to your space.", "Every order can include a free measurement visit and professional installation, so what you buy actually fits.", "This site is a product prototype running on demo data."] },
  story: { title: "Our story", body: ["Buying décor online usually fails at the last step: the size is wrong or nobody installs it. DecorNest bundles measurement and installation into checkout to fix that."] },
  careers: { title: "Careers", body: ["We're hiring installers and interior consultants. Write to hello@decornest.in."] },
  blog: { title: "Blog", body: ["Coming soon: choosing wallpaper for small rooms, caring for artificial grass, and lighting a home office."] },
  help: { title: "Help Center", body: ["Orders: track them from Dashboard → Orders.", "Visits: reschedule or cancel measurement and installation from Dashboard → Services.", "Need a person? Call +91 98765 43210, 9am–8pm."] },
  returns: { title: "Returns & refunds", body: ["Standard-size items: free returns within 7 days of delivery.", "Custom-sized items are made to your measurements and can't be returned unless they arrive damaged or wrong.", "Refunds reach your account in 5–7 working days."] },
  shipping: { title: "Shipping info", body: ["Free delivery on orders above ₹2,999 in metro cities. Standard delivery is 3–7 working days; custom sizes add 3–5 days."] },
  track: { title: "Track your order", body: ["Open Dashboard → Orders and choose Track Order to see each step."] },
  terms: { title: "Terms of Service", body: ["Prices include product cost; 18% GST and any installation fee are shown before you pay. Measurement visits are free."] },
  privacy: { title: "Privacy Policy", body: ["Demo mode: your details stay in this browser's local storage and are never sent to a server.", "In production we would share your address and phone only with the installer assigned to your order."] },
};

const HelpPage = () => {
  const { slug = "help" } = useParams();
  const page = PAGES[slug] ?? PAGES.help;
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 lg:px-8 py-12 max-w-3xl space-y-4">
        <h1 className="text-3xl font-bold">{page.title}</h1>
        {page.body.map((p) => <p key={p} className="text-muted-foreground">{p}</p>)}
        {slug === "track" && <Link to="/dashboard/orders"><Button>Go to my orders</Button></Link>}
      </main>
      <Footer />
    </div>
  );
};

export default HelpPage;
