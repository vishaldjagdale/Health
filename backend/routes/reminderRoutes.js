import express from "express";
import { addReminder, getReminders } from "../controllers/reminderController.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.post("/add", addReminder);
router.get("/", getReminders);

export default router;
