import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const WhatIf = () => {
  const [question, setQuestion] = useState("");
  const [predictionData, setPredictionData] = useState(null);

  // Mock function to generate example data
  const generatePrediction = () => {
    if (!question.trim()) return alert("Please enter a 'What If' scenario.");

    // Example logic: Simulate future health improvements after quitting alcohol
    const data = [
      { month: "Now", health: 50 },
      { month: "3M", health: 65 },
      { month: "6M", health: 80 },
      { month: "1Y", health: 90 },
      { month: "2Y", health: 95 },
      { month: "5Y", health: 100 },
    ];

    setPredictionData(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Header />
      <main className="container mx-auto px-4 pt-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-white mb-6">What If Scenario</h1>
          <p className="text-white/70 mb-4">
            Enter a hypothetical scenario and visualize potential future outcomes.
          </p>

          {/* Input and Button */}
          <div className="flex gap-4 justify-center">
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What if I stop using alcohol today?"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 w-3/4"
            />
            <Button onClick={generatePrediction} className="bg-primary hover:bg-primary/90">
              Predict
            </Button>
          </div>

          {/* Graph Section */}
          {predictionData && (
            <div className="mt-8 p-6 glass-morphism rounded-lg">
              <h2 className="text-xl font-semibold text-white mb-4">Future Predictions</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={predictionData}>
                  <XAxis dataKey="month" stroke="#ffffff" />
                  <YAxis stroke="#ffffff" />
                  <Tooltip />
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                  <Line type="monotone" dataKey="health" stroke="#00c8ff" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default WhatIf;
