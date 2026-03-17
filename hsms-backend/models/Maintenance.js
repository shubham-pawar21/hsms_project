import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema(
  {
    flatNo: {
      type: String,
      required: true,
    },
    memberName: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Maintenance", maintenanceSchema);
