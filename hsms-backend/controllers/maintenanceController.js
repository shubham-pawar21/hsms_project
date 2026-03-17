// import Maintenance from "../models/Maintenance.js";

// //ADMIN
// // GET all maintenance
// export const getMaintenance = async (req, res) => {
//   try {
//     const data = await Maintenance.find().sort({ createdAt: -1 });
//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ADD maintenance
// export const addMaintenance = async (req, res) => {
//   const { flatNo, memberName, month, amount, dueDate, status } = req.body;

//   if (!flatNo || !memberName || !month || !amount || !dueDate) {
//     return res.status(400).json({ message: "All fields required" });
//   }

//   try {
//     const maintenance = await Maintenance.create({
//       flatNo,
//       memberName,
//       month,
//       amount,
//       dueDate,
//       status,
//     });

//     res.status(201).json(maintenance);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // UPDATE maintenance
// export const updateMaintenance = async (req, res) => {
//   try {
//     const updated = await Maintenance.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true },
//     );
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // DELETE maintenance
// export const deleteMaintenance = async (req, res) => {
//   try {
//     await Maintenance.findByIdAndDelete(req.params.id);
//     res.json({ message: "Maintenance deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };



import Maintenance from "../models/Maintenance.js";
import Member from "../models/Member.js"; // ✅ ADDED

// ================= GET ALL =================
export const getMaintenance = async (req, res) => {
  try {
    const data = await Maintenance.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= ADD =================
export const addMaintenance = async (req, res) => {
  const { flatNo, memberName, month, amount, dueDate, status } = req.body;

  if (!flatNo || !memberName || !month || !amount || !dueDate) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const maintenance = await Maintenance.create({
      flatNo,
      memberName,
      month,
      amount,
      dueDate,
      status,
    });

    res.status(201).json(maintenance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= AUTO GENERATE =================
export const generateMaintenance = async (req, res) => {
  try {
    const members = await Member.find();

    const currentMonth = new Date().toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    const dueDate = new Date();
    dueDate.setDate(10); // 10th

    let count = 0;

    for (let m of members) {
      const exists = await Maintenance.findOne({
        flatNo: m.flatNumber,
        month: currentMonth,
      });

      if (!exists) {
        await Maintenance.create({
          flatNo: m.flatNumber,
          memberName: m.name,
          month: currentMonth,
          amount: 2000,
          dueDate,
          status: "Pending",
        });

        count++;
      }
    }

    res.json({
      message: "Maintenance generated successfully",
      count,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= UPDATE =================
export const updateMaintenance = async (req, res) => {
  try {
    const updated = await Maintenance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= DELETE =================
export const deleteMaintenance = async (req, res) => {
  try {
    await Maintenance.findByIdAndDelete(req.params.id);
    res.json({ message: "Maintenance deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
