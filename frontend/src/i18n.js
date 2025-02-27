import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const savedLanguage = localStorage.getItem("lang") || "en"; // Persist language preference

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translation: {
          hero_title: " AI-Powered",
          hero_subtitle: "Health Assistant",
          hero_description: "Advanced medical insights powered by AI to improve your well-being.",
          check_symptoms: "Check Symptoms",
          explore_more: "Explore More",
          report: "Report Analyzer",
          report_description: "AI-powered medical report analysis for detailed insights",
          specialist: "Specialist Matching",
          specialist_description: "Connect with verified medical professionals",
          hospitals: "Find Hospitals",
          hospitals_description: "Locate trusted healthcare providers near you",
          feedback: "Feedback",
          feedback_description: "Share your experience and help us improve",
          reminders: "Health Reminders",
          reminders_description: "Stay on track with medication and health alerts",
          skin_scanner: "Skin Scanner",
          skin_scanner_description: "AI-based skin health assessment",
          chat_ai: "Chat with AI",
          healthnodes: "HealthNodes",
          home: "Home",
          check_symptoms: "Check Symptoms",
          history: "History",
          sign_in: "Sign In",
          sign_up: "Sign Up",
          logout: "Logout",
          welcome: "Welcome",
          user: "User",
          logout_success: "Logged out successfully!",
        },
      },
      mr: {
        translation: {
          hero_title: "AI-शक्तिशाली",
          hero_subtitle: "आरोग्य सहाय्यक",
          hero_description: "AI द्वारे सक्षम प्रगत वैद्यकीय अंतर्दृष्टी तुमच्या कल्याणासाठी.",
          check_symptoms: "लक्षणे तपासा",
          explore_more: "अधिक शोधा",
          report: "अहवाल विश्लेषक",
          report_description: "AI-आधारित वैद्यकीय अहवाल विश्लेषण",
          specialist: "विशेषज्ञ जुळवणी",
          specialist_description: "प्रमाणित वैद्यकीय व्यावसायिकांशी कनेक्ट व्हा",
          hospitals: "रुग्णालये शोधा",
          hospitals_description: "तुमच्या जवळचे विश्वसनीय आरोग्य सेवा प्रदाते शोधा",
          feedback: "प्रतिसाद द्या",
          feedback_description: "तुमचा अनुभव शेअर करा आणि आम्हाला सुधारण्यास मदत करा",
          reminders: "आरोग्य स्मरणपत्रे",
          reminders_description: "औषध आणि आरोग्य अलर्टसह ट्रॅकवर रहा",
          skin_scanner: "त्वचा स्कॅनर",
          skin_scanner_description: "AI-आधारित त्वचा आरोग्य मूल्यांकन",
          chat_ai: "AI सोबत गप्पा मारा",
          healthnodes: "हेल्थनोड्स",
          home: "मुख्यपृष्ठ",
          check_symptoms: "लक्षणे तपासा",
          history: "इतिहास",
          sign_in: "साइन इन करा",
          sign_up: "नोंदणी करा",
          logout: "बाहेर पडा",
          welcome: "स्वागत आहे",
          user: "वापरकर्ता",
          logout_success: "यशस्वीरित्या लॉगआउट झाले!",
            },
      },
    },
    
    fallbackLng: savedLanguage,
    detection: { order: ["localStorage", "navigator", "htmlTag"] },
    interpolation: { escapeValue: false },
  });

export default i18n;
