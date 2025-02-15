
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation, Search, Building2 } from "lucide-react";

const locations = [
  {
    name: "Central Medical Center",
    address: "123 Healthcare Ave",
    city: "New York, NY",
    distance: "0.8 miles",
    type: "Hospital",
    available: true,
  },
  {
    name: "Wellness Clinic",
    address: "456 Medical Blvd",
    city: "New York, NY",
    distance: "1.2 miles",
    type: "Clinic",
    available: true,
  },
  {
    name: "Community Health Center",
    address: "789 Care Street",
    city: "New York, NY",
    distance: "2.0 miles",
    type: "Health Center",
    available: false,
  },
];

const Locations = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-4">Find Healthcare Locations</h1>
            <p className="text-white/80">Discover medical facilities near you</p>
          </div>

          <div className="glass-morphism rounded-lg p-6 mb-8">
            <div className="flex gap-4">
              <Input
                placeholder="Search locations..."
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button className="bg-primary hover:bg-primary/90">
                <Navigation className="w-4 h-4 mr-2" />
                Use My Location
              </Button>
              <Button className="bg-primary hover:bg-primary/90">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {locations.map((location, index) => (
              <div
                key={index}
                className="glass-morphism rounded-lg p-6 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{location.name}</h3>
                      <p className="text-primary">{location.type}</p>
                      <div className="flex items-center gap-2 text-white/60 mt-1">
                        <MapPin className="w-4 h-4" />
                        <span>{location.address}, {location.city}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Navigation className="w-4 h-4 text-primary" />
                        <span className="text-white/80">{location.distance}</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    className="bg-primary hover:bg-primary/90"
                    disabled={!location.available}
                  >
                    {location.available ? "Get Directions" : "Temporarily Closed"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Locations;
