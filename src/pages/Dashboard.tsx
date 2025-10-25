import { Package, Calendar, User, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { mockOrders, mockBookings } from "@/lib/mockData";

const Dashboard = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
      case "completed":
        return "bg-green-500";
      case "processing":
      case "confirmed":
        return "bg-blue-500";
      case "shipped":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 lg:px-8 py-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
          My Dashboard
        </h1>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold">{mockOrders.length}</p>
                </div>
                <Package className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Bookings</p>
                  <p className="text-2xl font-bold">
                    {mockBookings.filter(b => b.status !== "completed" && b.status !== "cancelled").length}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold">
                    ₹{mockOrders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}
                  </p>
                </div>
                <User className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Account</p>
                  <p className="text-2xl font-bold">Gold</p>
                </div>
                <Settings className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>View and track your orders</CardDescription>
                </div>
                <Link to="/dashboard/orders">
                  <Button variant="outline">View All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <div key={order.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold">{order.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      {order.items.slice(0, 3).map((item, idx) => (
                        <img
                          key={idx}
                          src={item.images[0]}
                          alt={item.name}
                          className="w-12 h-12 rounded object-cover"
                        />
                      ))}
                      {order.items.length > 3 && (
                        <div className="w-12 h-12 rounded bg-secondary flex items-center justify-center text-sm font-semibold">
                          +{order.items.length - 3}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-bold">₹{order.total.toLocaleString()}</p>
                      <Button variant="outline" size="sm">Track Order</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Services</CardTitle>
              <CardDescription>Your scheduled appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockBookings
                  .filter(b => b.status !== "completed" && b.status !== "cancelled")
                  .map((booking) => (
                    <div key={booking.id} className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <p className="font-semibold capitalize">{booking.serviceType}</p>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {new Date(booking.scheduledDate).toLocaleString()}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {booking.status}
                      </Badge>
                    </div>
                  ))}
                
                {mockBookings.filter(b => b.status !== "completed" && b.status !== "cancelled").length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No upcoming services
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Manage your profile and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold mb-1">Full Name</p>
                <p className="text-muted-foreground">John Doe</p>
              </div>
              <div>
                <p className="text-sm font-semibold mb-1">Email</p>
                <p className="text-muted-foreground">john@example.com</p>
              </div>
              <div>
                <p className="text-sm font-semibold mb-1">Phone</p>
                <p className="text-muted-foreground">+91 98765 43210</p>
              </div>
              <div>
                <p className="text-sm font-semibold mb-1">Member Since</p>
                <p className="text-muted-foreground">January 2025</p>
              </div>
            </div>
            <Separator className="my-6" />
            <Button variant="outline">Edit Profile</Button>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
