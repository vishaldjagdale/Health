export const fetchHabits = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/habits"); // Replace with actual API
    const data = await response.json();
    
    if (!Array.isArray(data)) {
      console.error("Invalid API response, expected array but got", data);
      return [];
    }

    return data;
  } catch (error) {
    console.error("API Fetch Error:", error);
    return [];
  }
};

// ✅ Function to add a new habit
export const addHabit = async (habitName) => {
  try {
    const response = await fetch("http://localhost:3000/api/habits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: habitName }),
    });

    const data = await response.json();
    return data; // Return newly created habit
  } catch (error) {
    console.error("Failed to add habit:", error);
    return { name: habitName }; // Fallback if API fails
  }
};
