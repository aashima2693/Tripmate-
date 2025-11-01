// TRIPMATE-/backend/api/controllers/companion.controller.js
import { Companion } from '../models/companion.model.js';
import { asyncHandler } from '../../src/utils/asyncHandler.js'; // Assuming this exists

// Helper to determine Age Range (keep client-side logic consistent)
const getAgeRange = (age) => {
    if (age >= 18 && age <= 25) return '18-25';
    if (age >= 26 && age <= 30) return '26-30';
    if (age >= 31 && age <= 40) return '31-40';
    return '40+';
};

// 1. API to Fetch and Filter Companions (GET /api/companions)
export const getCompanions = asyncHandler(async (req, res) => {
    const filters = req.query;
    const query = {};

    // Match exact destination and location
    if (filters.destination && filters.destination !== 'All Destinations') {
        query.destination = filters.destination;
    }
    if (filters.location && filters.location !== 'All Locations') {
        query.startingLocation = filters.location;
    }

    // Match array elements (Interests/Months)
    if (filters.interest && filters.interest !== 'All Interests') {
        query.interests = { $in: [filters.interest] }; // MongoDB $in for array-contains
    }
    if (filters.month && filters.month !== 'All Dates') {
        query.availableMonths = { $in: [filters.month] };
    }

    let companions = await Companion.find(query).lean();
    
    // Perform client-side filtering logic for Age and Search (More efficient in MongoDB if ranges/text indexing is set up)
    if (filters.search || filters.age) {
         companions = companions.filter(c => {
             const searchMatch = !filters.search || 
                 c.name.toLowerCase().includes(filters.search.toLowerCase()) || 
                 c.bio.toLowerCase().includes(filters.search.toLowerCase());
             
             const ageMatch = filters.age === 'All Ages' || getAgeRange(c.age) === filters.age;

             return searchMatch && ageMatch;
         });
    }

    res.json(companions);
});

// 2. API to Add a New Companion (POST /api/companions)
export const addCompanion = asyncHandler(async (req, res) => {
    // Note: Mongoose handles schema validation here.
    const newCompanion = await Companion.create(req.body);
    res.status(201).json(newCompanion);
});