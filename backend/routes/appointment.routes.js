import express from "express";
import { bookAppointment } from "../controllers/appointmentController.js";
import Appointment from "../models/appointment.model.js";
import Doctor from "../models/doctor.model.js"; 

const router = express.Router();
router.post("/appointments", bookAppointment);
router.get("/appointments-list", async (req, res) => {
    try {
      const { userEmail } = req.query; // ✅ Get userEmail from query params
  
      let query = {};
      if (userEmail) {
        query.userEmail = userEmail; // ✅ Filter by userEmail if provided
      }
  
      const appointments = await Appointment.find(query).populate("doctorId"); // ✅ Populate doctor details
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching appointments", error });
    }
  });

export default router;
