import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "regenerator-runtime/runtime";
import { Activity, Mic, MicOff, PlusCircle, XCircle } from "lucide-react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { API_BASE_URL } from "../utils/urlApi";

const Symptoms = () => {
  const [symptoms, setSymptoms] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isClearing, setIsClearing] = useState(false); // Prevents speech from overriding manual clear

  // Speech Recognition Hook
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  // Sync speech input with symptoms (only if not manually clearing)
  useEffect(() => {
    if (!isClearing) {
      setSymptoms(transcript);
    }
  }, [transcript, isClearing]);

  // Handle Voice Input
  const handleVoiceInput = () => {
    if (!listening) {
      SpeechRecognition.startListening({ continuous: true, language: "en-US" });
    } else {
      SpeechRecognition.stopListening();
    }
  };

  // Handle Clear Input
  const handleClear = () => {
    setIsClearing(true); // Prevent speech input update
    setSymptoms("");
    resetTranscript(); // Reset speech recognition transcript
    setTimeout(() => setIsClearing(false), 500); // Re-enable speech updates after clearing
  };

  // Handle Symptom Check
  const handleCheckSymptoms = async () => {
    if (!symptoms.trim()) {
      setError("Please enter symptoms.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("user_input", symptoms);

      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch prediction");
      }

      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1C2529]">
      <Header />
      <main className="container mx-auto px-4 pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Activity className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-4">
              Check Your Symptoms
            </h1>
            <p className="text-white/80">
              Track your symptoms and get preliminary diagnoses
            </p>
          </div>

          <div className="space-y-6">
            <div className="glass-morphism rounded-lg p-6">
              <div className="flex gap-4 mb-6">
                <Input
                  value={symptoms} // Keeps updated with speech input
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Enter your symptoms or use voice input..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
                <Button
                  className="bg-primary hover:bg-primary/90"
                  onClick={handleCheckSymptoms}
                  disabled={loading}
                >
                  {loading ? "Checking..." : "Check"}
                </Button>
                <Button
                  className="bg-secondary hover:bg-secondary/80"
                  onClick={handleVoiceInput}
                >
                  {listening ? <MicOff className="text-red-500" /> : <Mic />}
                </Button>
                <Button
                  className="bg-red-500 hover:bg-red-600"
                  onClick={handleClear}
                >
                  <XCircle />
                </Button>
              </div>

              {error && <p className="text-red-500">{error}</p>}

              {prediction && (
                <div className="mt-4 p-4 bg-white/10 rounded-lg">
                  <h2 className="text-lg font-semibold text-white">
                    Prediction Result:
                  </h2>
                  <p className="text-white">
                    Main Disease: {prediction.main_disease}
                  </p>
                  <p className="text-white">
                    Sub Disease: {prediction.sub_disease}
                  </p>
                </div>
              )}
            </div>

            <div className="glass-morphism rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Common Symptoms
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Headache",
                  "Fever",
                  "Cough",
                  "Fatigue",
                  "Nausea",
                  "Chest Pain",
                ].map((symptom) => (
                  <Button
                    key={symptom}
                    variant="outline"
                    className="justify-start text-white border-white/20 hover:bg-white/10"
                    onClick={() => setSymptoms(symptom)}
                  >
                    {symptom}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Symptoms;
