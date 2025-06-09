import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/appointments-list');
        if (Array.isArray(response.data)) {
          setAppointments(response.data); // Set the data if it's an array
        } else {
          setAppointments([]); // Fallback to empty array
        }
        setLoading(false);
      } catch (err) {
        setError('Error fetching appointments');
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {appointments.length > 0 ? (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment._id}>
              Doctor: {appointment.doctorId.name} - Date: {appointment.date}
            </li>
          ))}
        </ul>
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
};

export default AppointmentsList;
