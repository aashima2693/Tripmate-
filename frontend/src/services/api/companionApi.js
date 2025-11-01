// frontend/src/services/api/companionApi.js
const API_BASE_URL = 'http://localhost:8000/api/v1/companions';

/**
 * Converts a simple object of filters into a URL query string.
 * @param {Object} filters - Key-value pairs for filtering (e.g., { category: 'sci-fi' })
 * @returns {string} The URL query string (e.g., "category=sci-fi")
 */
const buildQueryString = (filters) => {
    if (!filters || Object.keys(filters).length === 0) {
        return '';
    }
    // Only includes non-empty/null values
    const params = new URLSearchParams();
    for (const key in filters) {
        if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
            params.append(key, filters[key]);
        }
    }
    return params.toString();
};


// 1. Fetch filtered companions
export const fetchCompanions = async (filters) => {
    // ✅ FIX: Use a utility to correctly build the query string from filters
    const queryString = buildQueryString(filters);
    
    // Append the query string only if it exists
    const url = queryString ? `${API_BASE_URL}?${queryString}` : API_BASE_URL;

    const response = await fetch(url);
    
    // Check status before parsing. If response is not OK, assume no body or simple text error.
    if (!response.ok) {
        // You might want to try to parse response.json() here if the backend guarantees an error body.
        // For simplicity and resilience, we assume the response status is enough for a GET error.
        throw new Error(`Failed to fetch companions. HTTP status: ${response.status}`);
    }
    
    // CRITICAL FIX: Ensure the response is correctly parsed as JSON
    return response.json(); 
};

// 2. Add companion profile
export const createCompanionProfile = async (data, token) => {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // IMPORTANT: Pass token for authentication
            'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(data),
    });

    // 🛑 CRITICAL REFACTOR: Consume the response body once, regardless of status.
    // This prevents the "body already consumed" error that the previous logic risked.
    const result = await response.json().catch(() => ({})); // Fallback for non-JSON responses

    if (!response.ok) {
        // Use the parsed result for a detailed error message.
        const errorMessage = result.message 
            ? `Creation failed: ${result.message}`
            : `Failed to create companion profile. Status: ${response.status}`;
            
        throw new Error(errorMessage);
    }
    
    // If response.ok is true, 'result' is the successfully created companion object.
    return result;
};