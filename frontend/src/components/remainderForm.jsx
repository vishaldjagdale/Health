import React, { useState } from "react";
import { backendUrl } from "../utils/urlApi"; // Adjust the import path as necessary
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ReminderForm = () => {
  const [phone, setPhone] = useState("");
  const [medication, setMedication] = useState("");
  const [time, setTime] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${backendUrl}/api/reminders/add`, {
      phone,
      medication,
      time,
    });
    alert("✅ Reminder Added Successfully!");
    navigate("/remainder-list");
  };

  return (
    <div className="p-20 bg-gray-900 text-white rounded-xl shadow-lg border border-gray-700 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-cyan-400 text-center">
        Set Medication Reminder
      </h2>
      <form onSubmit={handleSubmit} className="text-white space-y-4">
        <input
          className="border border-gray-700 bg-gray-800 text-white p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          type="tel"
          placeholder="📞 Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <input
          className="border border-gray-700 bg-gray-800 text-white p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          type="text"
          placeholder="💊 Medication Name"
          value={medication}
          onChange={(e) => setMedication(e.target.value)}
          required
        />

        <input
          className="border border-gray-700 bg-gray-800 text-white p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-600 transition-all text-white px-6 py-3 rounded-lg w-full text-lg font-semibold shadow-md"
        >
          ➕ Add Reminder
        </button>
      </form>
    </div>
  );
};

export default ReminderForm;
