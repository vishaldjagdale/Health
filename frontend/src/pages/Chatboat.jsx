import React, { useState, useEffect, useRef } from "react";
import { fetchChatResponse } from "../utils/chatApi";
import { FaPaperPlane, FaUser, FaRobot, FaClinicMedical } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Chatbot = () => {
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-900 p-2">
            {/* Chatbox Container */}
            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-opacity-30 bg-white/5 backdrop-blur-2xl shadow-2xl rounded-2xl p-4 border border-teal-400/20 relative"
            >
                {/* Header */}
                <div className="flex items-center justify-center mb-4 space-x-3">
                    <FaClinicMedical className="text-2xl text-teal-400 animate-pulse" />
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">
                        HealthNodes AI
                    </h2>
                </div>
    
                {/* Chat Window */}
                <div className="h-[350px] overflow-y-auto p-3 border border-teal-400/20 rounded-lg bg-slate-900/30 backdrop-blur-md shadow-inner custom-scrollbar">
                    <AnimatePresence initial={false}>
                        {messages.map((msg, index) => (
                            <motion.div
                                key={index}
                                variants={messageVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{ duration: 0.3 }}
                                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} mb-3`}
                            >
                                <div className={`flex items-start gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                                    <div className={`p-2 rounded-full shadow-md ${msg.role === "user" ? "bg-blue-500" : "bg-teal-500"}`}>
                                        {msg.role === "user" ? (
                                            <FaUser className="text-white text-sm" />
                                        ) : (
                                            <FaRobot className="text-white text-sm" />
                                        )}
                                    </div>
                                    <div 
                                        className={`p-3 text-white max-w-[250px] rounded-xl shadow-lg transition-all duration-300 text-sm ${
                                            msg.role === "user" 
                                                ? "bg-blue-600/90 border border-blue-400/30"
                                                : "bg-slate-800/90 border border-teal-400/30"
                                        }`}
                                    >
                                        <p className="leading-relaxed">{msg.content}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
    
                    {/* Typing Indicator */}
                    {loading && (
                        <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center space-x-1"
                        >
                            <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce delay-100"></div>
                            <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce delay-200"></div>
                            <span className="text-xs text-gray-300">Analyzing your query...</span>
                        </motion.div>
                    )}
                    
                    <div ref={chatEndRef}></div>
                </div>
    
                {/* Input Box */}
                <motion.div 
                    whileHover={{ scale: 1.01 }}
                    className="flex mt-3 border border-teal-400/20 rounded-lg bg-slate-900/30 backdrop-blur-lg shadow-lg overflow-hidden"
                >
                    <input
                        type="text"
                        className="w-full p-3 text-white bg-transparent border-none outline-none placeholder-gray-400 text-sm"
                        placeholder="Ask a health question..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    />
                    <motion.button 
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-3 hover:from-teal-600 hover:to-blue-600 transition-all flex items-center gap-1 text-sm"
                        onClick={handleSend}
                    >
                        <FaPaperPlane />
                    </motion.button>
                </motion.div>
            </motion.div>
    
            {/* Footer */}
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 text-xs text-teal-400/80"
            >
                🔒 HealthNodes • Powered by CodeX
            </motion.p>
        </div>
    );
    
};

export default Chatbot;

// Add this CSS in your global styles
<style jsx global>{`
    @keyframes float {
        0%, 100% { transform: translateY(0) translateX(0); }
        25% { transform: translateY(-20px) translateX(10px); }
        50% { transform: translateY(10px) translateX(-10px); }
        75% { transform: translateY(-10px) translateX(-15px); }
    }

    .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
    }

    .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.05);
    }

    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: linear-gradient(to bottom, #2dd4bf, #3b82f6);
        border-radius: 4px;
    }

    .delay-100 {
        animation-delay: 0.1s;
    }

    .delay-200 {
        animation-delay: 0.2s;
    }
`}</style>