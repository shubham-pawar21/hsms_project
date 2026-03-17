import express from "express";
import {
  getDashboardStats,
  getMemberDashboardStats,
} from "../controllers/dashboardController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/admin", protect, adminOnly, getDashboardStats);
router.get("/member", protect, getMemberDashboardStats);

export default router;
