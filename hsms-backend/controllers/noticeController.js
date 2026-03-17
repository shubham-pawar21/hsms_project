import Notice from "../models/Notice.js";

// 🔒 ADMIN — Create Notice
export const createNotice = async (req, res) => {
  try {
    const { title, message } = req.body;

    if (!title || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const notice = await Notice.create({
      title,
      message,
      image: req.file ? req.file.path : "",
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Notice created successfully",
      notice,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔓 ALL — Get Notices (Admin + Member)
export const getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find()
      .populate("createdBy", "name role")
      .sort({ createdAt: -1 });

    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔒 ADMIN — Delete Notice
export const deleteNotice = async (req, res) => {
  try {
    await Notice.findByIdAndDelete(req.params.id);

    res.json({ message: "Notice deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
