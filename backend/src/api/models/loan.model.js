import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    loanType: {
      type: String,
      required: true,
      enum: ["personal", "education", "home", "vehicle", "business"],
    },
    amount: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number, // in months
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "approved", "rejected"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Loan = mongoose.model("Loan", loanSchema);
export default Loan;
