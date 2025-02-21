import mongoose from "mongoose";

const ReminderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  hour: {
    type: Number,
    required: true,
    max: 23,
    min: 0,
  },
  minute: {
    type: Number,
    required: true,
    max: 59,
    min: 0,
  },
});

const Reminder = mongoose.model("Reminder", ReminderSchema);

export default Reminder;
