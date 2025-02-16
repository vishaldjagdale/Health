import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, MapPin, Star, Search, BadgeCheck, Zap, Clock } from "lucide-react";
import { motion } from "framer-motion";

const specialists = [
  {
    name: "Dr. Vishal Jagdale",
    specialty: "Chirphad Specialist",
    location: "Pune, India",
    rating: 4.9,
    experience: "12 years",
    availability: "Today 4 PM - 7 PM",
    consultationFee: "₹1500",
    isNew: true
  },
  {
    name: "Dr. Kisruu",
    specialty: "Mulvyad Specialist",
    location: "Latur, Maharashtra",
    rating: 4.9,
    experience: "8 years",
    availability: "Tomorrow 10 AM - 2 PM",
    consultationFee: "₹1200"
  },
  {
    name: "Dr. Russel",
    specialty: "Dang Specialist",
    location: "Dang, Maharashtra",
    rating: 4.7,
    experience: "15 years",
    availability: "Available next week",
    consultationFee: "₹2000"
  },
];

const Specialists = () => {
  return (
    <div className="min-h-screen bg-[#1C2529]">
      <Header />
      
      <main className="container mx-auto px-4 pt-16">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="relative inline-block mb-6">
              <div className="absolute -inset-2 bg-primary/20 rounded-full blur-lg" />
              <User className="w-14 h-14 text-primary relative z-10 animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent mb-3">
              Medical Specialists
            </h1>
            <p className="text-white/80 text-lg">Connect with certified healthcare experts</p>
          </motion.div>

          {/* Search Section */}
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="glass-morphism p-6 rounded-2xl shadow-xl mb-12 border border-white/10"
          >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <Input
                  placeholder="Search by specialty..."
                  className="pl-10 bg-white/5 border-white/10 placeholder:text-white/40"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <Input
                  placeholder="Location"
                  className="pl-10 bg-white/5 border-white/10 placeholder:text-white/40"
                />
              </div>
              <Button className="h-12 bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90">
                <Zap className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            {['All', 'Available Today', 'Top Rated', 'Video Consult'].map((filter, index) => (
              <Button
                key={index}
                variant="outline"
                className="rounded-full border-white/20 hover:bg-white/10 text-white"
              >
                {filter}
              </Button>
            ))}
          </div>

          {/* Specialists Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialists.map((specialist, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-primary/30 transition-all"
              >
                {/* New Badge */}
                {specialist.isNew && (
                  <div className="absolute top-4 right-4 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs">
                    New
                  </div>
                )}

                {/* Specialist Content */}
                <div className="space-y-4">
                  {/* Avatar & Basic Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-cyan-500 flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{specialist.name}</h3>
                      <p className="text-primary text-sm">{specialist.specialty}</p>
                    </div>
                  </div>

                  {/* Rating & Experience */}
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{specialist.rating}</span>
                    </div>
                    <div className="h-4 w-px bg-white/20" />
                    <span className="text-white/60">{specialist.experience} experience</span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-white/60">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{specialist.location}</span>
                  </div>

                  {/* Availability */}
                  <div className="flex items-center gap-2 text-sm text-white/80">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{specialist.availability}</span>
                  </div>

                  {/* Consultation Fee */}
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <p className="text-xs text-white/50">Consultation Fee</p>
                      <p className="text-lg font-semibold text-primary">{specialist.consultationFee}</p>
                    </div>
                    <Button className="bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90">
                      Book Now
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <div className="flex justify-center mt-12">
            {/* <Button variant="outline" className="border-white/20 text-white hover:bg-white/10"> */}
              {/* Load More Specialists */}
            {/* </Button> */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Specialists;