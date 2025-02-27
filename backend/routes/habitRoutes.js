import express from "express";
import { createHabit, getHabits, updateHabitProgress, deleteHabit } from "../controllers/habitController.js";
import  protect  from "../middleware/auth.js"; // Ensure user authentication

const router = express.Router();

router.post("/", protect, createHabit);
router.get("/", protect, getHabits);
router.put("/progress", protect, updateHabitProgress);
router.delete("/:id", protect, deleteHabit);

export default router;
