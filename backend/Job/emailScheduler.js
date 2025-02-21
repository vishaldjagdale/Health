import Reminder from "../models/Reminder.js";
import User from "../models/User.js";
import sendMail from "../utils/sendMail.reminder.js";

async function checkAndSendReminders() {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const reminders = await Reminder.find({
    hour: currentHour,
    minute: currentMinute,
  });

  if (reminders.length === 0) {
    console.log("No reminders to send");
    return;
  }

  for (const reminder of reminders) {
    const { userId, title } = reminder;
    const user = await User.findById(userId);
    const email = user.email;
    const subject = "Reminder About Medicines";
    const text = title;

    await sendMail(email, subject, text);
    console.log("Reminder sent to", email);
  }
}

const startEmailScheduler = () => {
  //   console.log("Email scheduler running .......... ");
  setInterval(checkAndSendReminders, 60 * 1000); // Check every minute
};

export default startEmailScheduler;
