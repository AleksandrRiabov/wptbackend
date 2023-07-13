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
        name: String,
        cases: String,
        pallets: String,
        category: String,
      },
    ],
    editedBy: String,
  },
  { timestamps: true }
);

export default mongoose.model("Day", daySchema);
