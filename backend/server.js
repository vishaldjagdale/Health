import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// Import database connection
import connectDB from "./config/database.js";

import authRoutes from "./routes/auth.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import reportRoutes from "./routes/analyzeReports.routes.js";
import habitRoutes from "./routes/habitRoutes.js";
import reminderRoutes from "./routes/reminderRoutes.js";

import { checkReminders } from "./services/smsService.js";
import newsRoute from "./routes/newsRoutes.js";

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:8000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/reports", reportRoutes);
app.use("/api/habits", habitRoutes);
app.use("/api/reminders", reminderRoutes);
app.use("/api", newsRoute);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "HealthNodes Backend is running",
    timestamp: new Date().toISOString(),
  });
});

// Run SMS Scheduler Every Minute
setInterval(checkReminders, 60000);

// Connect to Database
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
