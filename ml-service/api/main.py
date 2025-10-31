from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import joblib

# ----------------------------------------------------
# Initialize FastAPI app
# ----------------------------------------------------
app = FastAPI(title="TripMate AI - Unified API (Planner + Risk Prediction)")


# ----------------------------------------------------
# Trip Itinerary Generator (Dummy Implementation)
# ----------------------------------------------------
def generate_itinerary(user_prefs: dict) -> list[dict]:
    """
    Simulates generating a trip itinerary based on user preferences.
    """
    print(f"DEBUG: Generating itinerary for: {user_prefs}")

    budget_value = user_prefs.get("budget", 0)
    if budget_value < 100:
        raise ValueError("Budget is too low to generate a meaningful itinerary.")

    return [
        {"day": 1, "activity": "Explore historical city center and grab local coffee."},
        {"day": 2, "activity": f"Visit museum based on interests: {user_prefs.get('interests', 'Art')}"},
        {"day": 3, "activity": f"Enjoy leisure activity with a budget of {budget_value}"},
    ]


# ----------------------------------------------------
# Load ML Models (Risk Prediction)
# ----------------------------------------------------
try:
    model = joblib.load("models/risk_model.pkl")
    label_encoders = joblib.load("models/label_encoders.pkl")
    print("✅ Risk model and encoders loaded successfully.")
except Exception as e:
    print(f"⚠️ Warning: Could not load risk model or encoders - {e}")
    model, label_encoders = None, None


# ----------------------------------------------------
# Request Schemas
# ----------------------------------------------------
class TripRequest(BaseModel):
    budget: float
    duration_days: int | None = None
    interests: str | None = None  


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
    user_prefs = request.model_dump()

    try:
        recommendations = generate_itinerary(user_prefs)
        return {
            "user_preferences": user_prefs,
            "recommended_spots": recommendations,
            "count": len(recommendations),
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"Input Error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected Error: {str(e)}")


# ----------------------------------------------------
# Endpoint: Risk Prediction
# ----------------------------------------------------
@app.post("/predict-risk")
def predict_risk(request: RiskRequest):
    """
    Predicts risk level for a given location and environment.
    """
    if model is None or label_encoders is None:
        raise HTTPException(status_code=500, detail="Model not loaded. Please train and save it first.")

    try:
        input_data = pd.DataFrame([{
            "latitude": request.latitude,
            "longitude": request.longitude,
            "weather_condition": label_encoders["weather_condition"].transform([request.weather])[0],
            "road_condition": label_encoders["road_condition"].transform([request.road])[0],
            "time_of_day": label_encoders["time_of_day"].transform([request.time])[0],
            "nearby_incidents": request.incidents,
            "humidity": request.humidity,
            "visibility": request.visibility,
            "temperature": request.temperature,
        }])

        prediction = model.predict(input_data)[0]
        return {"predicted_risk": prediction}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")


# ----------------------------------------------------
# Root endpoint
# ----------------------------------------------------
@app.get("/")
def root():
    return {"message": "Welcome to TripMate AI Unified API (Travel Planner + Risk Prediction)"}
