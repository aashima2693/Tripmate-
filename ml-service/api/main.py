from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(title="TripMate AI - Travel Planner API")

# DUMMY IMPLEMENTATION: This simulates your ML/logic function.
# NOTE: Removed the dependency on a file import for immediate runnability.
def generate_itinerary(user_prefs: dict) -> list[dict]:
    """
    Simulates generating a trip itinerary based on user preferences.
    """
    # NOTE: user_prefs is guaranteed to have keys 'budget', 'duration_days', 'interests'
    #       because it comes directly from the validated TripRequest model.
    print(f"DEBUG: Generating itinerary for: {user_prefs}")
    
    # 🛑 Simulation: Check a condition using the guaranteed 'budget' key
    # It's safer to read the value directly since Pydantic ensured it's there and is a float.
    budget_value = user_prefs.get("budget", 0) 
    if budget_value < 100:
        raise ValueError("Budget is too low to generate a meaningful itinerary.")

    # Return a dummy structured result
    return [
        {"day": 1, "activity": "Explore historical city center and grab local coffee."},
        {"day": 2, "activity": "Visit museum based on interests: " + user_prefs.get("interests", "Art")},
        {"day": 3, "activity": f"Enjoy leisure activity with a budget of {budget_value}"}
    ]


# Request Schema (based on your dataset)
class TripRequest(BaseModel):
    budget: float
    duration_days: int | None = None
    interests: str | None = None  

# Endpoint: Plan Trip
@app.post("/api/plan-trip")
def plan_trip(request: TripRequest):
    # Use .model_dump() instead of .dict() for modern Pydantic usage (Pydantic V2)
    user_prefs = request.model_dump() 
    
    try:
        recommendations = generate_itinerary(user_prefs)
    except ValueError as e:
        # Catch internal logic errors and map them to HTTP 400 (Bad Request)
        raise HTTPException(
            status_code=400, 
            detail=f"Input Error in logic: {str(e)}"
        )
    except Exception as e:
        # Catch unexpected errors and map them to HTTP 500 (Internal Server Error)
        raise HTTPException(
            status_code=500, 
            detail=f"Critical AI processing error: {str(e)}"
        )
        
    return {
        "user_preferences": user_prefs,
        "recommended_spots": recommendations,
        "count": len(recommendations)
    }