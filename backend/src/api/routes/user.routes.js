import { Router } from 'express';
import {
    getUserProfile,
    updateUserProfile,
    updateAvatar,
    addSOSContact,
    removeSOSContact,
    getCompanions,
    updateCompanionProfile,
    deactivateAccount,
    deleteAccount
} from '../controllers/user.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/rbac.middleware.js';

const router = Router();

// All routes require authentication
router.use(protect);

// Profile routes
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.patch('/avatar', updateAvatar);

// SOS contacts
router.post('/sos-contacts', addSOSContact);
router.delete('/sos-contacts/:contactId', removeSOSContact);

// Companion routes
router.get('/companions', getCompanions);
router.put('/companion-profile', authorize('companion'), updateCompanionProfile);

// Account management
router.post('/deactivate', deactivateAccount);
router.delete('/delete', deleteAccount);

export default router;
