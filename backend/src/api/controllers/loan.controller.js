import {
  createLoan,
  fetchLoansByUser,
  fetchApprovedLoans,
  updateLoanStatus,
} from "../services/loan.service.js";

export const applyLoan = async (req, res) => {
  try {
    const loan = await createLoan(req.body);
    res.status(201).json({ success: true, loan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserLoans = async (req, res) => {
  try {
    const loans = await fetchLoansByUser(req.params.userId);
    res.json({ success: true, loans });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getApprovedLoans = async (req, res) => {
  try {
    const loans = await fetchApprovedLoans(req.params.userId);
    res.json({ success: true, loans });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const changeLoanStatus = async (req, res) => {
  try {
    const updated = await updateLoanStatus(req.params.id, req.body.status);
    res.json({ success: true, updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
