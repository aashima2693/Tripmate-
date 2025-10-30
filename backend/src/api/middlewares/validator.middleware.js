import { body, validationResult } from 'express-validator';
import { ApiError } from '../../utils/ApiError.js';

// Validation result checker
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => err.msg);
        throw new ApiError(400, 'Validation Error', errorMessages);
    }
    next();
};

// Registration validation rules
export const registerValidation = [
    body('fullName')
        .trim()
        .notEmpty().withMessage('Full name is required')
        .isLength({ min: 2, max: 50 }).withMessage('Full name must be between 2 and 50 characters'),
    
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email')
        .normalizeEmail(),
    
    body('phoneNumber')
        .trim()
        .notEmpty().withMessage('Phone number is required')
        .matches(/^[6-9]\d{9}$/).withMessage('Please provide a valid Indian phone number'),
    
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    
    body('dateOfBirth')
        .notEmpty().withMessage('Date of birth is required')
        .isISO8601().withMessage('Please provide a valid date'),
    
    body('gender')
        .notEmpty().withMessage('Gender is required')
        .isIn(['male', 'female', 'other', 'prefer_not_to_say']).withMessage('Invalid gender value'),
    
    body('role')
        .optional()
        .isIn(['traveler', 'companion', 'guide', 'vendor']).withMessage('Invalid role'),
    
    validate
];

// Login validation rules
export const loginValidation = [
    body('email')
        .optional()
        .isEmail().withMessage('Please provide a valid email')
        .normalizeEmail(),
    
    body('phoneNumber')
        .optional()
        .matches(/^[6-9]\d{9}$/).withMessage('Please provide a valid Indian phone number'),
    
    body('password')
        .notEmpty().withMessage('Password is required'),
    
    // Custom validation: either email or phoneNumber must be provided
    body().custom((value, { req }) => {
        if (!req.body.email && !req.body.phoneNumber) {
            throw new Error('Either email or phone number is required');
        }
        return true;
    }),
    
    validate
];

// Change password validation
export const changePasswordValidation = [
    body('currentPassword')
        .notEmpty().withMessage('Current password is required'),
    
    body('newPassword')
        .notEmpty().withMessage('New password is required')
        .isLength({ min: 8 }).withMessage('New password must be at least 8 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    
    validate
];
