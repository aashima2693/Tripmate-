// TRIPMATE-/backend/api/routes/companion.routes.js
import express from 'express';
import { getCompanions, addCompanion } from '../controllers/companion.controller.js';
import { protect } from '../middlewares/auth.middleware.js'; 

const router = express.Router();

// Maps to: GET /api/v1/companions
router.get('/', getCompanions);

// Maps to: POST /api/v1/companions (Protected)
router.post('/', addCompanion); 

export default router;