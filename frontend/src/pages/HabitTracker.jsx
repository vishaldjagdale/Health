import React, { useEffect, useState } from "react";
import HabitList from "../components/HabitList";
import { fetchHabits, addHabit } from "../utils/habitsApi";

const HabitTracker = () => {
  const [habits, setHabits] = useState([]); // ✅ Default empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newHabit, setNewHabit] = useState(""); // ✅ State for new habit

  useEffect(() => {
    fetchHabits()
      .then((data) => {
        if (Array.isArray(data)) {
          setHabits(data);
        } else {
          console.error("Error: API did not return an array", data);
          setHabits([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch habits:", err);
        setError("Failed to load habits.");
      })
      .finally(() => setLoading(false));
  }, []);

  // ✅ Function to add a new habit
  const handleAddHabit = async () => {
    if (!newHabit.trim()) return; // Prevent empty input
    const addedHabit = await addHabit(newHabit);
    setHabits([...habits, addedHabit]); // Update UI immediately
    setNewHabit(""); // Clear input field
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Habit Tracker</h1>

      {/* ✅ Add Habit Form */}
      <div>
        <input
          type="text"
          placeholder="Enter new habit"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
        />
        <button onClick={handleAddHabit}>Create Habit</button>
      </div>

      {loading ? <p>Loading habits...</p> : <HabitList habits={habits} />}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default HabitTracker;
