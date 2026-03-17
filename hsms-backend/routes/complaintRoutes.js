import express from "express";
import {
  createComplaint,
  getAllComplaints,
  getMyComplaints,
  updateComplaintStatus,
  deleteComplaint,
} from "../controllers/complaintController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔒 MEMBER — Create complaint
router.post("/", protect, createComplaint);

// 🔒 MEMBER — My complaints
router.get("/my", protect, getMyComplaints);

// 🔒 ADMIN — All complaints
router.get("/", protect, adminOnly, getAllComplaints);

// 🔒 ADMIN — Update complaint status
router.put("/:id", protect, adminOnly, updateComplaintStatus);

// 🔒 DELETE complaint (Admin OR Owner)
router.delete("/:id", protect, deleteComplaint);

export default router;
