import { Trip } from '../models/trip.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import logger from '../../utils/logger.js';

// Create a new trip
export const createTrip = asyncHandler(async (req, res) => {
    const {
        title,
        description,
        destination,
        startDate,
        endDate,
        duration,
        budget,
        tripType,
        itinerary
    } = req.body;

    // Validate dates
    if (new Date(startDate) >= new Date(endDate)) {
        throw new ApiError(400, 'End date must be after start date');
    }

    const trip = await Trip.create({
        userId: req.user._id,
        title,
        description,
        destination,
        startDate,
        endDate,
        duration,
        budget,
        tripType,
        itinerary: itinerary || [],
        status: 'planning'
    });

    logger.info(`Trip created by user: ${req.user.email} - Trip ID: ${trip._id}`);

    res.status(201).json(
        new ApiResponse(201, trip, 'Trip created successfully')
    );
});

// Get all trips for current user
export const getUserTrips = asyncHandler(async (req, res) => {
    const { status, page = 1, limit = 10 } = req.query;

    const query = { userId: req.user._id };
    if (status) query.status = status;

    const trips = await Trip.find(query)
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .populate('companions.userId', 'fullName email avatar');

    const count = await Trip.countDocuments(query);

    res.status(200).json(
        new ApiResponse(
            200,
            {
                trips,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                totalTrips: count
            },
            'Trips fetched successfully'
        )
    );
});

// Get single trip by ID
export const getTripById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const trip = await Trip.findById(id)
        .populate('userId', 'fullName email phoneNumber avatar')
        .populate('companions.userId', 'fullName email avatar companionProfile');

    if (!trip) {
        throw new ApiError(404, 'Trip not found');
    }

    // Check if user has access to this trip
    const isOwner = trip.userId._id.toString() === req.user._id.toString();
    const isCompanion = trip.companions.some(
        c => c.userId._id.toString() === req.user._id.toString() && c.status === 'accepted'
    );

    if (!isOwner && !isCompanion && !trip.isPublic) {
        throw new ApiError(403, 'You do not have access to this trip');
    }

    res.status(200).json(
        new ApiResponse(200, trip, 'Trip fetched successfully')
    );
});

// Update trip
export const updateTrip = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const trip = await Trip.findById(id);

    if (!trip) {
        throw new ApiError(404, 'Trip not found');
    }

    // Check if user is the owner
    if (trip.userId.toString() !== req.user._id.toString()) {
        throw new ApiError(403, 'You can only update your own trips');
    }

    const updatedTrip = await Trip.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true, runValidators: true }
    );

    logger.info(`Trip updated: ${id} by user: ${req.user.email}`);

    res.status(200).json(
        new ApiResponse(200, updatedTrip, 'Trip updated successfully')
    );
});

// Delete trip
export const deleteTrip = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const trip = await Trip.findById(id);

    if (!trip) {
        throw new ApiError(404, 'Trip not found');
    }

    // Check if user is the owner
    if (trip.userId.toString() !== req.user._id.toString()) {
        throw new ApiError(403, 'You can only delete your own trips');
    }

    await Trip.findByIdAndDelete(id);

    logger.info(`Trip deleted: ${id} by user: ${req.user.email}`);

    res.status(200).json(
        new ApiResponse(200, null, 'Trip deleted successfully')
    );
});

// Add companion to trip
export const addCompanion = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { companionId } = req.body;

    const trip = await Trip.findById(id);

    if (!trip) {
        throw new ApiError(404, 'Trip not found');
    }

    // Check if user is the owner
    if (trip.userId.toString() !== req.user._id.toString()) {
        throw new ApiError(403, 'Only trip owner can add companions');
    }

    // Check if companion already exists
    const existingCompanion = trip.companions.find(
        c => c.userId.toString() === companionId
    );

    if (existingCompanion) {
        throw new ApiError(400, 'Companion already added to this trip');
    }

    trip.companions.push({
        userId: companionId,
        status: 'invited',
        invitedAt: new Date()
    });

    await trip.save();

    logger.info(`Companion added to trip: ${id}`);

    res.status(200).json(
        new ApiResponse(200, trip, 'Companion added successfully')
    );
});

// Update trip status
export const updateTripStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['planning', 'booked', 'ongoing', 'completed', 'cancelled'];

    if (!validStatuses.includes(status)) {
        throw new ApiError(400, 'Invalid status');
    }

    const trip = await Trip.findById(id);

    if (!trip) {
        throw new ApiError(404, 'Trip not found');
    }

    if (trip.userId.toString() !== req.user._id.toString()) {
        throw new ApiError(403, 'Only trip owner can update status');
    }

    trip.status = status;
    await trip.save();

    logger.info(`Trip status updated to ${status}: ${id}`);

    res.status(200).json(
        new ApiResponse(200, trip, 'Trip status updated successfully')
    );
});
