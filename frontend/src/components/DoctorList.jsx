import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Star } from "lucide-react";

const DoctorList = ({ onSelectDoctor }) => {
    const [doctors, setDoctors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3000/api/doctor/doctors")
            .then(response => {
                // Add a random rating (between 3.5 to 5.0) to each doctor
                const doctorsWithRatings = response.data.map(doctor => ({
                    ...doctor,
                    rating: (Math.random() * 1.5 + 3.5).toFixed(1), // Generates a random rating between 3.5 and 5.0
                }));
                setDoctors(doctorsWithRatings);
            })
            .catch(error => console.error("Error fetching doctors:", error));
    }, []);

    return (
        <div className="max-w-5xl mx-auto mt-6 px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-6">👨‍⚕️ Available Doctors</h2>
            
            {doctors.length === 0 ? (
                <p className="text-center text-gray-400">No doctors available</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {doctors.map(doctor => (
                        <div key={doctor._id} className="relative bg-[#1E293B] p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border border-gray-700">
                            {/* Doctor Image */}
                            <div className="absolute top-[-40px] left-4 w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center border border-gray-600">
                                <img
                                    src={`https://i.pravatar.cc/80?img=${Math.floor(Math.random() * 70)}`} // Random placeholder image
                                    alt="Doctor"
                                    className="w-14 h-14 rounded-full"
                                />
                            </div>

                            <div className="ml-20">
                                {/* Doctor Name & Specialization */}
                                <h3 className="text-xl font-semibold text-white">{doctor.name}</h3>
                                <p className="text-gray-400">{doctor.specialization}</p>

                                {/* Doctor Rating */}
                                <div className="flex items-center mt-2">
                                    <span className="text-yellow-400 font-bold">{doctor.rating}</span>
                                    <Star className="w-4 h-4 text-yellow-400 ml-1" />
                                    <Star className="w-4 h-4 text-yellow-400" />
                                    <Star className="w-4 h-4 text-yellow-400" />
                                    {doctor.rating >= 4.5 && <Star className="w-4 h-4 text-yellow-400" />}
                                    {doctor.rating >= 4.8 && <Star className="w-4 h-4 text-yellow-400" />}
                                </div>

                                {/* Book Appointment Button */}
                                <button 
                                    onClick={() => {
                                        if (typeof onSelectDoctor === "function") {
                                            onSelectDoctor(doctor);
                                            navigate("/book-appointment");
                                        } else {
                                            console.error("onSelectDoctor is not a function!");
                                        }
                                    }}
                                    className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-300"
                                >
                                    📅 Book Appointment
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DoctorList;
