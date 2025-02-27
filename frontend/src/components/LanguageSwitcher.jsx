import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(localStorage.getItem("lang") || "en");
  const [isOpen, setIsOpen] = useState(false); // State to track dropdown visibility

  useEffect(() => {
    i18n.changeLanguage(selectedLang);
    localStorage.setItem("lang", selectedLang);
  }, [selectedLang, i18n]);

  const languages = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "mr", label: "मराठी", flag: "🇮🇳" },
  ];

  const changeLanguage = (lang) => {
    setSelectedLang(lang);
    setIsOpen(false); // Close the dropdown when a language is selected
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition"
      >
        <Globe className="w-5 h-5" />
        <span>{languages.find((l) => l.code === selectedLang)?.label}</span>
      </button>

      {isOpen && (
        <ul className="absolute mt-2 w-36 bg-gray-900 text-white shadow-lg rounded-lg p-2">
          {languages.map(({ code, label, flag }) => (
            <li
              key={code}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-700 transition ${
                selectedLang === code ? "bg-gray-700" : ""
              }`}
              onClick={() => changeLanguage(code)}
            >
              <span>{flag}</span>
              <span>{label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
