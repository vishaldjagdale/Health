import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import {
  Activity,
  User,
  MapPin,
  MessageSquare,
  ArrowRight,
  HelpCircle,
  AlarmClock,
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Activity,
      title: "Symptom Analysis",
      description: "Advanced symptom tracking and analysis for accurate predictions",
      link: "/symptoms", // ✅ Clickable
    },
    {
      icon: User,
      title: "Specialist Matching",
      description: "Connect with the right medical specialists for your condition",
      link: "/specialists", // ✅ Clickable
    },
    {
      icon: MapPin,
      title: "Location-Based",
      description: "Find healthcare providers in your area",
      link: "/locations", // ✅ Clickable
    },
    {
      icon: MessageSquare,
      title: "Feedback System",
      description: "Contribute to improving diagnosis accuracy",
    },
    {
      icon: HelpCircle,
      title: "WhatIf",
      description: "Search what will happen if you eat healthy or unhealthy from today",
      link: "/whatif", // ✅ Clickable
    },
    {
      icon: AlarmClock,
      title: "RemindMe",
      description: "We will remind you to take your medicine",
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 glass-morphism rounded-lg transition-all duration-300 animate-fadeIn 
                  ${feature.link ? "cursor-pointer hover:bg-white/10" : ""}`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => feature.link && navigate(feature.link)} // ✅ Makes the div clickable
              >
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/80">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
