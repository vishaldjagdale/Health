import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { MessageSquare, Star, ThumbsUp, ThumbsDown, Loader } from "lucide-react";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [accuracy, setAccuracy] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedbacks, setFeedbacks] = useState([
    { rating: 4, accuracy: "Accurate", comment: "The diagnosis was very helpful!", date: "2 days ago" },
    { rating: 5, accuracy: "Partially Accurate", comment: "Great, but could improve specialist recommendations.", date: "5 days ago" },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || !accuracy || !comment) {
      alert("Please complete all fields before submitting.");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setFeedbacks([{ rating, accuracy, comment, date: "Just now" }, ...feedbacks]);
      setRating(0);
      setAccuracy("");
      setComment("");
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#1C2529] text-white">
      <Header />
      <main className="container mx-auto px-4 pt-24">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <MessageSquare className="w-14 h-14 text-primary mx-auto mb-4 animate-bounce" />
            <h1 className="text-4xl font-bold text-white">Feedback System</h1>
            <p className="text-white/70 mt-2 text-lg">Help us improve our diagnosis accuracy</p>
          </div>

          {/* Feedback Form */}
          <div className="glass-morphism rounded-xl p-6 mb-8 shadow-lg backdrop-blur-lg border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4">How was your experience?</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Star Rating */}
              <div className="space-y-2">
                <label className="text-sm text-white/70">Rate your experience</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <Button
                      key={num}
                      type="button"
                      onClick={() => setRating(num)}
                      className={`p-2 rounded-full transition-all ${
                        rating >= num ? "bg-yellow-500 text-black" : "bg-white/10 hover:bg-white/20"
                      }`}
                    >
                      <Star className="w-6 h-6" />
                    </Button>
                  ))}
                </div>
              </div>

              {/* Diagnosis Accuracy */}
              <div className="space-y-2">
                <label className="text-sm text-white/70">Diagnosis Accuracy</label>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    onClick={() => setAccuracy("Accurate")}
                    className={`flex-1 transition-all ${
                      accuracy === "Accurate" ? "bg-green-600 text-white" : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Accurate
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setAccuracy("Partially Accurate")}
                    className={`flex-1 transition-all ${
                      accuracy === "Partially Accurate" ? "bg-yellow-600 text-white" : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    Partially Accurate
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setAccuracy("Not Accurate")}
                    className={`flex-1 transition-all ${
                      accuracy === "Not Accurate" ? "bg-red-600 text-white" : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    <ThumbsDown className="w-4 h-4 mr-2" />
                    Not Accurate
                  </Button>
                </div>
              </div>

              {/* Additional Comments */}
              <div className="space-y-2">
                <label className="text-sm text-white/70">Additional Comments</label>
                <Textarea
                  placeholder="Share your experience and suggestions..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[120px]"
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 flex justify-center items-center">
                {submitting ? <Loader className="w-5 h-5 animate-spin" /> : "Submit Feedback"}
              </Button>
            </form>
          </div>

          {/* Previous Feedback */}
          <div className="glass-morphism rounded-xl p-6 shadow-lg backdrop-blur-lg border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4">Recent Feedback</h2>
            <div className="space-y-4">
              {feedbacks.map((feedback, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10 transition-transform hover:scale-105">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex gap-1">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < feedback.rating ? "text-yellow-400" : "text-gray-500"}`} />
                        ))}
                    </div>
                    <span className="text-white/60 text-sm">{feedback.date}</span>
                  </div>
                  <p className="text-white/80">{feedback.comment}</p>
                  <p className="text-sm text-white/50 mt-1">Accuracy: {feedback.accuracy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Feedback;
