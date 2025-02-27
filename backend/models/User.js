import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const chatHistorySchema = new mongoose.Schema({
  message: String,
  response: String,
  timestamp: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    chatHistory: [chatHistorySchema],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  // if (!this.isModified("password")) return next();

  // try {
  //   const salt = await bcrypt.genSalt(10);
  //   this.password = await bcrypt.hash(this.password, salt);
    next();
  // } catch (error) {
  //   next(error);
  // }
});

// userSchema.methods.comparePassword = async function (candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// };

const User = mongoose.model("User", userSchema);

export default User;
