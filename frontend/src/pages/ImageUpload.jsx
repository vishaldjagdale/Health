import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Scan, Leaf, Loader2, X, CheckCircle } from "lucide-react";

function ImageUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setError(null);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);
        if (event.dataTransfer.files[0]?.type.startsWith("image/")) {
            setSelectedFile(event.dataTransfer.files[0]);
            setError(null);
        } else {
            setError("Please upload an image file");
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        setIsLoading(true);
        setError(null);
        
        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await fetch("http://localhost:8000/predict_image", {
                method: "POST",
                body: formData
            });

            if (!response.ok) throw new Error("Prediction failed");
            const data = await response.json();
            
            setPrediction(data.disease);
        } catch (error) {
            setError(error.message || "Failed to process image");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1C2529] to-[#121618]  p-6">
            <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white/50 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-2xl border border-white/30"
            >
                <div className="text-center space-y-2 mb-8">
                    <motion.div 
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="flex justify-center"
                    >
                        <Leaf className="w-12 h-12 text-emerald-800" />
                    </motion.div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        AI-Powered Disease Detection
                    </h1>
                    <p className="text-white-400">
                        Upload plant image for instant disease analysis
                    </p>
                </div>

                <div 
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                    className={`group relative border-4 border-dashed rounded-2xl p-8 transition-all duration-300 ${
                        dragging ? "border-emerald-400 bg-emerald-50" : "border-gray-200 hover:border-emerald-300"
                    }`}
                >
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <motion.div
                            animate={{ y: dragging ? 2 : 0 }}
                            transition={{ repeat: Infinity, duration: 0.5, repeatType: "reverse" }}
                        >
                            <Upload className={`w-12 h-12 ${
                                dragging ? "text-emerald-600" : "text-gray-400"
                            } transition-colors`} />
                        </motion.div>
                        
                        <div className="text-center space-y-2">
                            <p className="font-medium text-gray-700">
                                {dragging ? "Drop to analyze" : "Drag & drop image"}
                            </p>
                            <p className="text-sm text-white-500">or</p>
                        </div>
                        
                        <label className="cursor-pointer">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <span className="inline-flex items-center px-6 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg">
                                <Scan className="w-5 h-5 mr-2" />
                                Browse Files
                            </span>
                        </label>
                    </div>
                </div>

                {selectedFile && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 flex items-center justify-between bg-emerald-50/50 p-4 rounded-xl"
                    >
                        <div className="flex items-center space-x-3">
                            <img 
                                src={URL.createObjectURL(selectedFile)} 
                                alt="Preview" 
                                className="w-12 h-12 rounded-lg object-cover"
                            />
                            <span className="font-medium text-gray-700">
                                {selectedFile.name}
                            </span>
                        </div>
                        <button 
                            onClick={() => setSelectedFile(null)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </motion.div>
                )}

                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 p-4 bg-red-50 text-red-700 rounded-xl flex items-center space-x-2"
                    >
                        <X className="w-5 h-5" />
                        <span>{error}</span>
                    </motion.div>
                )}

                <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleUpload}
                    disabled={!selectedFile || isLoading}
                    className={`w-full mt-6 py-4 rounded-xl font-medium transition-all ${
                        selectedFile 
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white/5 shadow-lg"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center space-x-2">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Analyzing...</span>
                        </div>
                    ) : (
                        "Detect Disease"
                    )}
                </motion.button>

                {prediction && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-6 p-6 bg-white border border-emerald-100 rounded-2xl shadow-md"
                    >
                        <div className="flex items-center space-x-3">
                            <CheckCircle className="w-8 h-8 text-emerald-600" />
                            <div>
                                <p className="text-sm text-gray-500">Prediction Result</p>
                                <h3 className="text-2xl font-bold text-gray-800">
                                    {prediction}
                                </h3>
                            </div>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}

export default ImageUpload;
