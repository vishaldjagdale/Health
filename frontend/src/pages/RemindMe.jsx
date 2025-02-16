import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlarmClock, Bell, CalendarClock, Trash2, CheckCircle } from "lucide-react";

const generateDays = () => {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() - i);
    return { date: date.toDateString(), taken: false };
  }).reverse();
};

const RemindMe = () => {
  const [medicineName, setMedicineName] = useState("");
  const [time, setTime] = useState("");
  const [reminders, setReminders] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [streak, setStreak] = useState(() => JSON.parse(localStorage.getItem("streak")) || generateDays());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("streak", JSON.stringify(streak));
  }, [streak]);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  };

  const addReminder = () => {
    if (!medicineName || !time) {
      alert("Please enter medicine name and time.");
      return;
    }

    const newReminder = { id: Date.now(), medicine: medicineName, time, taken: false };
    setReminders([...reminders, newReminder]);
    setMedicineName("");
    setTime("");
  };

  const removeReminder = (id) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  const toggleTaken = (id) => {
    setReminders((prevReminders) =>
      prevReminders.map((reminder) =>
        reminder.id === id ? { ...reminder, taken: !reminder.taken } : reminder
      )
    );

    // Update streak
    setStreak((prevStreak) =>
      prevStreak.map((day) =>
        day.date === new Date().toDateString() ? { ...day, taken: true } : day
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <Header />
      <main className="container mx-auto px-4 pt-24">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex justify-center">
              <Bell className="w-14 h-14 text-primary animate-bounce" />
            </div>
            <h1 className="text-4xl font-extrabold text-white mt-4">Medicine Reminder</h1>
            <p className="text-white/80 mt-2 text-lg">Never forget to take your medicines on time!</p>
          </div>

          {/* Digital Clock Section */}
          <div className="flex justify-center items-center bg-white/10 p-4 rounded-lg border border-white/20 shadow-lg mb-6">
            <CalendarClock className="w-10 h-10 text-accent mr-3" />
            <p className="text-3xl font-mono text-white">{formatTime(currentTime)}</p>
          </div>

          {/* Reminder Input Section */}
          <div className="glass-morphism p-6 rounded-xl shadow-lg backdrop-blur-lg border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                placeholder="Medicine Name"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                value={medicineName}
                onChange={(e) => setMedicineName(e.target.value)}
              />
              <Input
                type="time"
                className="bg-white/10 border-white/20 text-white"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
              <Button className="bg-primary hover:bg-primary/90 w-full flex items-center justify-center" onClick={addReminder}>
                <AlarmClock className="w-5 h-5 mr-2" />
                Set Reminder
              </Button>
            </div>
          </div>

          {/* Reminder List Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Your Reminders</h2>
            {reminders.length > 0 ? (
              <ul className="space-y-4">
                {reminders.map((reminder) => (
                  <li
                    key={reminder.id}
                    className={`flex justify-between items-center p-4 rounded-lg shadow-md border border-white/20 ${
                      reminder.taken ? "bg-green-800/30 text-white/50 line-through" : "bg-white/10 text-white"
                    }`}
                  >
                    <div>
                      <p className="text-lg font-medium">{reminder.medicine}</p>
                      <p className="text-sm">Reminder Time: {reminder.time}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant={reminder.taken ? "secondary" : "success"}
                        onClick={() => toggleTaken(reminder.id)}
                      >
                        <CheckCircle className="w-5 h-5" />
                      </Button>
                      <Button variant="destructive" onClick={() => removeReminder(reminder.id)}>
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white/50 text-center text-lg">No reminders set yet.</p>
            )}
          </div>

          {/* Streak Tracker */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Your Streak</h2>
            <div className="flex gap-2 justify-center bg-gray-800 p-4 rounded-lg">
              {streak.map((day, index) => (
                <div
                  key={index}
                  className={`w-10 h-10 rounded-md ${
                    day.taken ? "bg-green-500" : "bg-gray-700"
                  } flex items-center justify-center`}
                  title={day.date}
                ></div>
              ))}
            </div>
            <p className="text-center mt-2 text-sm opacity-70 text-white">Track your medicine intake over the last 7 days</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RemindMe;
