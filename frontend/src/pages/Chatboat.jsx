import React, { useState, useEffect, useRef } from "react";
import { fetchChatResponse } from "../utils/chatApi";
import { FaPaperPlane } from "react-icons/fa";
import { Header } from "@/components/layout/Header";

function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    // Scroll to the latest message automatically
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;
    
        setLoading(true);
        const newMessages = [...messages, { role: "user", content: input }];
        setMessages(newMessages);
        setInput("");
    
        let botResponse = await fetchChatResponse(input);
    
        // Remove asterisks and extra spaces
        botResponse = botResponse.replace(/\*\*/g, "").trim(); 
    
        setMessages([...newMessages, { role: "bot", content: botResponse }]);
        setLoading(false);
    };

    return (
       
        <div className="flex flex-col w-full max-w-lg mx-auto min-h-screen bg-black items-center justify-center p-4">
            {/* Chatbox Container */}
            <div className="w-full bg-opacity-20 bg-white/10 backdrop-blur-md shadow-lg rounded-2xl p-4 border border-gray-700">
                <h2 className="text-2xl font-bold text-center text-white mb-4">💬 AI Medical Chatbot</h2>
                
                {/* Chat Window */}
                <div className="h-[500px] overflow-y-auto p-4 border border-gray-600 rounded-md bg-black bg-opacity-30 backdrop-blur-lg shadow-inner">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`p-3 my-1 rounded-lg text-white max-w-xs shadow-lg transition-all duration-300 ${
                                msg.role === "user" 
                                    ? "bg-blue-500 border border-blue-300 neon-glow-user" 
                                    : "bg-gray-700 border border-gray-500 neon-glow-bot"
                            }`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <p className="text-gray-400 text-center animate-pulse">⏳ Typing...</p>
                    )}
                    <div ref={chatEndRef}></div>
                </div>

                {/* Input Box */}
                <div className="flex mt-4 border border-gray-600 rounded-lg bg-white bg-opacity-10 backdrop-blur-md">
                    <input
                        type="text"
                        className="w-full p-3 text-white bg-transparent border-none outline-none placeholder-gray-400"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    />
                    <button 
                        className="bg-blue-600 text-white px-5 py-3 rounded-r-lg hover:bg-blue-700 transition-all flex items-center"
                        onClick={handleSend}
                    >
                        <FaPaperPlane />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chatbot;
