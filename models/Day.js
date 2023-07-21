import mongoose from "mongoose";

const daySchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      unique: true,
      required: true,
    },
    day: { type: String },
    products: [
      {
        name: { type: String, required: true },
        cases: { type: String, default: "" },
        pallets: { type: String, default: "" },
        category: String,
      },
    ],
    editedBy: String,
  },
  { timestamps: true }
);

export default mongoose.model("Day", daySchema);
