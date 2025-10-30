import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { ApiError } from '../../utils/ApiError.js';

export const verifyJWT = async (req, res, next) => {
    try {
        // Get token from header or cookies
        const token = req.header('Authorization')?.replace('Bearer ', '') || req.cookies?.accessToken;

        if (!token) {
            throw new ApiError(401, 'Unauthorized: No token provided');
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user
        const user = await User.findById(decoded._id).select('-password -refreshToken');

        if (!user) {
            throw new ApiError(401, 'Unauthorized: Invalid token');
        }

        if (!user.isActive) {
            throw new ApiError(403, 'Account is deactivated');
        }

        // Attach user to request
        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            throw new ApiError(401, 'Unauthorized: Invalid token');
        }
        if (error.name === 'TokenExpiredError') {
            throw new ApiError(401, 'Unauthorized: Token expired');
        }
        throw error;
    }
};

// Optional authentication (doesn't throw error if no token)
export const optionalAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '') || req.cookies?.accessToken;

        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded._id).select('-password -refreshToken');
            
            if (user && user.isActive) {
                req.user = user;
            }
        }
    } catch (error) {
        // Silent fail for optional auth
    }
    next();
};
