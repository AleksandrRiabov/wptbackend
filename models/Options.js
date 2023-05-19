import mongoose from "mongoose";

export const optionsSchema = new mongoose.Schema(
  {
    loadType: { type: [String], required: true },
    freightType: { type: [String], required: true },
    contractor: { type: [String], required: true },
    products: [
      {
        name: { type: String, required: true, unique: true },
        category: { type: String, required: true },
        temperature: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Options", optionsSchema);
