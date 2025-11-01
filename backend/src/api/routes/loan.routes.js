import express from "express";
import {
  createLoan,
  getAllLoans,
  getLoanById,
  updateLoan,
  deleteLoan,
} from "../controllers/loan.controller.js";

const router = express.Router();

router.route('/')
.get(getAllLoans)
.post(createLoan);

router.route('/:id')
.get(getLoanById)
.put(updateLoan)
.delete(deleteLoan);

export default router;
