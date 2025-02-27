import express from "express";
import { getDoctors } from "../controllers/doctorController.js";

const router = express.Router();
router.get("/doctors", getDoctors);

export default router;
