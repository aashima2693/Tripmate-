// frontend/src/services/api/companionApi.js
const API_BASE_URL = 'http://localhost:8000/api/v1/companions';

// 1. Fetch filtered companions
export const fetchCompanions = async (filters) => {
    // ... (query string setup) ...
    const response = await fetch(`${API_BASE_URL}?${queryString}`);
    
    if (!response.ok) {
        // Handle server errors (4xx or 5xx)
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    // 🛑 CRITICAL FIX: Ensure the response is correctly parsed as JSON
    // If this line failed or was missing, the component received raw response data.
    return response.json(); // ✅ Returns the parsed JavaScript object (the array)
};

// 2. Add companion profile
export const createCompanionProfile = async (data, token) => {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 🛑 IMPORTANT: Pass token for authentication (assuming protect middleware is used)
            'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        // You might need to parse error messages from the backend response body
        const errorData = await response.json(); 
        throw new Error(errorData.message || 'Failed to create companion profile.');
    }
    return response.json();
};