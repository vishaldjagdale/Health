import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"; // Change from "bcrypt" to "bcryptjs"
import nodemailer from "nodemailer";
import { validationResult } from "express-validator";
import ENV_VARS from "../utils/ENV_Var.js";
import dotenv from "dotenv";
dotenv.config();

// 🔹 REGISTER
const register = async (req, res) => {
  try {
    const { username, email, password, avatar } = req.body;
    // console.log(req.body);

    // 🔹 Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Plain Password:", password);
    console.log("Hashed Password:", hashedPassword);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      avatar,
    });
    console.log(user);

    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    // ✅ Return user details
    res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 🔹 LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Received request:", req.body);

    const user = await User.findOne({ email });
    console.log("User found in DB:", user);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    console.log("Stored hashed password:", user.password);
    console.log("Password to compare:", password);

    // 🔹 Ensure password comparison works
    const isValid = await bcrypt.compare(password, user.password);
    console.log("Password comparison result:", isValid);

    if (!isValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 🔹 FORGOT PASSWORD
const forgotPassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate(
      { email },
      { $set: { password: hashedPassword } },
      { new: true }
    );

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 🔹 LOGOUT
const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Temporary OTP storage (use Redis in production)
const OTPs = {};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ENV_VARS.NODEMAILER_EMAIL,
    pass: ENV_VARS.NODEMAILER_PW,
  },
});

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = generateOTP();
    // console.log(otp);
    OTPs[email] = {
      code: otp,
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
    };

    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}\nValid for 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!OTPs[email] || OTPs[email].code !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (Date.now() > OTPs[email].expiresAt) {
      delete OTPs[email];
      return res.status(400).json({ message: "OTP has expired" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    // Set token in cookie
    res.cookie("reset_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 10 * 60 * 1000, // 10 minutes
    });

    delete OTPs[email];
    res.json({ message: "OTP verified" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const token = req.cookies.reset_token;

    if (!token) {
      return res.status(401).json({ message: "No reset token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded.email);

    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate(
      { email: decoded.email },
      { $set: { password: hashedPassword } }
    );

    // Clear the reset token cookie
    res.cookie("reset_token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.json({ message: "Password reset successful" });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    res.status(500).json({ error: error.message });
  }
};

export default {
  register,
  login,
  logout,
  forgotPassword,
  sendOTP,
  verifyOTP,
  resetPassword,
};
