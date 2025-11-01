import { Router } from "express";
import {
  applyLoan,
  getUserLoans,
  getApprovedLoans,
  changeLoanStatus,
} from "../controllers/loan.controller.js";

const router = Router();

// Apply for a new loan
router.post("/", applyLoan);

// Get all loans for a user
router.get("/:userId", getUserLoans);

// Get only approved loans for a user
router.get("/:userId/approved", getApprovedLoans);

// Update loan status (admin)
router.patch("/:id/status", changeLoanStatus);

export default router;
