import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  description: String,
  frequency: { type: String, enum: ["daily", "weekly"], default: "daily" },
  progress: [{ date: Date, completed: Boolean }],
});

export const Habit = mongoose.model("Habit", habitSchema);
