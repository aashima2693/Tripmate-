import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import connectDB from './src/config/db.config.js';
import mainRouter from './src/api/routes/index.js';
import logger from './src/utils/logger.js';
import { ApiError } from './src/utils/ApiError.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to Database
connectDB();

// Global Middlewares
app.use(cors({ 
    origin: process.env.CORS_ORIGIN, 
    credentials: true 
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());
app.use(express.static('public'));

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'TripMate API is running',
        timestamp: new Date().toISOString()
    });
});

// API Routes
app.use('/api/v1', mainRouter);

// 404 Handler
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    logger.error(`Error: ${err.message}`);
    
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }

    // Handle other errors
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// Start Server
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`);
    console.log(`🚀 TripMate API: http://localhost:${PORT}`);
    console.log(`📊 Health Check: http://localhost:${PORT}/health`);
    console.log(`📋 API Health: http://localhost:${PORT}/api/v1/health`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    logger.error(`Unhandled Rejection: ${err.message}`);
    process.exit(1);
});
