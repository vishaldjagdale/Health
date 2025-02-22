import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

import authRoutes from "./routes/auth.routes.js";
import newsRoutes from "./routes/newsRoutes.js";
import reminderRoute from "./routes/reminderRoute.js";

const app = express();

// Security Middleware
app.use(helmet());

//  CORS Configuration
app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:8083",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/news", newsRoutes);
app.use("/api/v1/reminders", reminderRoute);

// MongoDB Connection
if (!process.env.MONGODB_URI) {
    console.error("❌ MONGODB_URI is not defined in environment variables");
    process.exit(1);
}

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);
    });

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

// Graceful Shutdown
process.on("SIGINT", async() => {
    console.log("❌ Server shutting down...");
    await mongoose.connection.close();
    process.exit(0);
});