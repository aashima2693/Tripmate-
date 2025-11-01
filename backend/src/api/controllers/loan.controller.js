import {
  createLoanService,
  getAllLoansService,
  getLoanByIdService,
  updateLoanService,
  deleteLoanService,
} from "../services/loan.service.js";

// Create Loan
export const createLoan = async (req, res) => {
  try {
    const loan = await createLoanService(req.body);
    res.status(201).json({ success: true, data: loan });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get All Loans
export const getAllLoans = async (req, res) => {
  try {
    const loans = await getAllLoansService();
    res.status(200).json({ success: true, data: loans });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Loan By ID
export const getLoanById = async (req, res) => {
  try {
    const loan = await getLoanByIdService(req.params.id);
    if (!loan)
      return res.status(404).json({ success: false, message: "Loan not found" });
    res.status(200).json({ success: true, data: loan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Loan
export const updateLoan = async (req, res) => {
  try {
    const loan = await updateLoanService(req.params.id, req.body);
    if (!loan)
      return res.status(404).json({ success: false, message: "Loan not found" });
    res.status(200).json({ success: true, data: loan });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete Loan
export const deleteLoan = async (req, res) => {
  try {
    const loan = await deleteLoanService(req.params.id);
    if (!loan)
      return res.status(404).json({ success: false, message: "Loan not found" });
    res.status(200).json({ success: true, message: "Loan deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
