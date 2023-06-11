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
    extraCost: {
      type: Map,
      of: {
        cost: { type: Number, default: 0 },
      },
      default: new Map([
        ["algecirasFerry", { cost: 50 }],
        ["rejectedBySIVEP", { cost: 50 }],
        ["holdOver", { days: 0, cost: 50 }],
        ["nonStop", { cost: 50 }],
      ]),
    },
    crossed: String,
    comments: String,
    late: { type: Boolean, default: false },
    products: [
      {
        name: String,
        cases: Number,
        pallets: Number,
        category: String,
      },
    ],
    editedBy: {
      name: String,
      email: String,
    },
    createdBy: {
      name: String,
      email: String,
    },
  },

  { timestamps: true }
);

export default mongoose.model("Trailer", trailerSchema);
