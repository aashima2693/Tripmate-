// TRIPMATE-/backend/api/routes/companion.routes.js
import express from 'express';
import { getCompanions, addCompanion } from '../controllers/companion.controller.js';
// Assuming authMiddleware is required to add new companions
import { protect } from '../middlewares/auth.middleware.js'; 

const router = express.Router();

// GET /api/companions - Fetch all companions with query filters
router.get('/', getCompanions);

// POST /api/companions - Add a new companion (requires authentication/admin middleware)
router.post('/', protect, addCompanion); 

export default router;