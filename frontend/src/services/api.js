// ../services/api.js

import axios from "axios"; // Using Axios for cleaner requests and error handling

// 1. CRITICAL: Target the Node.js endpoint, not the Python endpoint
const NODE_AI_ENDPOINT = "http://localhost:8000/api/v1/trip/ai-plan";
// Note: Use 'http://127.0.0.1:8000' only if you are confident in your environment setup.
// Using 'localhost' or an environment variable (best practice) is usually safer.


export const getAIItinerary = async (tripData) => {
    // 2. CRITICAL: Retrieve the token
    const token = localStorage.getItem('userToken');

    if (!token) {
        // Halt if no token is found
        throw new Error("Authentication Failed: User token is missing. Please log in.");
    }

    try {
        const response = await axios.post(NODE_AI_ENDPOINT, tripData, {
            headers: { 
                "Content-Type": "application/json",
                // 3. CRITICAL: Send the JWT token
                "Authorization": `Bearer ${token}` 
            },
            // Set a long timeout for the ML model (Node.js waits 35s, then Python waits 30s)
            timeout: 35000 
        });
        
        // Response structure: 
        // response.data (from axios) is your Node.js ApiResponse object
        // response.data.data is the payload from the Node.js controller
        // response.data.data.recommended_spots is the final itinerary list

        const responseData = response.data.data;
        console.log("AI itinerary response (from Node.js):", responseData);

        // Extract the itinerary list and return it to PlannerForm.js
        return responseData.recommended_spots;

    } catch (error) {
        // axios error handling is cleaner than fetch
        const status = error.response?.status || 503;
        const message = error.response?.data?.message || error.message;

        console.error(`API Call Failed (${status}):`, message);
        
        if (status === 401) {
             throw new Error("Session expired. Please log in again.");
        }
        if (status === 503) {
             throw new Error("Trip Planner AI Service is temporarily unavailable.");
        }
        
        throw new Error(`Itinerary generation failed: ${message}`);
    }
};