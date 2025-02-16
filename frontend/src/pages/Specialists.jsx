import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, MapPin, Star, Search } from "lucide-react";

const specialists = [
  {
    name: "Dr. Vishal Jagdale",
    specialty: "Chirphad Specialist",
    location: "Pune, India",
    rating: 4.9,
    available: true,
  },
  {
    name: "Dr. Kisruu",
    specialty: "Mulvyad Specialist",
    location: "Latur , Maharashtra",
    rating: 4.9,
    available: true,
  },
  {
    name: "Dr. Russel",
    specialty: "Dang Specialist",
    location: "Dang , Maharashtra",
    rating: 4.7,
    available: false,
  },
];

const Specialists = () => {
  return (
    <div className="min-h-screen bg-[#1C2529]">
      <Header />
      <main className="container mx-auto px-4 pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <User className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-4">Find Specialists</h1>
            <p className="text-white/80">Connect with qualified medical specialists</p>
          </div>

          <div className="glass-morphism rounded-lg p-6 mb-8">
            <div className="flex gap-4">
              <Input
                placeholder="Search by specialty..."
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Input
                placeholder="Location"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button className="bg-primary hover:bg-primary/90">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {specialists.map((specialist, index) => (
              <div
                key={index}
                className="glass-morphism rounded-lg p-6 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{specialist.name}</h3>
                      <p className="text-primary">{specialist.specialty}</p>
                      <div className="flex items-center gap-2 text-white/60 mt-1">
                        <MapPin className="w-4 h-4" />
                        <span>{specialist.location}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-white/80">{specialist.rating}</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    className="bg-primary hover:bg-primary/90"
                    disabled={!specialist.available}
                  >
                    {specialist.available ? "Book Appointment" : "Not Available"}
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

export default Specialists;
