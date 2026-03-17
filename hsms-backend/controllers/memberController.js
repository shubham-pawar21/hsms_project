import Member from "../models/Member.js";

export const getMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addMember = async (req, res) => {
  try {
    const { name, email, phone, flatNumber } = req.body;

    if (!name || !email || !phone || !flatNumber) {
      return res.status(400).json({ message: "All fields required" });
    }

    const memberExists = await Member.findOne({ email });
    if (memberExists) {
      return res.status(400).json({ message: "Member already exists" });
    }

    const member = await Member.create({
      name,
      email,
      phone,
      flatNumber,
    });

    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMember = async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.json({ message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
