import express from "express";
import {
  createNotice,
  getAllNotices,
  deleteNotice,
} from "../controllers/noticeController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// 🔓 View notices (Admin + Member)
router.get("/", protect, getAllNotices);

// 🔒 Admin only
// router.post("/", protect, adminOnly, createNotice);
router.post("/", protect, adminOnly, upload.single("image"), createNotice);
router.delete("/:id", protect, adminOnly, deleteNotice);

export default router;
