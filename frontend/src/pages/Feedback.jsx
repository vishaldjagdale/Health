import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Star, ThumbsUp, ThumbsDown, Loader2 } from "lucide-react";

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
      
      <main className="container mx-auto px-4 pt-12">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="mb-4 animate-fade-in">
              <MessageSquare className="w-12 h-12 text-primary mx-auto" />
            </div>
            <h1 className="text-3xl font-semibold text-white mb-2">Feedback & Improvement</h1>
            <p className="text-white/60">Help us enhance our diagnostic accuracy</p>
          </div>

          {/* Feedback Form */}
          <div className="bg-white/5 rounded-xl p-6 mb-8 border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Star Rating */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-white/80">Experience Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setRating(num)}
                      className={`p-2 transition-colors ${
                        rating >= num ? "text-yellow-400" : "text-white/30 hover:text-yellow-300"
                      }`}
                    >
                      <Star className="w-6 h-6 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Accuracy Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-white/80">Diagnosis Accuracy</label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    type="button"
                    variant={accuracy === "Accurate" ? "default" : "secondary"}
                    onClick={() => setAccuracy("Accurate")}
                    className="h-10"
                  >
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Accurate
                  </Button>
                  <Button
                    type="button"
                    variant={accuracy === "Partially Accurate" ? "default" : "secondary"}
                    onClick={() => setAccuracy("Partially Accurate")}
                    className="h-10"
                  >
                    Partial
                  </Button>
                  <Button
                    type="button"
                    variant={accuracy === "Not Accurate" ? "default" : "secondary"}
                    onClick={() => setAccuracy("Not Accurate")}
                    className="h-10"
                  >
                    <ThumbsDown className="w-4 h-4 mr-2" />
                    Inaccurate
                  </Button>
                </div>
              </div>

              {/* Comments */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-white/80">Additional Comments</label>
                <Textarea
                  placeholder="Your detailed feedback helps us improve..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="bg-white/5 border-white/10 placeholder:text-white/30 min-h-[100px]"
                />
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full" 
                disabled={submitting}
              >
                {submitting ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                ) : null}
                {submitting ? "Submitting..." : "Submit Feedback"}
              </Button>
            </form>
          </div>

          {/* Feedback List */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-white mb-4">Recent Feedback</h2>
            <div className="space-y-4">
              {feedbacks.map((feedback, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < feedback.rating ? "fill-current" : "text-white/30"}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-white/50">{feedback.date}</span>
                    </div>
                    <span className={`text-sm px-2 py-1 rounded-md ${
                      feedback.accuracy === "Accurate" ? "bg-green-500/20 text-green-400" :
                      feedback.accuracy === "Partially Accurate" ? "bg-yellow-500/20 text-yellow-400" :
                      "bg-red-500/20 text-red-400"
                    }`}>
                      {feedback.accuracy}
                    </span>
                  </div>
                  <p className="text-white/80">{feedback.comment}</p>
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