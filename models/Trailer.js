import mongoose from "mongoose";

export const trailerSchema = new mongoose.Schema(
  {
    reference: { type: String, required: true, unique: true },
    trailerNumber: {
      type: String,
      required: true,
    },
    contractor: String,
    sentDate: {
      type: Date,
      required: true,
    },
    deliveryDate: {
      type: Date,
      required: true,
    },
    received: { type: Date, default: null },
    clearance: { type: Date, default: null },
    loadType: String,
    freightType: String,
    cert: { type: Boolean, default: false },
    alcohol: { type: Boolean, default: false },
    extraCost: { cost: { type: Number, default: 0 }, comment: String },
    algecirasFerry: { cost: { type: Number, default: 0 } },
    rejectedBySIVEP: { cost: { type: Number, default: 0 } },
    holdOver: {
      days: { type: Number, default: 0 },
      cost: { type: Number, default: 0 },
    },
    nonStop: { cost: { type: Number, default: 0 } },
    crossed: String,
    comments: String,
    late: { type: Boolean, default: false },
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
