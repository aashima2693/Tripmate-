// ../services/api.js

import axios from "axios"; // Using Axios for cleaner requests and error handling

// 1. CRITICAL: Target the Node.js endpoint, not the Python endpoint
const NODE_AI_ENDPOINT = "http://localhost:8000/api/v1/trip/ai-plan";
// Note: Use 'http://127.0.0.1:8000' only if you are confident in your environment setup.
// Using 'localhost' or an environment variable (best practice) is usually safer.


export const getAIItinerary = async (payload, token) => {
    // Assuming API endpoint is http://localhost:8000/api/v1/planner
    const response = await fetch('http://localhost:8000/api/v1/planner', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 🛑 CRITICAL FIX: Include the Bearer Token
            'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        // If the API failed (e.g., 401 Unauthorized), parse and throw the error message
        const errorData = await response.json();
        const errorMessage = errorData.message || "Unknown error";
        throw new Error(`Authentication Failed: ${errorMessage}`);
    }

    return response.json();
};