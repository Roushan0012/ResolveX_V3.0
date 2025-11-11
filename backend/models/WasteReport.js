import mongoose from "mongoose";

const wasteReportSchema = new mongoose.Schema(
  {
    wasteType: { type: String, required: true },
    location: { type: String, required: true },
    landmark: { type: String },
    description: { type: String, required: true },
    files: [{ type: String }], // store URLs or filenames
    status: {
      type: String,
      enum: ["pending", "reviewed", "resolved"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("WasteReport", wasteReportSchema);
