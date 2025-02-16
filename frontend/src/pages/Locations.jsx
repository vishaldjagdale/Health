import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation, Search } from "lucide-react";

const Locations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    requestUserLocation();
  }, []);

  // Request user location and fetch hospitals
  const requestUserLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLoading(false);
        openGoogleMaps(coords.latitude, coords.longitude);
      },
      (error) => {
        setLoading(false);
        handleLocationError(error);
      }
    );
  };

  // Handle manual search for hospitals
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert("Please enter a location to search.");
      return;
    }
    window.open(`https://www.google.com/maps/search/${encodeURIComponent(searchQuery)} hospitals`, "_blank");
  };

  // Open Google Maps with hospitals near given coordinates
  const openGoogleMaps = (lat, lon) => {
    const url = `https://www.google.com/maps/search/?api=1&query=hospitals&query_place_id=${lat},${lon}`;
    window.open(url, "_blank");
  };

  // Handle location errors
  const handleLocationError = (error) => {
    const errorMessages = {
      1: "Permission denied. Please enable location access.",
      2: "Location unavailable. Try again later.",
      3: "Request timed out. Move to an open area.",
    };
    setError(errorMessages[error.code] || "Failed to retrieve location.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24">
        <div className="max-w-3xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-4">Find Healthcare Locations</h1>
            <p className="text-white/80">Discover medical facilities near you</p>
          </div>

          {/* Search Box */}
          <div className="glass-morphism rounded-lg p-6">
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <div className="flex flex-col gap-4">
              <Input
                placeholder="Enter city, hospital name, or zip code..."
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row gap-4">
                <ActionButton
                  onClick={requestUserLocation}
                  loading={loading}
                  icon={<Navigation className="w-5 h-5 mr-2" />}
                  text="Find Hospitals Near Me"
                />

                <ActionButton
                  onClick={handleSearch}
                  icon={<Search className="w-5 h-5 mr-2" />}
                  text="Search"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Reusable Button Component
const ActionButton = ({ onClick, icon, text, loading }) => (
  <Button
    className="flex items-center justify-center bg-primary hover:bg-primary/90 px-6 py-3 text-lg w-full"
    onClick={onClick}
    disabled={loading}
  >
    {loading ? "Locating..." : (
      <>
        {icon}
        <span>{text}</span>
      </>
    )}
  </Button>
);

export default Locations;
