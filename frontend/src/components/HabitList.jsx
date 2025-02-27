import React from "react";

const HabitList = ({ habits = [], onDeleteHabit }) => {
  if (!Array.isArray(habits)) {
    console.error("Error: Expected habits to be an array, but got", habits);
    return <p>Loading habits...</p>;
  }

  return (
    <div>
      <h2>Your Habits</h2>
      {habits.length === 0 ? (
        <p>No habits found. Start tracking!</p>
      ) : (
        <ul>
          {habits.map((habit, index) => (
            <li key={index}>
              {habit.name}{" "}
              <button onClick={() => onDeleteHabit(habit.name)}>❌</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HabitList;
