import React, { useState, useEffect, useRef } from "react";
import { fetchChatResponse } from "../utils/chatApi";
import { FaPaperPlane, FaUser, FaRobot, FaClinicMedical } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const CorporateChatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    // Auto-scroll to latest message
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;
        
        setLoading(true);
        const newMessages = [...messages, { role: "user", content: input }];
        setMessages(newMessages);
        setInput("");

        try {
            let botResponse = await fetchChatResponse(input);
            botResponse = botResponse.replace(/\*\*/g, "").trim();
            setMessages([...newMessages, { role: "bot", content: botResponse }]);
        } catch (error) {
            setMessages([...newMessages, { 
                role: "bot", 
                content: "⚠️ Sorry, I'm experiencing technical difficulties. Please try again later."
            }]);
        }
        setLoading(false);
    };

    // Animation variants
    const messageVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, x: -50 }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-10 z-0">
                {/* Floating DNA Strand */}
                <motion.div 
                    className="absolute top-1/4 left-1/4 w-96 h-96"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path 
                            d="M50 5 Q55 15 45 25 Q55 35 45 45 Q55 55 45 65 Q55 75 45 85 Q50 95" 
                            stroke="#2dd4bf" 
                            fill="none" 
                            strokeWidth="0.5"
                            strokeDasharray="2 4"
                        />
                    </svg>
                </motion.div>

                {/* Floating Particles */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-teal-400/20 rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -100],
                            opacity: [0.3, 0],
                            scale: [1, 0.5],
                        }}
                        transition={{
                            duration: 10 + Math.random() * 10,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                        }}
                    />
                ))}
            </div>

            {/* Chat Container */}
            <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-xl bg-gradient-to-br from-slate-800/70 to-slate-900/50 backdrop-blur-2xl shadow-2xl rounded-2xl border border-slate-700/30 relative z-10"
            >
                {/* Corporate Header */}
                <div className="p-6 border-b border-slate-700/30">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-teal-500 to-blue-500">
                            <FaClinicMedical className="text-xl text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">HealthNodes AI</h1>
                            <p className="text-sm text-teal-400/80">Enterprise Medical Intelligence Platform</p>
                        </div>
                    </div>
                </div>

                {/* Chat Window */}
                <div className="h-[400px] overflow-y-auto p-4 custom-scrollbar">
                    <AnimatePresence initial={false}>
                        {messages.map((msg, index) => (
                            <motion.div
                                key={index}
                                variants={messageVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{ duration: 0.3 }}
                                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} mb-4`}
                            >
                                <div className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                                    <div className={`p-2 rounded-full shadow-lg ${msg.role === "user" ? "bg-blue-600" : "bg-teal-600"}`}>
                                        {msg.role === "user" ? (
                                            <FaUser className="text-white text-sm" />
                                        ) : (
                                            <FaRobot className="text-white text-sm" />
                                        )}
                                    </div>
                                    <div 
                                        className={`p-4 max-w-md rounded-xl shadow-md ${
                                            msg.role === "user" 
                                                ? "bg-blue-700/90 border border-blue-500/30"
                                                : "bg-slate-700/90 border border-teal-500/30"
                                        }`}
                                    >
                                        <p className="text-sm text-gray-100 leading-relaxed">{msg.content}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Loading Indicator */}
                    {loading && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-lg"
                        >
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                                <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse delay-100"></div>
                                <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse delay-200"></div>
                            </div>
                            <span className="text-sm text-gray-300">Analyzing with medical AI...</span>
                        </motion.div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-slate-700/30">
                    <motion.div 
                        className="flex gap-2 items-center bg-slate-800/50 rounded-xl p-2 border border-slate-700/30"
                        whileHover={{ scale: 1.01 }}
                    >
                        <input
                            type="text"
                            className="w-full p-2 bg-transparent border-none outline-none text-gray-200 placeholder-gray-400 text-sm"
                            placeholder="Type your medical query..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        />
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 bg-gradient-to-br from-teal-500 to-blue-500 rounded-lg text-white shadow-md"
                            onClick={handleSend}
                        >
                            <FaPaperPlane className="text-sm" />
                        </motion.button>
                    </motion.div>
                </div>
            </motion.div>

            {/* Corporate Footer */}
            <motion.div 
                className="mt-6 text-center text-sm text-slate-400 flex gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <span>© {new Date().getFullYear()} HealthNodes International</span>
                <span className="text-slate-600">|</span>
                <a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a>
                <span className="text-slate-600">|</span>
                <a href="#" className="hover:text-teal-400 transition-colors">Terms of Service</a>
            </motion.div>
        </div>
    );
};

export default CorporateChatbot;

// Add to global CSS
<style jsx global>{`
    .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
    }

    .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 4px;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: linear-gradient(to bottom, #2dd4bf, #3b82f6);
        border-radius: 4px;
    }

    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }

    .animate-pulse {
        animation: pulse 1.5s infinite;
    }

    .delay-100 {
        animation-delay: 0.1s;
    }

    .delay-200 {
        animation-delay: 0.2s;
    }
`}</style>