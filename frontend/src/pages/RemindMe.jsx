import { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlarmClock, Bell, Trash2, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE_URL = "http://localhost:3000/api/v1/reminders"; 
const USER_ID = "123456"; // Replace this dynamically with the logged-in user's ID

const RemindMe = () => {
  const [medicineName, setMedicineName] = useState("");
  const [time, setTime] = useState("");
  const [reminders, setReminders] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch reminders from backend
  const fetchReminders = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/${USER_ID}`);
      setReminders(response.data.data || []);
    } catch (error) {
      console.error("Error fetching reminders:", error);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  const addReminder = async () => {
    console.log("addReminder function called"); // Debugging log
    if (!medicineName || !time) {
      alert("Please enter medicine name and time.");
      return;
    }

    const [hour, minute] = time.split(":").map(Number);

    try {
      console.log("Sending request to add reminder:", {
        userId: USER_ID,
        title: medicineName,
        hour,
        minute,
      });

      const response = await axios.post(`${API_BASE_URL}/add`, {
        userId: USER_ID,
        title: medicineName,
        hour,
        minute,
      });

      console.log("Add Reminder Response:", response.data);
      fetchReminders(); // Refresh the reminders list
      setMedicineName("");
      setTime("");
    } catch (error) {
      console.error("Error adding reminder:", error);
      alert("Failed to add reminder. Please try again.");
    }
  };

  const removeReminder = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/delete`, {
        data: { reminderId: id },
      });

      console.log("Deleted reminder:", id);
      fetchReminders(); // Refresh the reminders list
    } catch (error) {
      console.error("Error deleting reminder:", error);
      alert("Failed to delete reminder. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#1C2529]">
      <Header />
      
      <main className="container mx-auto px-4 pt-16">
        <div className="max-w-2xl mx-auto space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="relative inline-block mb-4">
              <Flame className="absolute -right-4 -top-4 w-8 h-8 text-orange-400 animate-pulse" />
              <Bell className="w-14 h-14 text-primary" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              MedTracker
            </h1>
            <p className="text-white/80 mt-2">Stay consistent with your medication schedule</p>
          </motion.div>

          {/* Time Display */}
          <div className="flex flex-col items-center gap-4 p-6 bg-white/5 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3">
              <AlarmClock className="w-8 h-8 text-primary" />
              <span className="text-3xl font-mono text-white">
                {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })}
              </span>
            </div>
          </div>

          {/* Add Reminder Form */}
          <motion.div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10" initial={{ scale: 0.95 }} animate={{ scale: 1 }}>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
              <Input
                placeholder="Medicine name"
                className="h-12 bg-white/5 border-white/10 placeholder:text-white/40"
                value={medicineName}
                onChange={(e) => setMedicineName(e.target.value)}
              />
              <div className="flex gap-4">
                <Input
                  type="time"
                  className="h-12 bg-white/5 border-white/10 flex-1"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
                <Button 
                  onClick={addReminder}
                  className="h-12 px-6 bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90"
                >
                  Add Reminder
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Reminders List */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Scheduled Medications</h2>
            
            <AnimatePresence>
              {reminders.length > 0 ? (
                <ul className="space-y-4">
                  {reminders.map((reminder) => (
                    <motion.li
                      key={reminder._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4"
                    >
                      <div className="flex-1">
                        <p className="text-lg font-medium text-white">{reminder.title}</p>
                        <p className="text-sm text-white/60">
                          {reminder.hour.toString().padStart(2, "0")}:{reminder.minute.toString().padStart(2, "0")}
                        </p>
                      </div>
                      
                      <Button size="icon" variant="destructive" onClick={() => removeReminder(reminder._id)}>
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <div className="p-8 text-center text-white/50 rounded-xl bg-white/5">
                  No medications scheduled yet
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RemindMe;