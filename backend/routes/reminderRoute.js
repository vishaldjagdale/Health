import express from "express";
import { check } from "express-validator";
import reminderController from "../controllers/reminderController.js";

const router = express.Router();

router.post(
    "/add", [
        check("userId").notEmpty().withMessage("User ID is required"),
        check("reminderText").notEmpty().withMessage("Reminder text is required"),
        check("hour").isInt({ min: 0, max: 23 }).withMessage("Hour must be between 0 and 23"),
        check("minute").isInt({ min: 0, max: 59 }).withMessage("Minute must be between 0 and 59"),
    ],
    reminderController.addReminder
);

router.get("/:userId", reminderController.getReminders);

router.delete(
    "/delete", [check("reminderId").notEmpty().withMessage("Reminder ID is required")],
    reminderController.deleteReminder
);

export default router;