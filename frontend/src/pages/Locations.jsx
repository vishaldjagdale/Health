import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation, Search, Loader2, Crosshair } from "lucide-react";
import { motion } from "framer-motion";

const Locations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // requestUserLocation();
  }, []);

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

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setError("Please enter a location to search");
      return;
    }
    window.open(`https://www.google.com/maps/search/${encodeURIComponent(searchQuery)} hospitals`, "_blank");
  };

  const openGoogleMaps = (lat, lon) => {
    const url = `https://www.google.com/maps/search/?api=1&query=hospitals&query_place_id=${lat},${lon}`;
    window.open(url, "_blank");
  };

  const handleLocationError = (error) => {
    const errorMessages = {
      1: "Permission denied. Please enable location access in browser settings",
      2: "Location unavailable. Try again later",
      3: "Request timed out. Move to an open area",
    };
    setError(errorMessages[error.code] || "Failed to retrieve location");
  };

  return (
    <div className="min-h-screen bg-[#1C2529]">
      <Header />
      
      <main className="container mx-auto px-4 pt-14">
        <div className="max-w-3xl mx-auto">
          {/* Animated Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="relative inline-block mb-6">
              <Crosshair className="absolute -top-4 -right-4 w-8 h-8 text-primary animate-pulse" />
              <MapPin className="w-14 h-14 text-primary mx-auto" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent mb-3">
              Medical Locator
            </h1>
            <p className="text-white/80 text-lg">Find trusted healthcare facilities near you</p>
          </motion.div>

          {/* Search Section */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-xl"
          >
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-900/30 rounded-xl flex items-center gap-3 border border-red-800/50">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Search Input */}
            <div className="relative mb-6">
              <Input
                placeholder="City, hospital name, or zip code..."
                className="pl-12 pr-4 h-14 bg-white/5 border-white/20 text-lg placeholder:text-white/40 focus-visible:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
            </div>

            {/* Action Buttons Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ActionButton
                onClick={requestUserLocation}
                loading={loading}
                icon={<Navigation className="w-5 h-5" />}
                text="Near Me"
                gradient="from-blue-500 to-cyan-500"
              />

              <ActionButton
                onClick={handleSearch}
                icon={<Search className="w-5 h-5" />}
                text="Search"
                gradient="from-purple-500 to-fuchsia-500"
              />
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-12 text-center">
            <FeatureItem
              icon={<MapPin className="w-8 h-8 text-primary" />}
              title="24/7 Access"
              text="Round-the-clock emergency services"
            />
            <FeatureItem
              icon={<Crosshair className="w-8 h-8 text-primary" />}
              title="Precision"
              text="Accurate location tracking"
            />
            <FeatureItem
              icon={<Navigation className="w-8 h-8 text-primary" />}
              title="Navigation"
              text="Direct maps integration"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

const ActionButton = ({ onClick, icon, text, loading, gradient }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    disabled={loading}
    className={`h-14 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center gap-2 text-lg font-medium transition-all`}
  >
    {loading ? (
      <Loader2 className="w-5 h-5 animate-spin" />
    ) : (
      <>
        {icon}
        {text}
      </>
    )}
  </motion.button>
);

const FeatureItem = ({ icon, title, text }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="p-6 bg-white/5 rounded-xl border border-white/10"
  >
    <div className="flex flex-col items-center gap-3">
      <div className="p-3 bg-white/10 rounded-full">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-white/60 text-sm">{text}</p>
    </div>
  </motion.div>
);

export default Locations;