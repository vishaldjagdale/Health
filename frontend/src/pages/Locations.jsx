import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation, Search } from "lucide-react";

const Locations = () => {
  const [loading, setLoading] = useState(false);

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLoading(false);
        const { latitude, longitude } = position.coords;
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=hospitals&query_place_id=${latitude},${longitude}`;
        window.open(googleMapsUrl, "_blank"); // Opens Google Maps in a new tab
      },
      (error) => {
        setLoading(false);
        let errorMessage = "Unable to retrieve location.";
        if (error.code === 1) errorMessage = "Permission denied. Enable location services.";
        if (error.code === 2) errorMessage = "Location unavailable. Try again.";
        if (error.code === 3) errorMessage = "Request timed out. Move to an open area.";
        alert(errorMessage);
      }
    );
  };

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
            <div className="flex flex-col gap-4">
              <Input
                placeholder="Search locations..."
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              
              {/* USE MY LOCATION BUTTON - FULLY CLICKABLE */}
              <Button 
                className="bg-primary hover:bg-primary/90 px-6 py-3 text-lg"
                onClick={handleUseMyLocation}
                disabled={loading}
              >
                {loading ? "Locating..." : (
                  <>
                    <Navigation className="w-5 h-5 mr-2" />
                    <span>Find Hospitals Near Me</span>
                  </>
                )}
              </Button>

              {/* MANUAL SEARCH BUTTON */}
              <Button className="bg-primary hover:bg-primary/90 px-6 py-3 text-lg">
                <Search className="w-5 h-5 mr-2" />
                <span>Search</span>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Locations;
