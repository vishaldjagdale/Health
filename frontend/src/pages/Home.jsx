import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Activity, 
  User, 
  MapPin, 
  MessageSquare, 
  ArrowRight, 
  HelpCircle, 
  AlarmClock, 
  MessageCircle, 
  Camera,
  Stethoscope,
  ShieldCheck,
  HeartPulse
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: HeartPulse,
      title: "Symptom Analysis",
      description: "AI-powered symptom assessment with 95% clinical accuracy",
      path: "/symptoms",
    },
    {
      icon: Stethoscope,
      title: "Specialist Matching",
      description: "Connect with verified medical professionals",
      path: "/specialists",
    },
    {
      icon: MapPin,
      title: "Connect to Hospitals",
      description: "AI-curated healthcare providers near you",
      path: "/locations",
    },
    {
      icon: ShieldCheck,
      title: "Feedback",
      description: "Rate us and help us improve",
      path: "/feedback",
    },
    // {
    //   icon: HelpCircle,
    //   title: "Feedback",
    //   description: "Rate us and help us improve",
    //   path:"/WhatIf"
    // },
    {
      icon: AlarmClock,
      title: "Alert",
      description: "We will remind you for your health",
      path:"/RemindMe"
    },
    {
      icon: Camera,
      title:"Scan",
      description:"Know your skin",
      path:"/ImageUpload"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F12] to-[#1A1F24] overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-gradient-to-r from-primary/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-gradient-to-l from-cyan-500/15 to-transparent rounded-full blur-3xl" />
      </div>
      
      <Header />

      <main className="relative pt-32 pb-24">
        {/* Hero Section */}
        <section className="container mx-auto px-4 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 max-w-5xl mx-auto text-center"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center px-4 py-2 bg-primary/15 rounded-2xl backdrop-blur-sm border border-primary/20"
            >
              <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
              <span className="text-sm font-medium bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              Your Personal Health Assistant
              </span>
            </motion.span>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-5xl md:text-6xl font-bold text-white leading-tight"
            >
              Smart Health Diagnosis <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">Medical</span>
              <br />
              Intelligence System
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed"
            >
              Advanced neural networks combined with medical expertise to deliver precise health insights and personalized care solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center gap-4 mt-12"
            >
              <Button
                size="xl"
                onClick={() => navigate("/symptoms")}
                className="group relative overflow-hidden bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 px-10 py-7 rounded-2xl shadow-2xl shadow-primary/20 hover:shadow-primary/30"
              >
                <span className="text-lg font-semibold">Check Symptoms</span>
                <ArrowRight className="ml-3 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>

              <Button
                size="xl"
                variant="ghost"
                className="border border-white/20 bg-white/5 hover:bg-white/10 px-10 py-7 rounded-2xl backdrop-blur-lg text-white hover:text-white/90"
              >
                <button  onClick={() => navigate("/register")} >Explore more</button>
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 lg:px-8 mt-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(feature.path)}
                className="group relative p-6 rounded-2xl bg-gradient-to-b from-white/5 to-white/2 border border-white/10 hover:border-white/20 cursor-pointer transition-all hover:-translate-y-2 shadow-xl hover:shadow-2xl backdrop-blur-lg"
              >
                <div className="relative">
                  <div className="p-3 w-max rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 mb-6">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-white/70 leading-relaxed">{feature.description}</p>
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-4" />
                    <div className="flex items-center text-primary font-medium">
                      <span>Learn More</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/10 rounded-full animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </main>

      {/* Chat Assistant FAB */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 right-8"
      >
        <Button
          size="lg"
          className="rounded-full px-6 py-5 bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 shadow-2xl shadow-primary/30 backdrop-blur-lg"
          onClick={() => navigate("/chat")}
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          HealthNodes Assistant
        </Button>
      </motion.div>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-24 py-8">
        <div className="container mx-auto px-4 lg:px-8 text-center text-sm text-white/60">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="/contact" className="hover:text-white transition-colors">Contact Us</a>
          </div>
          <p>© {new Date().getFullYear()} HealthNodes. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;