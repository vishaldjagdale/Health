import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: Number, required: true },
    availableSlots: { type: [String], required: true }, // Array of available time slots
    contact: { type: String, required: true },
    location: { type: String, required: true }
});

export default mongoose.model("Doctor", doctorSchema);
