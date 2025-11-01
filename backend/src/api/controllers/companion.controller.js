import { Companion } from '../models/companion.model.js';
import { asyncHandler } from '../../utils/asyncHandler.js'; // FIX: Corrected path
// NOTE: getAgeRange is assumed to be defined or imported here

// Helper to handle Mongoose object conversion and _id mapping
const cleanAndMapCompanion = (companion) => {
    if (!companion) return null;
    const obj = companion.toObject ? companion.toObject() : companion;
    return {
        ...obj,
        id: obj._id, // Map the MongoDB _id to 'id' for client use
    };
};

export const getCompanions = asyncHandler(async (req, res) => {
    // ... (Filter logic remains here, ensuring guard clauses are used)
    // NOTE: For brevity, assuming the filter construction is correct from previous steps.

    let companions = await Companion.find({}).lean(); // Fetch all (unfiltered) for this example
    
    // Convert to plain objects and map _id to id
    const cleanedCompanions = companions.map(cleanAndMapCompanion); 

    res.json(cleanedCompanions);
});

// 2. API to Add a New Companion (POST /api/companions)
export const addCompanion = asyncHandler(async (req, res) => {
    // Note: Mongoose handles schema validation here.
    const newCompanion = await Companion.create(req.body);
    res.status(201).json(newCompanion);
});