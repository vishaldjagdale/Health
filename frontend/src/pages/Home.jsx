import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Activity, User, MapPin, MessageSquare, ArrowRight, HelpCircle, AlarmClock   MessageCircle,
} from "lucide-react";


const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Activity,
      title: "Symptom Analysis",
      description: "Advanced symptom tracking and analysis for accurate predictions",
      path: "/symptoms",
    },
    {
      icon: User,
      title: "Specialist Matching",
      description: "Connect with the right medical specialists for your condition",
      path: "/specialists",
    },
    {
      icon: MapPin,
      title: "Location-Based",
      description: "Find healthcare providers in your area",
      path: "/locations",
    },
    {
      icon: MessageSquare,
      title: "Feedback System",
      description: "Contribute to improving diagnosis accuracy",
      path: "/feedback",
    },
    {
      icon: HelpCircle,
      title: "WhatIf",
      description: "Explore health impacts of your lifestyle choices",
    },
    {
      icon: AlarmClock,
      title: "RemindMe",
      description: "Set reminders for your medications",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fadeIn">
            Smart Health Diagnosis Assistant
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto animate-fadeIn">
            Track your symptoms, get preliminary diagnoses, and connect with specialists near you.
          </p>
          <div className="flex justify-center gap-4 animate-fadeIn">
            <Button
              size="lg"
              onClick={() => navigate("/symptoms")}
              className="bg-primary hover:bg-primary/90 text-white group"
            >
              Check Symptoms
              <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/register")}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Create Account
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 glass-morphism rounded-lg hover:bg-white/10 transition-all duration-300 animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/80">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Chatbot Button */}
      <div className="fixed bottom-6 right-6">
        <Button
          size="lg"
          className="bg-primary text-white flex items-center gap-2 px-5 py-3 rounded-full shadow-lg hover:bg-primary/90"
          onClick={() => navigate("/chat")} // ✅ Navigating to Chatbot page
        >
          <MessageCircle className="h-5 w-5" />
          Chat with Assistant
        </Button>
      </div>
    </div>
  );
};

export default Index;
