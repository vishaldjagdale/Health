import mongoose from "mongoose";

const ReminderSchema = new mongoose.Schema({
    phone: { type: String, required: true },  // User's phone number
    medication: { type: String, required: true },
    time: { type: String, required: true }  // Format: "HH:MM"
});

export default mongoose.model("Reminder", ReminderSchema);
