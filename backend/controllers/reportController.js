import Report from "../models/report.model.js";
import analyzeReport from "../services/reportAnalysisServices.js";
import fs from "fs";

// Upload and analyze report
export const uploadReport = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const newReport = new Report({
      filename: req.file.filename,
      filePath: req.file.path,
    });

    // Save report to DB
    await newReport.save();

    // Perform AI analysis
    const analysisResult = await analyzeReport(req.file.path);

    // Update with analysis result
    newReport.analysisResult = analysisResult;
    await newReport.save();

    res.status(200).json({ message: "Report uploaded successfully", report: newReport });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all reports
export const getReports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
