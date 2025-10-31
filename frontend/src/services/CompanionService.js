import { db } from '../../../backend/src/firebase/firebaseConfig';
import { collection, query, where, getDocs, setDoc , onSnapshot } from 'firebase/firestore';

/**
 * Fetches companions based on provided filters.
 * @param {object} filters - The current filters from CompanionFinder component state.
 * @returns {Promise<Array>} A promise that resolves to an array of companion objects.
 */

const generateNewCompanionId = () => {
    // Generates a simple, unique ID string
    return Date.now().toString() + Math.floor(Math.random() * 1000).toString();
};

/**
 * Adds a new companion profile to the Firestore database.
 * @param {object} companionData - The data object for the new companion.
 * @returns {Promise<string>} A promise that resolves to the new companion's ID.
 */
export const addCompanionProfile = async (companionData) => {
    const newId = generateNewCompanionId();
    const docRef = doc(db, 'companions', newId);

    const newCompanion = {
        ...companionData,
        id: newId, 
        verified: companionData.verified ?? false, 
        image: companionData.image || 'https://picsum.photos/seed/default/150',
        createdAt: new Date(),
    };

    try {
        await setDoc(docRef, newCompanion);
        console.log("New companion added with ID:", newId);
        return newId;

    } catch (error) {
        console.error("Error adding companion profile:", error);
        throw new Error("Failed to save companion profile to the database.");
    }
};

export const getFilteredCompanions = async (filters) => {
    let companionsRef = collection(db, 'companions');
    let queryConstraints = [];
    
    // --- 1. Destination Filter Check ---
    // Ensure the filter value is NOT undefined and NOT the 'All' placeholder
    if (filters.destination && filters.destination !== 'All Destinations') {
        queryConstraints.push(where('destination', '==', filters.destination));
    }

    // --- 2. Location Filter Check ---
    if (filters.location && filters.location !== 'All Locations') {
        queryConstraints.push(where('startingLocation', '==', filters.location)); 
    }
    
    // --- 3. Interests Filter Check ---
    if (filters.interest && filters.interest !== 'All Interests') {
        queryConstraints.push(where('interests', 'array-contains', filters.interest));
    }
    
    // --- 4. Month Filter Check ---
    if (filters.month && filters.month !== 'All Dates') {
        queryConstraints.push(where('availableMonths', 'array-contains', filters.month));
    }

    // Create the final query
    let q = query(companionsRef, ...queryConstraints);

    try {
        const querySnapshot = await getDocs(q);
        const results = [];
        
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            // 4. Handle front-end Search Filter (for fields not indexed by Firestore, like name/bio)
            const searchTerm = filters.search.toLowerCase();
            const searchMatch = data.name.toLowerCase().includes(searchTerm) || data.bio.toLowerCase().includes(searchTerm);
            
            // 5. Handle front-end Age Filter (since Firestore range queries are tricky)
            // This re-implements your original age filter logic on the client side:
            const ageMatch = filters.age === 'All Ages' || getAgeRange(data.age) === filters.age;

            if (searchMatch && ageMatch) {
                results.push({ id: doc.id, ...data });
            }
        });
        
        return results;

    } catch (error) {
        console.error("Error fetching filtered companions:", error);
        // In a real app, throw the error or return a specific status
        return [];
    }
};

/**
 * Gets a single companion profile by ID.
 * @param {string} id - The document ID (companion ID).
 */
export const getCompanionProfile = async (id) => {
    // This requires an additional setup to get a single document, but for simplicity:
    // We will use getFilteredCompanions with the ID filter for this demo.
    // In a production app, use doc() and getDoc() for single document fetches.
    // For now, we'll keep the client-side useMemo fetch as it is.
}