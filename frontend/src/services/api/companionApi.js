import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/companions";

// 🟢 Get all companions
export const fetchCompanions = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching companions:", error);
    return [];
  }
};

// 🟢 Create a new companion profile
export const createCompanionProfile = async (companionData) => {
  try {
    const response = await axios.post(API_URL, companionData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // backend should return created companion object
  } catch (error) {
    console.error("❌ Error creating companion profile:", error);
    throw error;
  }
};
