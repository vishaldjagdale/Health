import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { validationResult } from "express-validator";
import ENV_VARS from "../utils/ENV_Var.js";
import dotenv from "dotenv";
dotenv.config();

const register = async (req, res) => {
  try {
    const { username, email, password, avatar } = req.body;
    const user = new User({ username, email, password, avatar });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    res.json({
      token,
      message: "Login successful",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const forgotpassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { email, password } = req.body;
    password = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate(
      { email: email },
      { $set: { password: password } },
      { new: true }
    );

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

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
  forgotpassword,
  sendOTP,
  verifyOTP,
  resetPassword,
};
