import Reminder from "../models/reminderModel.js";

export const addReminder = async (req, res) => {
    try {
        const { phone, medication, time } = req.body;
        const newReminder = new Reminder({ phone, medication, time });
        await newReminder.save();
        res.status(201).json({ message: "✅ Reminder added successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getReminders = async (req, res) => {
    try {
        const reminders = await Reminder.find();
        res.status(200).json(reminders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
