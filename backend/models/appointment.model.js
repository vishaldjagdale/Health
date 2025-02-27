import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true }, // ✅ Reference Doctor Model
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, default: "Pending" }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
