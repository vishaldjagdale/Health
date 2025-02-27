import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { motion } from "framer-motion";
import {
  Stethoscope,
  MapPin,
  ShieldCheck,
  AlarmClock,
  Camera,
  FileText,
  ArrowRight,
  MessageCircle,
  Newspaper,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(); // Initialize translation function

  const features = [
    {
      icon: FileText,
      title: t("report"),
      description: t("report_description"),
      path: "/report-analyzer",
    },
    {
      icon: Stethoscope,
      title: t("specialist"),
      description: t("specialist_description"),
      path: "/doctors",
    },
    {
      icon: MapPin,
      title: t("hospitals"),
      description: t("hospitals_description"),
      path: "/locations",
    },
    {
      icon: ShieldCheck,
      title: t("feedback"),
      description: t("feedback_description"),
      path: "/feedback",
    },
    {
      icon: AlarmClock,
      title: t("reminders"),
      description: t("reminders_description"),
      path: "/remainder",
    },
    {
      icon: Camera,
      title: t("skin_scanner"),
      description: t("skin_scanner_description"),
      path: "/ImageUpload",
    },
    {
      icon: MessageCircle,
      title:t("habbit_tracker"),
      description: t("habbit_tracker_description"),
      path: "/healthtracker",
    },

    {
      title: "Health News",
      description:
        "Contemporary medical facilities equipped with the latest technology.",
      icon: Newspaper,
      path: "/news-feed",
    },
  ];

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/health-bg.jpg')" }}
      />

      <Header />

      <main className="relative pt-32 pb-24 container mx-auto px-4 lg:px-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            {t("hero_title")} <span className="text-cyan-400">{t("hero_subtitle")}</span>
          </h1>
          <p className="text-lg text-white/80 mt-4">{t("hero_description")}</p>

          <div className="mt-8 flex justify-center gap-4">
                  <Button 
          size="xl" 
          onClick={() => navigate("/symptoms")} 
          className="bg-gradient-to-r from-primary to-cyan-500 hover:shadow-lg hover:scale-105 transition 
                    text-2xl px-8 py-4 h-16 w-auto"
        >
          {t("check_symptoms")} <ArrowRight className="ml-2 w-6 h-6" />
        </Button>
            {/* <Button 
              size="xl" 
              variant="ghost" 
              onClick={() => navigate("/register")} 
              className="border border-white/20 bg-white/5 hover:bg-white/10"
            >
              {t("explore_more")}
            </Button> */}
          </div>
        </motion.div>

        {/* Features Grid */}
        <section className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(feature.path)}
              className="p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-lg cursor-pointer hover:scale-105 transition"
            >
              <div className="p-3 w-max rounded-xl bg-white/10 mb-4">
                <feature.icon className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              <p className="text-white/70 mt-2">{feature.description}</p>
            </motion.div>
          ))}
        </section>
      </main>

      {/* Floating Chat Assistant */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-8 right-8"
      >
        <Button 
          size="lg" 
          className="rounded-full px-6 py-5 bg-gradient-to-r from-primary to-cyan-500 hover:shadow-lg hover:scale-105 transition"
          onClick={() => navigate("/chat")}
        >
          <MessageCircle className="w-5 h-5 mr-2" /> {t("chat_ai")}
        </Button>
      </motion.div>
    </div>
  );
};

export default Index;
