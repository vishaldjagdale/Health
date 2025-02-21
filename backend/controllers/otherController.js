import Habits from "../models/Habits.js";
import Challenge from "../models/Challenge.js";

import { validationResult } from "express-validator";
import ENV_VARS from "../utils/ENV_Var.js";
import dotenv from "dotenv";
dotenv.config();

// TRACK HABIT

const addHabit = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userId, habit_name, total_days } = req.body;

    const newHabit = new Habits({
      user_id: userId,
      habit_name: habit_name,
      progress: {
        total_days,
      },
    });

    await newHabit.save();

    return res.status(201).json({
      message: "Habit added successfully",
      habit: newHabit,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const increment_habit_progress = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { habit_id } = req.body;

    const habit = await Habits.findById({ _id: habit_id });

    if (!habit) {
      return res.status(404).json({ error: "Habit not found" });
    }

    const progress = habit.progress;
    progress.progress_days += 1;

    await Habits.findByIdAndUpdate(
      { _id: habit_id },
      { progress },
      { new: true }
    );

    return res.status(200).json({
      message: "Habit progress incremented successfully",
      habit: progress,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const user_progress = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.params.userId;

    const habits = await Habits.find({ user_id: userId });
    const challenges = await Challenge.find({ user_id: userId });

    const result = {
      habits: habits,
      challenges: challenges,
    };

    return res.status(200).json({
      message: "User progress fetched successfully",
      progress: result,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const addChallenge = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userId, challenge_name, total_days } = req.body;

    const newChallenge = new Challenge({
      user_id: userId,
      challenge_name,
      progress: {
        total_days,
      },
    });

    await newChallenge.save();

    return res.status(201).json({
      message: "Challenge joined successfully",
      challenge: newChallenge,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const increment_challenge_progress = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { challenge_id } = req.body;

    const challenge = await Challenge.findById({ _id: challenge_id });

    if (!challenge) {
      return res.status(404).json({ error: "Challenge not found" });
    }

    const progress = challenge.progress;
    progress.progress_days += 1;

    await Challenge.findByIdAndUpdate(
      { _id: challenge_id },
      { progress },
      { new: true }
    );

    return res.status(200).json({
      message: "Challenge progress incremented successfully",
      challenge: progress,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default {
  addHabit,
  increment_habit_progress,
  user_progress,
  addChallenge,
  increment_challenge_progress,
};
