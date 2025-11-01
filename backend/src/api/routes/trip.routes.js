import { Router } from 'express';
import {
    createTrip,
    getUserTrips,
    getTripById,
    updateTrip,
    deleteTrip,
    addCompanion,
    updateTripStatus,
    planTripAI // <-- NEW IMPORT
} from '../controllers/trip.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { body } from 'express-validator';
import { validate } from '../middlewares/validator.middleware.js';

const router = Router();

// All routes require authentication
router.use(protect);

// --- NEW ML INTEGRATION ROUTE ---
router.post(
    '/ai-plan',
    [
        // Simple validation before hitting the external service
        body('budget').notEmpty().isNumeric().withMessage('Budget is required and must be a number'),
        validate
    ],
    planTripAI
);
// ------------------------------------

// Trip CRUD operations (EXISTING ROUTES)
router.post(
    '/',
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('destination.city').notEmpty().withMessage('Destination city is required'),
        body('destination.state').notEmpty().withMessage('Destination state is required'),
        body('startDate').notEmpty().isISO8601().withMessage('Valid start date is required'),
        body('endDate').notEmpty().isISO8601().withMessage('Valid end date is required'),
        body('budget.estimated').notEmpty().isNumeric().withMessage('Budget is required'),
        body('tripType').isIn(['solo', 'couple', 'family', 'group']).withMessage('Invalid trip type'),
        validate
    ],
    createTrip
);

router.get('/', getUserTrips);
router.get('/:id', getTripById);
router.put('/:id', updateTrip);
router.delete('/:id', deleteTrip);

// Companion management
router.post(
    '/:id/companions',
    [
        body('companionId').notEmpty().withMessage('Companion ID is required'),
        validate
    ],
    addCompanion
);

// Trip status
router.patch(
    '/:id/status',
    [
        body('status').isIn(['planning', 'booked', 'ongoing', 'completed', 'cancelled']).withMessage('Invalid status'),
        validate
    ],
    updateTripStatus
);

export default router;