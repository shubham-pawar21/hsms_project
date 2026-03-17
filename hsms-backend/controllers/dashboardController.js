import Complaint from "../models/Complaint.js";
import Notice from "../models/Notice.js";
import Maintenance from "../models/Maintenance.js";
import Member from "../models/Member.js";
import User from "../models/User.js";

// ================= ADMIN DASHBOARD =================
export const getDashboardStats = async (req, res) => {
  try {
    const totalMembers = await Member.countDocuments();

    // ✅ Only count (no logs)
    const openComplaints = await Complaint.countDocuments({
      status: { $in: ["pending", "in-progress"] },
    });

    const newNotices = await Notice.countDocuments();

    const bills = await Maintenance.aggregate([
      { $match: { status: "Pending" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.json({
      totalMembers,
      openComplaints,
      newNotices,
      pendingBills: bills[0]?.total || 0,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ================= MEMBER DASHBOARD =================
export const getMemberDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user || !user.flatNo) {
      return res.status(404).json({
        message: "Flat not assigned to this member",
      });
    }

    const myComplaints = await Complaint.countDocuments({
      createdBy: userId,
    });

    const notices = await Notice.countDocuments();

    const bills = await Maintenance.aggregate([
      {
        $match: {
          flatNo: user.flatNo,
          status: "Pending",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    res.json({
      myComplaints,
      notices,
      pendingBills: bills[0]?.total || 0,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
