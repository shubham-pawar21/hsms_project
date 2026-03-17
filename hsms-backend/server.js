import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();

import "./config/cloudinary.js"; // ⭐ IMPORTANT LINE

import authRoutes from "./routes/authRoutes.js";
import memberRoutes from "./routes/memberRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js";
import maintenanceRoutes from "./routes/maintenanceRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import memberMaintenanceRoutes from "./routes/memberMaintenanceRoutes.js";

dotenv.config();

const app = express();

// DB connect
connectDB();

// middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/member/maintenance", memberMaintenanceRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
