import express from "express";
import { getHealthNews } from "../controllers/newsController.js";
// import protect from "../middleware/auth.js";

const router = express.Router();

router.get("/news", getHealthNews);

export default router;
