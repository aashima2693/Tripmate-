import Loan from "../models/loan.model.js";

// Create a new loan
export const createLoan = async (loanData) => {
  const loan = new Loan(loanData);
  return await loan.save();
};

// Fetch all loans for a user
export const fetchLoansByUser = async (userId) => {
  return await Loan.find({ userId });
};

// Fetch approved loans for a user
export const fetchApprovedLoans = async (userId) => {
  return await Loan.find({ userId, status: "approved" });
};

// Update loan status (for admin)
export const updateLoanStatus = async (loanId, status) => {
  return await Loan.findByIdAndUpdate(loanId, { status }, { new: true });
};
