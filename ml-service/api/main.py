from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib
from src.tripPlanner import generate_itinerary

# ----------------------------------------------------
# Initialize FastAPI app
# ----------------------------------------------------
app = FastAPI(title="TripMate AI - Unified API (Planner + Risk Prediction)")

# ----------------------------------------------------
# Load ML Models and Encoders (Risk Prediction)
# ----------------------------------------------------
try:
    model = joblib.load("models/risk_model.pkl")
    label_encoders = joblib.load("models/label_encoders.pkl")
    print(" Risk model and encoders loaded successfully.")
except Exception as e:
    print(f"⚠️ Warning: Could not load risk model or encoders - {e}")
    model, label_encoders = None, None


# ----------------------------------------------------
# Request Schemas
# ----------------------------------------------------

# For Trip Planning
class TripRequest(BaseModel):
    budget: float
    duration_days: int | None = None
    interests: str | None = None  

# For Risk Prediction
class RiskRequest(BaseModel):
    latitude: float
    longitude: float
    weather: str
    road: str
    time: str
    incidents: int
    humidity: float
    visibility: float
    temperature: float


# ----------------------------------------------------
# Endpoint: Travel Planning
# ----------------------------------------------------
@app.post("/plan-trip")
def plan_trip(request: TripRequest):
    """
    Generates travel itinerary based on user preferences.
    """
    user_prefs = request.dict()
    recommendations = generate_itinerary(user_prefs)
    return {
        "user_preferences": user_prefs,
        "recommended_spots": recommendations,
        "count": len(recommendations)
    }


# ----------------------------------------------------
# Endpoint: Risk Prediction
# ----------------------------------------------------
@app.post("/predict_risk")
def predict_risk(request: RiskRequest):
    """
    Predicts risk level for a given location and environment.
    """
    if model is None or label_encoders is None:
        return {"error": "Model not loaded. Please train and save it first."}

    try:
        # Prepare input for model
        input_data = pd.DataFrame([{
            "latitude": request.latitude,
            "longitude": request.longitude,
            "weather_condition": label_encoders["weather_condition"].transform([request.weather])[0],
            "road_condition": label_encoders["road_condition"].transform([request.road])[0],
            "time_of_day": label_encoders["time_of_day"].transform([request.time])[0],
            "nearby_incidents": request.incidents,
            "humidity": request.humidity,
            "visibility": request.visibility,
            "temperature": request.temperature
        }])

        # Predict risk
        prediction = model.predict(input_data)[0]
        return {"predicted_risk": prediction}

    except Exception as e:
        return {"error": f"Prediction failed: {e}"}


# ----------------------------------------------------
# Root endpoint (for testing)
# ----------------------------------------------------
@app.get("/")
def root():
    return {"message": "Welcome to TripMate AI Unified API (Travel Planner + Risk Prediction)"}
