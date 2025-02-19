import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlarmClock, Bell, CheckCircle2, Trash2, Circle, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const generateDays = () => {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() - i);
    return { 
      date: date.toDateString(),
      taken: false,
      day: date.toLocaleDateString('en-US', { weekday: 'short' })
    };
  }).reverse();
};

const RemindMe = () => {
  const [medicineName, setMedicineName] = useState("");
  const [time, setTime] = useState("");
  const [reminders, setReminders] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [streak, setStreak] = useState(() => JSON.parse(localStorage.getItem("streak")) || generateDays());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("streak", JSON.stringify(streak));
  }, [streak]);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { 
      hour: "2-digit", 
      minute: "2-digit", 
      hour12: true 
    });
  };

  const addReminder = () => {
    if (!medicineName || !time) {
      alert("Please enter medicine name and time.");
      return;
    }

    const newReminder = { 
      id: Date.now(), 
      medicine: medicineName, 
      time, 
      taken: false 
    };
    
    setReminders([...reminders, newReminder]);
    setMedicineName("");
    setTime("");
  };

  const removeReminder = (id) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  const toggleTaken = (id) => {
    setReminders(prev => prev.map(reminder =>
      reminder.id === id ? { ...reminder, taken: !reminder.taken } : reminder
    ));

    setStreak(prev => prev.map(day => 
      day.date === new Date().toDateString() ? { ...day, taken: true } : day
    ));
  };

  const streakCount = streak.filter(day => day.taken).length;

  return (
    <div className="min-h-screen bg-[#1C2529]">
      <Header />
      
      <main className="container mx-auto px-4 pt-16">
        <div className="max-w-2xl mx-auto space-y-8">

          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
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
                {formatTime(currentTime)}
              </span>
            </div>
            <div className="text-sm text-white/60">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>

          {/* Add Reminder Form */}
          <motion.div 
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
          >
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
                  {reminders.map(reminder => (
                    <motion.li
                      key={reminder.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4"
                    >
                      <div className="flex-1">
                        <p className={`text-lg font-medium ${reminder.taken ? 'text-white/50 line-through' : 'text-white'}`}>
                          {reminder.medicine}
                        </p>
                        <p className="text-sm text-white/60">
                          {reminder.time}
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          size="icon"
                          variant={reminder.taken ? "default" : "secondary"}
                          onClick={() => toggleTaken(reminder.id)}
                        >
                          {reminder.taken ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : (
                            <Circle className="w-5 h-5" />
                          )}
                        </Button>
                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() => removeReminder(reminder.id)}
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
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

          {/* Streak Tracker */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Consistency Streak</h2>
              <span className="text-primary">{streakCount}/7 days</span>
            </div>
            
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="grid grid-cols-7 gap-2">
                {streak.map((day, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <div 
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        day.taken ? 'bg-green-500' : 'bg-white/10'
                      }`}
                    >
                      <span className="text-xs text-white/80">{day.day}</span>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${day.taken ? 'bg-green-500' : 'bg-white/10'}`} />
                  </div>
                ))}
              </div>
              
              <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-cyan-500 transition-all duration-500"
                  style={{ width: `${(streakCount / 7) * 100}%` }}
                />
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default RemindMe;