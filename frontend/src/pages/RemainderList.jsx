import React, { useEffect, useState } from "react";
import { backendUrl } from "../utils/urlApi"; // Adjust the import path as necessary
import axios from "axios";

const ReminderList = () => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    axios.get(`${backendUrl}/api/reminders`).then((response) => {
      setReminders(response.data);
    });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="p-8 bg-gray-900 text-white rounded-xl shadow-lg border border-gray-700 max-w-md w-full mt-16">
        <h2 className="text-2xl font-bold mb-6 text-cyan-400 text-center">
          📅 Upcoming Reminders
        </h2>

        {reminders.length === 0 ? (
          <p className="text-gray-400 text-center">No upcoming reminders.</p>
        ) : (
          <ul className="space-y-3">
            {reminders.map((reminder, index) => (
              <li
                key={index}
                className="border border-gray-700 bg-gray-800 p-4 rounded-lg flex flex-col shadow-md"
              >
                <span className="text-lg font-semibold text-white">
                  💊 {reminder.medication}
                </span>
                <span className="text-gray-400">🕒 {reminder.time}</span>
                <span className="text-gray-500">📞 {reminder.phone}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ReminderList;
