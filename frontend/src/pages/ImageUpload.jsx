import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Scan, Leaf, Loader2, X, CheckCircle, Zap } from "lucide-react";

function ImageUpload() {
    // State variables
    const [dragging, setDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [prediction, setPrediction] = useState(null);

    // Handle file drop (Drag & Drop)
    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);

        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            setSelectedFile(file);
            setError(null);
        } else {
            setError("Only image files (PNG, JPG, JPEG) are supported.");
        }
    };

    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setSelectedFile(file);
            setError(null);
        } else {
            setError("Only image files (PNG, JPG, JPEG) are supported.");
        }
    };

    // Simulated upload function
    const handleUpload = () => {
        if (!selectedFile) {
            setError("Please upload an image before scanning.");
            return;
        }

        setIsLoading(true);
        setError(null);

        // Simulating AI disease detection
        setTimeout(() => {
            setIsLoading(false);
            setPrediction("Leaf Rust"); // Example AI prediction result
        }, 2000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass-morphism bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-2xl border border-white/20 relative overflow-hidden"
            >
                {/* Animated Background Elements */}
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

                <div className="relative z-10">
                    <div className="text-center space-y-4 mb-10">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="inline-flex p-4 bg-gradient-to-br from-emerald-600/30 to-cyan-500/30 rounded-2xl"
                        >
                            <Leaf className="w-12 h-12 text-emerald-400" />
                        </motion.div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                            HealthNodes Scanner
                        </h1>
                        <p className="text-gray-400 max-w-md mx-auto">
                            AI-powered disease detection with 95% clinical accuracy
                        </p>
                    </div>

                    {/* Upload Area */}
                    <motion.div
                        onDragOver={(e) => {
                            e.preventDefault();
                            setDragging(true);
                        }}
                        onDragLeave={() => setDragging(false)}
                        onDrop={handleDrop}
                        className={`group relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ${
                            dragging
                                ? "border-emerald-400 bg-emerald-500/10"
                                : "border-white/20 hover:border-emerald-300/50"
                        }`}
                    >
                        <div className="flex flex-col items-center justify-center space-y-6">
                            <motion.div
                                animate={{ y: dragging ? [-2, 2] : 0 }}
                                transition={{ duration: 0.8, repeat: Infinity, repeatType: "mirror" }}
                            >
                                <div className="p-4 bg-gradient-to-br from-emerald-600/20 to-cyan-500/20 rounded-2xl">
                                    <Upload className={`w-10 h-10 ${
                                        dragging ? "text-emerald-400" : "text-gray-400"
                                    } transition-colors`} />
                                </div>
                            </motion.div>

                            <div className="text-center space-y-3">
                                <p className="font-medium text-gray-200">
                                    {dragging ? "Release to upload" : "Drag & drop image"}
                                </p>
                                <p className="text-sm text-gray-500">Supported formats: PNG, JPG, JPEG</p>
                            </div>

                            <label className="cursor-pointer">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <motion.span
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-xl font-medium shadow-lg hover:shadow-emerald-500/30 transition-all"
                                >
                                    <Scan className="w-5 h-5 mr-2" />
                                    Choose File
                                </motion.span>
                            </label>
                        </div>
                    </motion.div>

                    {/* File Preview */}
                    {selectedFile && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <img
                                        src={URL.createObjectURL(selectedFile)}
                                        alt="Preview"
                                        className="w-14 h-14 rounded-lg object-cover border border-white/10"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-lg" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-200">{selectedFile.name}</p>
                                    <p className="text-sm text-gray-500">
                                        {(selectedFile.size / 1024).toFixed(1)} KB
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedFile(null)}
                                className="text-gray-400 hover:text-red-400 transition-colors p-1"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </motion.div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-4 p-4 bg-red-500/20 text-red-400 rounded-xl flex items-center space-x-2 border border-red-500/30"
                        >
                            <X className="w-5 h-5 flex-shrink-0" />
                            <span>{error}</span>
                        </motion.div>
                    )}

                    {/* Analysis Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleUpload}
                        disabled={!selectedFile || isLoading}
                        className={`w-full mt-8 py-5 rounded-xl font-medium transition-all relative overflow-hidden ${
                            selectedFile
                                ? "bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white shadow-xl"
                                : "bg-gray-800 text-gray-500 cursor-not-allowed"
                        }`}
                    >
                        {isLoading ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                            "Scan for Diseases"
                        )}
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}

export default ImageUpload;
