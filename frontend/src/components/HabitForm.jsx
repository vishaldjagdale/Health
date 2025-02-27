import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addHabit } from "../store/habitSlice";

const HabitForm = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addHabit({ name, frequency: "daily" }));
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-5">
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Enter habit name" 
        className="border p-2 mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-3 py-2">Add Habit</button>
    </form>
  );
};

export default HabitForm;
