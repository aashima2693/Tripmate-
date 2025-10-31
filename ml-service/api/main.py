from fastapi import FastAPI
from pydantic import BaseModel
from src.tripPlanner import generate_itinerary

app = FastAPI(title="TripMate AI - Travel Planner API")

# Request Schema (based on your dataset)
class TripRequest(BaseModel):
    budget: float
    duration_days: int | None = None
    interests: str | None = None  

# Endpoint: Plan Trip
@app.post("/plan-trip")
def plan_trip(request: TripRequest):
    user_prefs = request.dict()
    recommendations = generate_itinerary(user_prefs)
    return {
        "user_preferences": user_prefs,
        "recommended_spots": recommendations,
        "count": len(recommendations)
    }
