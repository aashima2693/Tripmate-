// frontend/src/services/api/companionApi.js
const API_BASE_URL = 'http://localhost:5000/api/companions'; // 🛑 Set your backend URL

// 1. Fetch filtered companions
export const fetchCompanions = async (filters) => {
    // Convert filter object to query string (e.g., ?destination=Japan&interest=Food)
    const queryString = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_BASE_URL}?${queryString}`);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
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