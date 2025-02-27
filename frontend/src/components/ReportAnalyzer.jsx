import React, { useState } from "react";
import axios from "axios";

const ReportAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [structuredReport, setStructuredReport] = useState("");
  const [marathiReport, setMarathiReport] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Upload and analyze the report
  const handleUpload = async () => {
    if (!file) {
      setError("❌ Please select a file to upload.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("reportFile", file);

    try {
      const response = await axios.post("http://localhost:3000/api/reports/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("📥 Backend Response:", response.data);

      // Ensure response data is correctly structured
      const extractedData = response.data;
      const formattedEnglish = extractedData?.original?.original?.formattedEnglish || "No structured report found.";
      const formattedMarathi = extractedData?.original?.marathi || "संरचित अहवाल सापडला नाही.";

      setStructuredReport(formattedEnglish);
      setMarathiReport(formattedMarathi);
    } catch (error) {
      console.error("❌ Error analyzing report:", error);
      setError("⚠️ Failed to analyze the report.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-gray-800 shadow-xl rounded-lg p-6 border border-gray-700">
        <h2 className="text-3xl font-semibold text-center text-blue-400">📑 Medical Report Analyzer</h2>

        {/* File Upload Section */}
        <div className="mt-6 flex flex-col items-center">
          <label className="cursor-pointer w-full max-w-md">
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="p-4 bg-gray-700 text-gray-300 border-2 border-dashed border-gray-500 rounded-lg text-center hover:bg-gray-600 transition-all">
              {file ? `📄 ${file.name}` : "📂 Click to upload a medical report"}
            </div>
          </label>

          <button
            onClick={handleUpload}
            disabled={loading}
            className={`mt-4 px-6 py-2 font-semibold rounded-lg shadow-md transition-all ${
              loading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500"
            } text-white`}
          >
            {loading ? "⏳ Analyzing..." : "📤 Upload & Analyze"}
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="mt-4 text-red-500 text-center font-medium">{error}</p>}

        {/* Structured Report Display */}
        {structuredReport && (
          <div className="mt-6 p-4 bg-gray-700 border-l-4 border-blue-400 shadow rounded-lg">
            <h3 className="text-lg font-semibold text-blue-300">📑 Structured Report (English)</h3>
            <p className="text-gray-300 whitespace-pre-line mt-2">{structuredReport}</p>
          </div>
        )}

        {/* Marathi Report Display */}
        {marathiReport && (
          <div className="mt-6 p-4 bg-gray-700 border-l-4 border-green-400 shadow rounded-lg">
            <h3 className="text-lg font-semibold text-green-300">📜 संरचित अहवाल (मराठीत)</h3>
            <p className="text-gray-300 whitespace-pre-line mt-2">{marathiReport}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportAnalyzer;
