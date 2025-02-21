import Reminder from "../models/Reminder.js";
import { validationResult } from "express-validator";

const addReminder = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: errors.array(),
      });
    }

    const { userId, reminderText, hour, minute } = req.body;

    const reminder = new Reminder({
      userId,
      title: reminderText,
      hour: hour,
      minute: minute,
    });

    await reminder.save();

    return res.status(200).json({
      success: true,
      data: reminder,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getReminders = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: errors.array(),
      });
    }

    const userId = req.params.Id;

    const reminders = await Reminder.find({ userId: userId });

    return res.status(200).json({
      success: true,
      data: reminders,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const deleteReminder = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: errors.array(),
      });
    }

    const { reminderId } = req.body;

    const reminder = await Reminder.findById(reminderId);

    if (!reminder) {
      return res.status(404).json({
        success: false,
        error: "Reminder not found",
      });
    }

    await Reminder.deleteOne({ _id: reminderId });

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export default { addReminder, getReminders, deleteReminder };
