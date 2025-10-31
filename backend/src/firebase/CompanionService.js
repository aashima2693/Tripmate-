import { db } from './firebaseConfig';
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';

/**
 * Fetches companions based on provided filters.
 * @param {object} filters - The current filters from CompanionFinder component state.
 * @returns {Promise<Array>} A promise that resolves to an array of companion objects.
 */
export const getFilteredCompanions = async (filters) => {
    // 1. Start with the base collection reference
    let companionsRef = collection(db, 'companions');
    let q = query(companionsRef);

    // 2. Build the query object based on filters
    const queryConstraints = [];

    // --- Destination Filter ---
    if (filters.destination !== 'All Destinations') {
        queryConstraints.push(where('destination', '==', filters.destination));
    }

    // --- Location Filter ---
    if (filters.location !== 'All Locations') {
        queryConstraints.push(where('startingLocation', '==', filters.location));
    }

    // --- Age Filter (Requires a range field in Firestore, simple filter here) ---
    // NOTE: Direct range queries are complex. For a simple demo, we skip age in Firestore.

    // --- Interests Filter (Requires array-contains query) ---
    if (filters.interest !== 'All Interests') {
        queryConstraints.push(where('interests', 'array-contains', filters.interest));
    }
    
    // --- Month Filter (Requires array-contains query) ---
    if (filters.month !== 'All Dates') {
        queryConstraints.push(where('availableMonths', 'array-contains', filters.month));
    }

    // 3. Create the final query
    q = query(companionsRef, ...queryConstraints);

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