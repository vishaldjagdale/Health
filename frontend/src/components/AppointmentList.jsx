import React, { useEffect, useState } from "react";
import { backendUrl } from "../utils/urlApi"; // Adjust the import path as necessary
import axios from "axios";
import { useSelector } from "react-redux";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  // ✅ Fetch user email from Redux store or local storage
  const user =
    useSelector((state) => state.auth.user) ||
    JSON.parse(localStorage.getItem("user"));
  const userEmail = user?.email;

  useEffect(() => {
    if (!userEmail) return; // 🔴 Prevent API call if no user is logged in

    axios
      .get(
        `${backendUrl}/api/appointments/appointments-list?userEmail=${userEmail}`
      )
      .then((response) => setAppointments(response.data))
      .catch((error) => console.error("Error fetching appointments:", error));
  }, [userEmail]);

  return (
    <div className=" p-4 bg-white shadow-md rounded-lg text-black">
      <h2 className="text-xl font-bold ">Your Appointments</h2>
      {appointments.length === 0 ? (
        <p className="text-gray-500">No appointments booked yet.</p>
      ) : (
        appointments.map((appointment) => (
          <div
            key={appointment._id}
            className="p-4 border border-gray-200 rounded-md my-2"
          >
            <h3 className="font-semibold text-lg">
              Dr. {appointment?.doctorId?.name || "Unknown"}(
              {appointment?.doctorId?.specialization || "N/A"})
            </h3>
            <p>
              📅 <strong>Date:</strong> {appointment.date}
            </p>
            <p>
              ⏰ <strong>Time:</strong> {appointment.time}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default AppointmentList;
