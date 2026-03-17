import express from "express";
import {
  getMembers,
  addMember,
  updateMember,
  deleteMember,
} from "../controllers/memberController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// CRUD routes
router.get("/", protect, adminOnly, getMembers);
router.post("/", protect, adminOnly, addMember);
router.put("/:id", protect, adminOnly, updateMember);
router.delete("/:id", protect, adminOnly, deleteMember);

export default router;
