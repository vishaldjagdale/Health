import express from "express";
import upload from "../middleware/multerConfig.js";
import { uploadReport, getReports } from "../controllers/reportController.js";
import analyzeReport from "../services/reportAnalysisServices.js";
import path from "path";
import fs from "fs";
import pdfParse from "pdf-parse";
import { translateToMarathi } from "../services/translationService.js";



const router = express.Router();

router.post("/upload", upload.single("reportFile"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded!" });
      }
  
      console.log("Uploaded file:", req.file); // Debugging
  
      const analysisResult = await analyzeReport(req.file.path); // Analyze report
      const marathiText = await translateToMarathi(analysisResult); // Translate
  
      res.json({
        original: analysisResult,
        marathi: marathiText,
      });
    } catch (error) {
      console.error("Error processing report:", error);
      res.status(500).json({ error: "Error processing the report" });
    }
  });
router.get("/reports", getReports);

export default router;
