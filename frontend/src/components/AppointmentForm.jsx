import React, { useState } from "react";
import { backendUrl } from "../utils/urlApi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AppointmentForm = ({ doctor }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!doctor) {
      alert("Please select a doctor first.");
      return;
    }

    const appointmentData = {
      doctorId: doctor._id,
      userName,
      userEmail,
      date,
      time,
    };

    try {
      await axios.post(
        `${backendUrl}/api/appointments/appointments`,
        appointmentData
      );
      alert("Appointment Booked Successfully!");
      navigate("/appointments-list");
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-6 text-black">
      <h2 className="text-2xl font-bold text-center text-gray-700">
        Book Appointment
      </h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          placeholder="Your Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full px-3 py-2 border rounded-md mb-2"
        />
        <input
          type="email"
          placeholder="Your Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-md mb-2"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-3 py-2 border rounded-md mb-2"
        />
        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full px-3 py-2 border rounded-md mb-4"
        >
          <option value="">Select Time</option>
          {doctor?.availableSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
