// src/api/routes/index.js
import express from 'express';
import { Router } from 'express';
import authRouter from './auth.routes.js';
import userRouter from './user.routes.js';
import tripRouter from './trip.routes.js';
import loanRoutes from "./loan.routes.js";



const router = express.Router();

// Health check for API
router.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'TripMate API v1 is running',
        timestamp: new Date().toISOString()
    });
});

// Define the routes for different features
router.use('/auth', authRouter);     // Routes for /api/v1/auth
router.use('/users', userRouter);    // Routes for /api/v1/users
router.use('/trips', tripRouter);    // Routes for /api/v1/trips
router.use("/loans", loanRoutes);   // Routes for /api/v1/loans

export default router; 