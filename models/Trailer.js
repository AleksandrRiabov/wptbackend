import mongoose from "mongoose";

const trailerSchema = new mongoose.Schema(
  {
    reference: { type: String, required: true, unique: true },
    sentDate: {
      type: Date,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    received: Date,
    clearance: Date,
    loadType: String,
    freightType: String,
    cert: { type: Boolean, default: false },
    extraCost: { cost: Number, comment: String },
    algecirasFerry: { cost: Number },
    rejectedBySIVEP: { cost: Number },
    holdOver: { days: Number, cost: Number },
    nonStop: { cost: Number },
    crossed: String,
    products: [
      {
        name: String,
        cases: String,
        pallets: String,
        category: String,
      },
    ],
    editedBy: [
      {
        name: String,
        date: Date,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Trailer", trailerSchema);
