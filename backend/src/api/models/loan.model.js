import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    tenure: {
      type: Number, // in months
      required: true,
    },
    purpose: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Loan = mongoose.model("Loan", loanSchema);

export default Loan;
