import mongoose from "mongoose";

const challengeSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  challenge_name: {
    type: String,
    required: true,
  },
  progress: {
    completed: {
      type: Boolean,
      default: false,
    },
    progress_days: {
      type: Number,
      default: 0,
    },
    total_days: {
      type: Number,
      required: true,
    },
    start_date: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
});

challengeSchema.pre("save", function (next) {
  if (this.progress instanceof Map) {
    for (let [_, value] of this.progress) {
      if (value.total_days === value.progress_days) {
        value.completed = true;
      }
    }
  }
  next();
});

const Challenge = mongoose.model("Challenge", challengeSchema);
export default Challenge;
