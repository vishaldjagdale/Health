import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/v1"; // Adjust if backend runs on another port

// Add Reminder
export const addReminder = async(reminderData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/reminder/add`, reminderData);
        return response.data;
    } catch (error) {
        throw error.response.data || error.message;
    }
};

// Get Reminders
export const getReminders = async(userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/reminder/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response.data || error.message;
    }
};

// Delete Reminder
export const deleteReminder = async(reminderId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/reminder/delete`, { data: { reminderId } });
        return response.data;
    } catch (error) {
        throw error.response.data || error.message;
    }
};