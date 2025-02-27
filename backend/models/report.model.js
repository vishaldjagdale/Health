import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  filename: String,
  filePath: String,
  uploadedAt: { type: Date, default: Date.now },
  analysisResult: { type: Object, default: {} },
});

const Report = mongoose.model("Report", reportSchema);
export default Report;


