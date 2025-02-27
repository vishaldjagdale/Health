import Appointment from "../models/appointment.model.js";

export const bookAppointment = async (req, res) => {
  try {
    const { doctorId, userName, userEmail, date, time } = req.body;
    const newAppointment = new Appointment({
      doctorId,
      userName,
      userEmail,
      date,
      time,
    });

    await newAppointment.save();
    res.json({ message: "Appointment booked successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
