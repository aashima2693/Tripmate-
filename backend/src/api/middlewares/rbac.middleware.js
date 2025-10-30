import { ApiError } from '../../utils/ApiError.js';

export const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            throw new ApiError(401, 'Unauthorized: Please login first');
        }

        if (!allowedRoles.includes(req.user.role)) {
            throw new ApiError(403, 'Forbidden: You do not have permission to access this resource');
        }

        next();
    };
};

// Check if user has KYC verified
export const requireKYC = (req, res, next) => {
    if (!req.user) {
        throw new ApiError(401, 'Unauthorized: Please login first');
    }

    if (!req.user.kyc.isVerified) {
        throw new ApiError(403, 'KYC verification required to access this resource');
    }

    next();
};

// Check if user's account is verified
export const requireVerifiedAccount = (req, res, next) => {
    if (!req.user) {
        throw new ApiError(401, 'Unauthorized: Please login first');
    }

    if (!req.user.isEmailVerified || !req.user.isPhoneVerified) {
        throw new ApiError(403, 'Please verify your email and phone number to access this resource');
    }

    next();
};
