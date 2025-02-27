import fs from "fs";
import pdfParse from "pdf-parse";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const analyzeReport = async (filePath) => {
  try {
    // ✅ Step 1: Extract text from PDF
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    const extractedText = pdfData.text.trim();

    if (!extractedText) {
      throw new Error("No text extracted from the report.");
    }

    console.log("📜 Extracted Text:", extractedText);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // ✅ Step 2: Generate structured report in English
    const formattedResponseObj = await model.generateContent(
      `Format the following medical report into structured information:\n\n${extractedText}`
    );

    // **🔹 Correct way to extract response text**
    const formattedEnglish =
      formattedResponseObj.response?.candidates?.[0]?.content?.parts?.[0]?.text || "No structured report found.";

    console.log("📑 Structured Report (English):", formattedEnglish);

    // ✅ Step 3: Translate structured report to Marathi
    const marathiTranslationObj = await model.generateContent(
      `Translate the following structured medical report into Marathi:\n\n${formattedEnglish}`
    );

    // **🔹 Correct way to extract Marathi translation**
    const formattedMarathi =
      marathiTranslationObj.response?.candidates?.[0]?.content?.parts?.[0]?.text || "संरचित अहवाल सापडला नाही.";

    console.log("📜 Structured Report (Marathi):", formattedMarathi);

    return {
      original: {
        extractedText,
        formattedEnglish,
        formattedMarathi,
      },
      marathi: formattedMarathi,
    };
  } catch (error) {
    console.error("❌ Error analyzing report:", error);
    throw new Error("Failed to analyze report.");
  }
};

export default analyzeReport;
