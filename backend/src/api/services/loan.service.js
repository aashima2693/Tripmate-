import Loan from "../models/loan.model.js";

/**
 * Create a new loan
 */
export const createLoanService = async (loanData) => {
  const loan = new Loan(loanData);
  return await loan.save();
};

/**
 * Get all loans
 */
export const getAllLoansService = async () => {
  return await Loan.find().populate("userId", "name email");
};

/**
 * Get loan by ID
 */
export const getLoanByIdService = async (id) => {
  return await Loan.findById(id);
};

/**
 * Update a loan
 */
export const updateLoanService = async (id, updatedData) => {
  return await Loan.findByIdAndUpdate(id, updatedData, { new: true });
};

/**
 * Delete a loan
 */
export const deleteLoanService = async (id) => {
  return await Loan.findByIdAndDelete(id);
};
