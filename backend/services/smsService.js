import twilio from "twilio";
import Reminder from "../models/reminderModel.js";
import moment from "moment";
import dotenv from "dotenv";

dotenv.config();

// Twilio Setup
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const TWILIO_PHONE = process.env.TWILIO_PHONE;  // Ensure this is your Twilio Trial Number

export const checkReminders = async () => {
    try {
        const currentTime = moment().format("HH:mm");

        const reminders = await Reminder.find({ time: currentTime });

        if (reminders.length === 0) {
            // console.log("✅ No reminders at this time.");
            return;
        }

        reminders.forEach((reminder) => {
            sendSMS(reminder.phone, reminder.medication);
        });
    } catch (error) {
        console.error("❌ Error fetching reminders:", error);
    }
};

// Send SMS Notification
const sendSMS = (to, medication) => {
    if (!to.startsWith("+")) {
        console.error(`❌ Invalid Phone Number: ${to} (Must include country code)`);
        return;
    }

    if (!TWILIO_PHONE) {
        console.error("❌ Twilio Phone Number is missing in .env file!");
        return;
    }

    twilioClient.messages
        .create({
            body: `📢 Reminder: Take your medication - ${medication}.`,
            from: TWILIO_PHONE,  // Ensure this is your Twilio Trial Number
            to
        })
        .then(message => console.log(`📨 SMS sent to ${to}: ${message.sid}`))
        .catch(error => {
            console.error(`❌ Error sending SMS to ${to}:`, error.message);
        });
};
