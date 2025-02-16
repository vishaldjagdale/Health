import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "react-day-picker";
import { Activity, User, MapPin, MessageSquare, ArrowRight, HelpCircle, AlarmClock ,  MessageCircle, Camera
} from "lucide-react";
// import { icon } from "leaflet";
// import { title } from "process";


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
      title: "Feedback",
      description: "Contribute to improving diagnosis accuracy",
      path: "/feedback",
    },
    {
      icon: HelpCircle,
      title: "What-If",
      
      description: "Explore health impacts of your lifestyle choices",
      path:"/WhatIf"
    },
    {
      icon: AlarmClock,
      title: "RemindMe",
      description: "Set reminders for your medications",
      path:"/RemindMe"
    },
    {
      icon: Camera,
      title:"ImageUpload",
      description:"Upload your skin image",
      path:"/ImageUpload"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1C2529] to-[#121618] overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')] opacity-30" />
      <Header />

      <main className="relative pt-24">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="space-y-6 max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium tracking-wide animate-fadeIn">
              Your Personal Health Assistant
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fadeIn leading-tight">
              Smart Health Diagnosis <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#c4b5fd]">Assistant</span>
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto animate-fadeIn leading-relaxed">
              Track your symptoms, get preliminary diagnoses, and connect with specialists near you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fadeIn">
              <Button
                size="lg"
                onClick={() => navigate("/symptoms")}
                className="bg-primary hover:bg-primary/90 text-white group px-8 py-6 text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 transition-all duration-300"
              >
                Check Symptoms <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/register")}
                className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg backdrop-blur-sm"
              >
                Create Account
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                onClick={() => navigate(feature.path)}
                className="p-6 glass-morphism rounded-lg hover:bg-white/20 transition-all duration-300 cursor-pointer animate-fadeIn"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="flex flex-col items-start">
                  <div className="rounded-2xl p-3 bg-primary/10 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#121618] to-transparent" />
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
