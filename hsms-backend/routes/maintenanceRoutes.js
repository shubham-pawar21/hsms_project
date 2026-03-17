// import express from "express";
// import {
//   getMaintenance,
//   addMaintenance,
//   updateMaintenance,
//   deleteMaintenance,
// } from "../controllers/maintenanceController.js";

// import { protect, adminOnly } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.get("/", protect, getMaintenance);
// router.post("/", protect, adminOnly, addMaintenance);
// router.put("/:id", protect, adminOnly, updateMaintenance);
// router.delete("/:id", protect, adminOnly, deleteMaintenance);

// export default router;

import express from "express";
import {
  getMaintenance,
  addMaintenance,
  updateMaintenance,
  deleteMaintenance,
  generateMaintenance, // ✅ ADDED
} from "../controllers/maintenanceController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getMaintenance);
router.post("/", protect, adminOnly, addMaintenance);
router.post("/generate", protect, adminOnly, generateMaintenance); // ✅ NEW ROUTE
router.put("/:id", protect, adminOnly, updateMaintenance);
router.delete("/:id", protect, adminOnly, deleteMaintenance);

export default router;
