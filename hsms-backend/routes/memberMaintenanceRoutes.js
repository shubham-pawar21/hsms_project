import express from "express";
// import { getMemberMaintenance } from "../controllers/memberMaintenanceController.js";
// isko replace karo ye se:
import { getMemberMaintenance, payMemberBill } from "../controllers/memberMaintenanceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getMemberMaintenance);

// pay bill
router.put("/pay/:id", protect, payMemberBill); // 🔥 new route

export default router;
