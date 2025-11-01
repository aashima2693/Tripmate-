import express from 'express';
import { getCompanions, addCompanion } from '../controllers/companion.controller.js';
import { protect } from '../middlewares/auth.middleware.js'; // Assuming 'protect' is the named export

const router = express.Router();

// GET /api/v1/companions (Fetch with filters)
router.get('/', getCompanions);

// POST /api/v1/companions (Protected)
router.post('/', protect, addCompanion); 

export default router;