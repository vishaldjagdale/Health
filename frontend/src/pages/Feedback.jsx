import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Star, ThumbsUp } from "lucide-react";

const Feedback = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-4">Feedback System</h1>
            <p className="text-white/80">Help us improve our diagnosis accuracy</p>
          </div>

          <div className="glass-morphism rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Your Recent Experience</h2>
            <form className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-white/80">Rate your experience</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Button
                      key={rating}
                      variant="outline"
                      className="p-2 border-white/20 hover:bg-white/10"
                    >
                      <Star className={`w-6 h-6 ${rating <= 3 ? "text-white/60" : "text-yellow-400"}`} />
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-white/80">Diagnosis Accuracy</label>
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1 border-white/20 hover:bg-white/10">
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Accurate
                  </Button>
                  <Button variant="outline" className="flex-1 border-white/20 hover:bg-white/10">
                    Partially Accurate
                  </Button>
                  <Button variant="outline" className="flex-1 border-white/20 hover:bg-white/10">
                    Not Accurate
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-white/80">Additional Comments</label>
                <Textarea
                  placeholder="Share your experience and suggestions..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[120px]"
                />
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90">Submit Feedback</Button>
            </form>
          </div>

          <div className="glass-morphism rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Previous Feedback</h2>
            <div className="space-y-4">
              {[1, 2].map((item) => (
                <div key={item} className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex gap-1">
                      {Array(4)
                        .fill(0)
                        .map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400" />
                        ))}
                    </div>
                    <span className="text-white/60 text-sm">2 days ago</span>
                  </div>
                  <p className="text-white/80">
                    The diagnosis was very helpful and accurate. The specialist referral was particularly useful.
                  </p>
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
