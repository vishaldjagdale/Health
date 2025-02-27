import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const translateToMarathi = async (text) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Translate the following text into Marathi:\n\n${text}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Translation error:", error);
    return "Translation failed!";
  }
};
