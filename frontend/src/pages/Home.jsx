import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Background images for rotation
  const backgroundImages = [
    "https://images.unsplash.com/photo-1527613426441-4da17471b66d",
    "https://images.unsplash.com/photo-1538108149393-fbbd81895907",
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118",
    "https://images.unsplash.com/photo-1516549655169-df83a0774514",
  ];

  // Rotate images every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Features list with corrected paths
  const features = [
    {
      title: "Disease Predictor",
      description: "Check diagnosis by entering your symptoms.",
      icon: "🔬",
      path: "/symptoms",
    },
    {
      title: "Patient Care",
      description:
        "Personalized treatment plans focused on individual patient needs.",
      icon: "👥",
      path: "/specialists",
    },
    {
      title: "Find hospitals",
      description: "Search nearby hospitals and clinics for immediate care.",
      icon: "🚑",
      path: "/locations",
    },
    {
      title: "Feedback",
      description: "Provide feedback to help us improve our services.",
      icon: "💬",
      path: "/feedback",
    },
    {
      title: "Reminder",
      description:
        "Set reminders for your medication ",
      icon: "⏰",
      path: "/remindme",
    },
    // {
    //   title: "Modern Facilities",
    //   description:
    //     "Contemporary medical facilities equipped with the latest technology.",
    //   icon: "🏥",
    //   path: "/news",
    // },
    {
      title: "Get News",
      description:
        "Get realtime health releted news",
      icon: "📢",
      path: "/news",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Background Image Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <img
            src={backgroundImages[currentImageIndex]}
            alt="Medical facility"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 backdrop-blur-[2px]" />
        </motion.div>
      </AnimatePresence>

      {/* Glassmorphism Effects */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-200/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-emerald-200/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <Header className="relative z-20" />

      <main className="relative pt-32 pb-24 z-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 max-w-5xl mx-auto text-center"
          >
            <motion.span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 text-white backdrop-blur-lg border border-white/20">
              Transforming Healthcare
            </motion.span>
            <motion.h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Modern Healthcare Solutions for a Better Tomorrow
            </motion.h1>
            <motion.p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Experience healthcare reimagined with cutting-edge technology and
              compassionate care.
            </motion.p>
            <motion.div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300"
                onClick={() => navigate("/symptoms")}
              >
                Disease Predictor
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 transition-all duration-300"
              >
                Explore More
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
                onClick={() => navigate(feature.path)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-white/20 cursor-pointer transition-all duration-500 hover:-translate-y-1"
              >
                <div className="relative z-10">
                  <span className="text-3xl mb-4 block">{feature.icon}</span>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-20 border-t border-white/10 mt-24 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© 2025 Healthcare Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
