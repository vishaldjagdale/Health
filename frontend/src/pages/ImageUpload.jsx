import React, { useState } from "react";

function ImageUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [dragging, setDragging] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);
        if (event.dataTransfer.files.length > 0) {
            setSelectedFile(event.dataTransfer.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await fetch("http://localhost:8000/predict_image", {
                method: "POST",
                body: formData
            });

            const data = await response.json();
            setPrediction(data.disease);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-indigo-400 p-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg max-w-xl w-full">
                <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">🖼 Upload Image for Disease Prediction</h2>

                {/* Drag & Drop Area */}
                <div 
                    className={`border-2 border-dashed p-6 rounded-lg text-center transition-all ${
                        dragging ? "border-blue-500 bg-blue-100" : "border-gray-400"
                    }`}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                >
                    <p className="text-gray-600">Drag & Drop an image here or</p>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        className="hidden" 
                        id="fileInput" 
                    />
                    <label htmlFor="fileInput" className="text-blue-500 font-semibold cursor-pointer">
                        Click to Select a File
                    </label>
                </div>

                {/* Show selected file name */}
                {selectedFile && (
                    <p className="mt-2 text-center text-gray-700">
                        Selected: <span className="font-semibold">{selectedFile.name}</span>
                    </p>
                )}

                {/* Upload Button */}
                <button 
                    onClick={handleUpload} 
                    className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                >
                    Predict Disease
                </button>

                {/* Prediction Result */}
                {prediction && (
                    <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
                        <p className="text-lg font-semibold">Predicted Disease:</p>
                        <p className="text-xl font-bold">{prediction}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ImageUpload;
