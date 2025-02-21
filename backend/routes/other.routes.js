import express from "express";
import auth from "../middleware/auth.js";
import otherController from "../controllers/otherController.js";
import reminderController from "../controllers/reminderController.js";

const router = express.Router();

router.post("/add-habit", auth, otherController.addHabit);
router.put(
  "/increment-habit-progress",
  auth,
  otherController.increment_habit_progress
);
router.get("/user-progress/:userId", auth, otherController.user_progress);
router.post("/add-challenge", auth, otherController.addChallenge);
router.put(
  "/increment-challenge-progress",
  auth,
  otherController.increment_challenge_progress
);
router.post("/add-reminder", auth, reminderController.addReminder);
router.get("/get-reminders/:Id", auth, reminderController.getReminders);
router.delete("/delete-reminder", auth, reminderController.deleteReminder);

export default router;
