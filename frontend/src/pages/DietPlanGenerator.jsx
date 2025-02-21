import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Utensils, Apple } from "lucide-react";

const DietPlanGenerator = () => {
  const [userData, setUserData] = useState({
    age: "",
    weight: "",
    height: "",
    condition: "",
  });

  const [dietPlan, setDietPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to calculate BMI
  const calculateBMI = (weight, height) => {
    if (!weight || !height) return null;
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  // Function to generate a diet plan based on age groups
  const generateDietPlan = () => {
    const { age, weight, height, condition } = userData;

    if (!age || !weight || !height || !condition) {
      setError("Please fill all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    setTimeout(() => {
      const ageNum = parseInt(age, 10);
      const bmi = calculateBMI(weight, height);

      const dietPlans = {
        child: {
          description: "Healthy diet plan for children (5-12 years)",
          meals: {
            breakfast: { name: "Oatmeal with banana", calories: 250 },
            snack1: { name: "Greek yogurt with honey", calories: 150 },
            lunch: { name: "Grilled cheese sandwich with fruit", calories: 400 },
            snack2: { name: "Carrot sticks & hummus", calories: 120 },
            dinner: { name: "Baked chicken with mashed potatoes", calories: 500 },
          },
        },
        teenager: {
          description: "Balanced diet for teenagers (13-19 years)",
          meals: {
            breakfast: { name: "Eggs & whole-grain toast", calories: 350 },
            snack1: { name: "Protein shake with nuts", calories: 200 },
            lunch: { name: "Chicken rice bowl with veggies", calories: 500 },
            snack2: { name: "Apple with peanut butter", calories: 180 },
            dinner: { name: "Salmon with quinoa & spinach", calories: 600 },
          },
        },
        adult: {
          description: "Healthy diet for you!",
          meals: {
            breakfast: { name: "Avocado toast with eggs", calories: 400 },
            snack1: { name: "Mixed nuts & dark chocolate", calories: 250 },
            lunch: { name: "Grilled chicken with quinoa salad", calories: 550 },
            snack2: { name: "Chia pudding with berries", calories: 200 },
            dinner: { name: "Lean mutton stir-fry with brown rice", calories: 650 },
          },
        },
        senior: {
          description: "Elderly-friendly diet (50+ years)",
          meals: {
            breakfast: { name: "Smoothie with flaxseeds", calories: 300 },
            snack1: { name: "Boiled eggs with almonds", calories: 180 },
            lunch: { name: "Grilled salmon with steamed vegetables", calories: 500 },
            snack2: { name: "Cottage cheese with berries", calories: 160 },
            dinner: { name: "Vegetable soup with whole wheat bread", calories: 450 },
          },
        },
      };

      let selectedPlan;
      if (ageNum >= 5 && ageNum <= 12) selectedPlan = dietPlans.child;
      else if (ageNum >= 13 && ageNum <= 19) selectedPlan = dietPlans.teenager;
      else if (ageNum >= 20 && ageNum <= 50) selectedPlan = dietPlans.adult;
      else if (ageNum > 50) selectedPlan = dietPlans.senior;
      else selectedPlan = { description: "No suitable diet plan found", meals: {} };

      setDietPlan(selectedPlan);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-2xl border border-white/20"
      >
        <div className="text-center mb-8">
          <motion.div initial={{ y: -20 }} animate={{ y: 0 }} className="inline-block mb-4">
            <Apple className="w-12 h-12 text-green-400" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white">Personalized Diet Plan</h2>
        </div>

        {/* User Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {[
            { label: "Age", key: "age", type: "number" },
            { label: "Weight (kg)", key: "weight", type: "number" },
            { label: "Height (cm)", key: "height", type: "number" },
            { label: "Health Condition", key: "condition", type: "text" },
          ].map(({ label, key, type }) => (
            <Input
              key={key}
              type={type}
              placeholder={label}
              value={userData[key]}
              onChange={(e) => setUserData({ ...userData, [key]: e.target.value })}
              className="bg-gray-800/50 border-gray-700 text-white p-2"
            />
          ))}
        </div>

        {/* Generate Button */}
        <Button
          className="w-full bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 h-12 text-lg"
          onClick={generateDietPlan}
          disabled={loading}
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Utensils className="w-5 h-5 mr-2" />}
          {loading ? "Generating..." : "Generate Diet Plan"}
        </Button>

        {error && <p className="text-red-400 mt-2">{error}</p>}

        {/* Display Diet Plan */}
        {dietPlan && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
            <Card className="bg-gray-900/50 backdrop-blur-lg border border-white/10">
              <CardHeader>
                <CardTitle className="text-xl text-white">{dietPlan.description}</CardTitle>
              </CardHeader>
              <CardContent>
                {Object.entries(dietPlan.meals).length > 0 ? (
                  Object.entries(dietPlan.meals).map(([mealType, meal]) => (
                    <div key={mealType} className="p-4 bg-gray-800/50 rounded-xl mt-2">
                      <p className="text-white font-semibold">{mealType.toUpperCase()}: {meal.name} ({meal.calories} kcal)</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No meal plan available.</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default DietPlanGenerator;
