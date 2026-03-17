// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// // ================= REGISTER =================
// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password, role, flatNo } = req.body;

//     // check existing user
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // create user
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role: role || "member",
//       flatNo: role === "member" ? flatNo : undefined,
//     });

//     res.status(201).json({
//       message: "User registered successfully",
//       user: {
//         id: user._id,
//         name: user.name,
//         role: user.role,
//         flatNo: user.flatNo,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ================= LOGIN =================
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" },
//     );

//     res.json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         role: user.role,
//         flatNo: user.flatNo,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

import User from "../models/User.js";
import Member from "../models/Member.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ================= REGISTER =================
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, flatNo, phone } = req.body;

    // check existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ VALIDATION (only for member)
    if (role === "member" && !phone) {
      return res.status(400).json({ message: "Phone is required" });
    }

    if (role === "member" && !flatNo) {
      return res
        .status(400)
        .json({ message: "Flat Number is required" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // check if admin already exists
    const adminExists = await User.findOne({ role: "admin" });

    // ❌ restrict multiple admins
    if (adminExists && role === "admin") {
      return res.status(400).json({ message: "Admin already exists" });
    }

    let newRole = role || "member";

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: newRole,
      flatNo: newRole === "member" ? flatNo : undefined,
    });

    // create member (only if member)
    if (newRole === "member") {
      await Member.create({
        name,
        email,
        phone,
        flatNumber: flatNo,
      });
    }

    // ✅ AUTO LOGIN TOKEN
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        flatNo: user.flatNo,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= LOGIN =================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        flatNo: user.flatNo,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
