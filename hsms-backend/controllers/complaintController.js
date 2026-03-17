import Complaint from "../models/Complaint.js";

// 🔹 CREATE COMPLAINT (MEMBER)
export const createComplaint = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const complaint = await Complaint.create({
      title,
      description,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Complaint submitted successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 GET ALL COMPLAINTS (ADMIN)
export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("createdBy", "name email role")
      .sort({ createdAt: -1 });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 GET MY COMPLAINTS (MEMBER)
export const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      createdBy: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 UPDATE COMPLAINT STATUS (ADMIN) ✅ FIXED VERSION
export const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // ✅ Allowed statuses only
    const allowedStatus = ["pending", "in-progress", "resolved"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.status = status;
    await complaint.save();

    res.json({
      message: "Complaint status updated successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// 🔹 DELETE COMPLAINT (Admin OR Owner)
export const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    // Admin OR complaint owner
    if (
      req.user.role !== "admin" &&
      complaint.createdBy.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    await complaint.deleteOne();

    res.json({ message: "Complaint deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
