import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Activity, Search, PlusCircle } from "lucide-react";

const Symptoms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Activity className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-4">Check Your Symptoms</h1>
            <p className="text-white/80">Track your symptoms and get preliminary diagnoses</p>
          </div>

          <div className="space-y-6">
            <div className="glass-morphism rounded-lg p-6">
              <div className="flex gap-4 mb-6">
                <Input
                  placeholder="Search symptoms..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
                <Button className="bg-primary hover:bg-primary/90">
                  {/* <Search className="w-4 h-4 mr-2" /> */}
                  Check 
                </Button>
              </div>

              <div className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-white border-white/20 hover:bg-white/10"
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Symptom
                </Button>
              </div>
            </div>

            <div className="glass-morphism rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Common Symptoms</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["Headache", "Fever", "Cough", "Fatigue", "Nausea", "Chest Pain"].map((symptom) => (
                  <Button
                    key={symptom}
                    variant="outline"
                    className="justify-start text-white border-white/20 hover:bg-white/10"
                  >
                    {symptom}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Symptoms;
