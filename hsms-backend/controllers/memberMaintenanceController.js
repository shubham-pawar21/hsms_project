import Maintenance from "../models/Maintenance.js";
import User from "../models/User.js";

export const getMemberMaintenance = async (req, res) => {
  try {
    // logged-in user id
    const userId = req.user.id;

    // user ka flatNo nikalo
    const user = await User.findById(userId);

    if (!user || !user.flatNo) {
      return res.status(404).json({ message: "Flat not assigned to user" });
    }

    // us flat ke maintenance bills
    const bills = await Maintenance.find({ flatNo: user.flatNo });

    res.status(200).json(bills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


// 🔥 PAY BILL
export const payMemberBill = async (req, res) => {
  try {
    const billId = req.params.id;
    const bill = await Maintenance.findById(billId);
    if (!bill) return res.status(404).json({ message: "Bill not found" });

    const user = await User.findById(req.user.id);
    if (!user || user.flatNo !== bill.flatNo) {
      return res.status(403).json({ message: "Not authorized to pay this bill" });
    }

    bill.status = "Paid";
    await bill.save();

    res.json({ message: "Bill paid successfully", bill });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
