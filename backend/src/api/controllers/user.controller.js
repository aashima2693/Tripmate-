import { User } from '../models/user.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import logger from '../../utils/logger.js';

// Get user profile
export const getUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json(
        new ApiResponse(200, req.user, 'Profile fetched successfully')
    );
});

// Update user profile
export const updateUserProfile = asyncHandler(async (req, res) => {
    const {
        fullName,
        dateOfBirth,
        gender,
        address,
        emergencyContact,
        travelPreferences
    } = req.body;

    const updateFields = {};

    if (fullName) updateFields.fullName = fullName;
    if (dateOfBirth) updateFields.dateOfBirth = dateOfBirth;
    if (gender) updateFields.gender = gender;
    if (address) updateFields.address = address;
    if (emergencyContact) updateFields.emergencyContact = emergencyContact;
    if (travelPreferences) updateFields.travelPreferences = travelPreferences;

    const user = await User.findByIdAndUpdate(
        req.user._id,
        { $set: updateFields },
        { new: true, runValidators: true }
    ).select('-password -refreshToken');

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    logger.info(`Profile updated for user: ${user.email}`);

    res.status(200).json(
        new ApiResponse(200, user, 'Profile updated successfully')
    );
});

// Update avatar
export const updateAvatar = asyncHandler(async (req, res) => {
    const { avatar } = req.body;

    if (!avatar) {
        throw new ApiError(400, 'Avatar URL is required');
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        { $set: { avatar } },
        { new: true }
    ).select('-password -refreshToken');

    res.status(200).json(
        new ApiResponse(200, user, 'Avatar updated successfully')
    );
});

// Add SOS contact
export const addSOSContact = asyncHandler(async (req, res) => {
    const { name, phoneNumber, relation } = req.body;

    if (!name || !phoneNumber || !relation) {
        throw new ApiError(400, 'Name, phone number, and relation are required');
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $push: {
                sosContacts: { name, phoneNumber, relation }
            }
        },
        { new: true }
    ).select('-password -refreshToken');

    logger.info(`SOS contact added for user: ${user.email}`);

    res.status(200).json(
        new ApiResponse(200, user.sosContacts, 'SOS contact added successfully')
    );
});

// Remove SOS contact
export const removeSOSContact = asyncHandler(async (req, res) => {
    const { contactId } = req.params;

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $pull: {
                sosContacts: { _id: contactId }
            }
        },
        { new: true }
    ).select('-password -refreshToken');

    res.status(200).json(
        new ApiResponse(200, user.sosContacts, 'SOS contact removed successfully')
    );
});

// Get all companions (users with companion role)
export const getCompanions = asyncHandler(async (req, res) => {
    const { city, state, minRating, maxPrice } = req.query;

    const query = {
        role: 'companion',
        'companionProfile.isAvailable': true,
        'kyc.isVerified': true,
        isActive: true
    };

    if (city) query['address.city'] = new RegExp(city, 'i');
    if (state) query['address.state'] = new RegExp(state, 'i');
    if (minRating) query['companionProfile.rating'] = { $gte: parseFloat(minRating) };
    if (maxPrice) query['companionProfile.pricePerDay'] = { $lte: parseFloat(maxPrice) };

    const companions = await User.find(query)
        .select('fullName email phoneNumber avatar companionProfile address')
        .limit(20);

    res.status(200).json(
        new ApiResponse(200, companions, 'Companions fetched successfully')
    );
});

// Update companion profile
export const updateCompanionProfile = asyncHandler(async (req, res) => {
    if (req.user.role !== 'companion') {
        throw new ApiError(403, 'Only companions can update companion profile');
    }

    const {
        isAvailable,
        bio,
        languages,
        expertise,
        pricePerDay
    } = req.body;

    const updateFields = {};

    if (isAvailable !== undefined) updateFields['companionProfile.isAvailable'] = isAvailable;
    if (bio) updateFields['companionProfile.bio'] = bio;
    if (languages) updateFields['companionProfile.languages'] = languages;
    if (expertise) updateFields['companionProfile.expertise'] = expertise;
    if (pricePerDay) updateFields['companionProfile.pricePerDay'] = pricePerDay;

    const user = await User.findByIdAndUpdate(
        req.user._id,
        { $set: updateFields },
        { new: true, runValidators: true }
    ).select('-password -refreshToken');

    logger.info(`Companion profile updated for user: ${user.email}`);

    res.status(200).json(
        new ApiResponse(200, user, 'Companion profile updated successfully')
    );
});

// Deactivate account
export const deactivateAccount = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        { $set: { isActive: false } },
        { new: true }
    );

    logger.info(`Account deactivated for user: ${req.user.email}`);

    res.status(200).json(
        new ApiResponse(200, null, 'Account deactivated successfully')
    );
});

// Delete account
export const deleteAccount = asyncHandler(async (req, res) => {
    await User.findByIdAndDelete(req.user._id);

    logger.info(`Account deleted for user: ${req.user.email}`);

    res.status(200).json(
        new ApiResponse(200, null, 'Account deleted successfully')
    );
});
