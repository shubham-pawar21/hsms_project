import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    flatNumber: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "member",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Member", memberSchema);
