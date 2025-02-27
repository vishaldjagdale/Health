import { Habit } from "../models/habitModel.js";

// Create new habit
export const createHabit = async (req, res) => {
  try {
    const habit = new Habit({ ...req.body, userId: req.user.id });
    await habit.save();
    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get habits for a user
export const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.user.id });
    res.status(200).json(habits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark habit progress
export const updateHabitProgress = async (req, res) => {
  try {
    const { habitId, date, completed } = req.body;
    const habit = await Habit.findById(habitId);
    if (!habit) return res.status(404).json({ message: "Habit not found" });

    habit.progress.push({ date, completed });
    await habit.save();
    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete habit
export const deleteHabit = async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.json({ message: "Habit deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
