import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import logger from '../../utils/logger.js';

// Helper function to generate tokens
const generateTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // Save refresh token to database
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, 'Error generating tokens');
    }
};

// Register new user
export const register = asyncHandler(async (req, res) => {
    const { fullName, email, phoneNumber, password, dateOfBirth, gender, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
        $or: [{ email }, { phoneNumber }]
    });

    if (existingUser) {
        throw new ApiError(409, 'User with this email or phone number already exists');
    }

    // Create user
    const user = await User.create({
        fullName,
        email,
        phoneNumber,
        password,
        dateOfBirth,
        gender,
        role: role || 'traveler'
    });

    // Generate tokens
    const { accessToken, refreshToken } = await generateTokens(user._id);

    // Get user without sensitive data
    const createdUser = await User.findById(user._id).select('-password -refreshToken');

    logger.info(`New user registered: ${email}`);

    res.status(201).json(
        new ApiResponse(
            201,
            {
                user: createdUser,
                accessToken,
                refreshToken
            },
            'User registered successfully'
        )
    );
});

// Login user
export const login = asyncHandler(async (req, res) => {
    const { email, phoneNumber, password } = req.body;

    // Find user by email or phone
    const user = await User.findOne({
        $or: [{ email }, { phoneNumber }]
    }).select('+password');

    if (!user) {
        throw new ApiError(401, 'Invalid credentials');
    }

    // Check if account is active
    if (!user.isActive) {
        throw new ApiError(403, 'Your account has been deactivated');
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        throw new ApiError(401, 'Invalid credentials');
    }

    // Generate tokens
    const { accessToken, refreshToken } = await generateTokens(user._id);

    // Update last login
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    // Get user without sensitive data
    const loggedInUser = await User.findById(user._id).select('-password -refreshToken');

    logger.info(`User logged in: ${user.email}`);

    // Cookie options
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    };

    res
        .status(200)
        .cookie('accessToken', accessToken, cookieOptions)
        .cookie('refreshToken', refreshToken, cookieOptions)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken
                },
                'Login successful'
            )
        );
});

// Logout user
export const logout = asyncHandler(async (req, res) => {
    // Remove refresh token from database
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: { refreshToken: 1 }
        },
        { new: true }
    );

    logger.info(`User logged out: ${req.user.email}`);

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    };

    res
        .status(200)
        .clearCookie('accessToken', cookieOptions)
        .clearCookie('refreshToken', cookieOptions)
        .json(new ApiResponse(200, null, 'Logout successful'));
});

// Refresh access token
export const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, 'Refresh token is required');
    }

    // Verify refresh token
    const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decoded._id).select('+refreshToken');

    if (!user) {
        throw new ApiError(401, 'Invalid refresh token');
    }

    // Check if refresh token matches
    if (user.refreshToken !== incomingRefreshToken) {
        throw new ApiError(401, 'Refresh token is expired or used');
    }

    // Generate new tokens
    const { accessToken, refreshToken } = await generateTokens(user._id);

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    };

    res
        .status(200)
        .cookie('accessToken', accessToken, cookieOptions)
        .cookie('refreshToken', refreshToken, cookieOptions)
        .json(
            new ApiResponse(
                200,
                { accessToken, refreshToken },
                'Token refreshed successfully'
            )
        );
});

// Get current user
export const getCurrentUser = asyncHandler(async (req, res) => {
    res.status(200).json(
        new ApiResponse(200, req.user, 'User fetched successfully')
    );
});

// Change password
export const changePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select('+password');

    // Verify current password
    const isPasswordValid = await user.comparePassword(currentPassword);

    if (!isPasswordValid) {
        throw new ApiError(401, 'Current password is incorrect');
    }

    // Update password
    user.password = newPassword;
    await user.save();

    logger.info(`Password changed for user: ${user.email}`);

    res.status(200).json(
        new ApiResponse(200, null, 'Password changed successfully')
    );
});
