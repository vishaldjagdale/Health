import express from "express";
import authController from "../controllers/authController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", auth, authController.logout);
// router.post("/forgotpassword", authController.forgotpassword);

// Password reset routes
router.post("/send-otp", authController.sendOTP);
router.post("/verify-otp", authController.verifyOTP);
router.post("/reset-password", authController.resetPassword);

export default router;
