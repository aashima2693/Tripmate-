import { Router } from 'express';
import {
    register,
    login,
    logout,
    refreshAccessToken,
    getCurrentUser,
    changePassword
} from '../controllers/auth.controller.js';
import {
    registerValidation,
    loginValidation,
    changePasswordValidation
} from '../middlewares/validator.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

// Public routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.post('/refresh-token', refreshAccessToken);

// Protected routes
router.post('/logout', verifyJWT, logout);
router.get('/me', verifyJWT, getCurrentUser);
router.post('/change-password', verifyJWT, changePasswordValidation, changePassword);

export default router;
