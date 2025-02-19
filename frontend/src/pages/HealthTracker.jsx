import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";

const API_BASE_URL = "http://localhost:8000"; // Update with your FastAPI backend URL

const HealthTracker = () => {
  const [userId, setUserId] = useState("");
  const [habitName, setHabitName] = useState("");
  const [progress, setProgress] = useState("");
  const [challengeName, setChallengeName] = useState("");
  const [completedDays, setCompletedDays] = useState("");
  const [userProgress, setUserProgress] = useState(null);

  // Fetch user progress when userId is entered
  useEffect(() => {
    if (userId) {
      fetchUserProgress();
    }
  }, [userId]);

  // Track Habit Function
  const trackHabit = async () => {
    if (!userId || !habitName || !progress) {
      alert("Please fill all habit fields.");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/track-habit`, {
        user_id: userId,
        habit_name: habitName,
        progress: parseInt(progress),
      });

      setHabitName("");
      setProgress("");
      fetchUserProgress();
    } catch (error) {
      console.error("Error tracking habit:", error);
    }
  };

  // Join Challenge Function
  const joinChallenge = async () => {
    if (!userId || !challengeName || !completedDays) {
      alert("Please fill all challenge fields.");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/join-challenge`, {
        user_id: userId,
        challenge_name: challengeName,
        completed_days: parseInt(completedDays),
      });

      setChallengeName("");
      setCompletedDays("");
      fetchUserProgress();
    } catch (error) {
      console.error("Error joining challenge:", error);
    }
  };

  // Fetch User Progress
  const fetchUserProgress = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user-progress/${userId}`);
      setUserProgress(response.data);
    } catch (error) {
      console.error("Error fetching progress:", error);
    }
  };

  // Increment Habit Progress
  const incrementHabit = async (habitName) => {
    try {
      await axios.post(`${API_BASE_URL}/increment-habit`, {
        user_id: userId,
        habit_name: habitName,
      });
      fetchUserProgress(); // Refresh UI after increment
    } catch (error) {
      console.error("Error incrementing habit:", error);
    }
  };

  // Increment Challenge Progress
  const incrementChallenge = async (challengeName) => {
    try {
      await axios.post(`${API_BASE_URL}/increment-challenge`, {
        user_id: userId,
        challenge_name: challengeName,
      });
      fetchUserProgress(); // Refresh UI after increment
    } catch (error) {
      console.error("Error incrementing challenge:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">🏋️‍♂️ Health & Habit Tracker</h2>

      <Label>User ID</Label>
      <Input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="mb-4"
      />

      <div className="grid grid-cols-2 gap-4">
        {/* Habit Tracking */}
        <Card>
          <CardHeader>Track Habit</CardHeader>
          <CardContent>
            <Label>Habit Name</Label>
            <Input
              type="text"
              placeholder="e.g. Running"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              className="mb-2"
            />
            <Label>Progress (Days Completed)</Label>
            <Input
              type="number"
              placeholder="e.g. 10"
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
              className="mb-3"
            />
            <Button onClick={trackHabit} className="w-full">
              Add Habit
            </Button>
          </CardContent>
        </Card>

        {/* Challenge Tracking */}
        <Card>
          <CardHeader>Join Challenge</CardHeader>
          <CardContent>
            <Label>Challenge Name</Label>
            <Input
              type="text"
              placeholder="e.g. 30-Day Yoga"
              value={challengeName}
              onChange={(e) => setChallengeName(e.target.value)}
              className="mb-2"
            />
            <Label>Completed Days</Label>
            <Input
              type="number"
              placeholder="e.g. 15"
              value={completedDays}
              onChange={(e) => setCompletedDays(e.target.value)}
              className="mb-3"
            />
            <Button onClick={joinChallenge} className="w-full bg-red-500 hover:bg-red-600">
              Join Challenge
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* User Progress Display */}
      {userProgress && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold">📊 User Progress</h3>

          {/* Habits List */}
          {userProgress.habits.length > 0 ? (
            <div className="mt-3 space-y-3">
              {userProgress.habits.map((habit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{habit.habit_name} - {habit.progress}/30 days</p>
                    <Progress value={(habit.progress / 30) * 100} className="mt-1" />
                  </div>
                  <Button size="sm" onClick={() => incrementHabit(habit.habit_name)}>+1</Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-gray-500">No habits tracked yet.</p>
          )}

          {/* Challenges List */}
          {userProgress.challenges.length > 0 ? (
            <div className="mt-3 space-y-3">
              {userProgress.challenges.map((challenge, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{challenge.challenge_name} - {challenge.completed_days}/30 days</p>
                    <Progress value={(challenge.completed_days / 30) * 100} className="mt-1 bg-orange-500" />
                  </div>
                  <Button size="sm" onClick={() => incrementChallenge(challenge.challenge_name)}>+1</Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-gray-500">No challenges joined yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default HealthTracker;
