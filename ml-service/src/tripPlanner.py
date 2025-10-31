import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import os
import pandas as pd
import pickle
from src.utils import filter_destinations, score_destination

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(BASE_DIR, "data", "TripMate_AI_Dataset_Cleaned.csv")
MODEL_PATH = os.path.join(BASE_DIR, "models", "trip_planner_model.pkl")

# Load model (if available)
def load_model():
    if os.path.exists(MODEL_PATH):
        with open(MODEL_PATH, "rb") as f:
            model = pickle.load(f)
        return model
    else:
        print(" No model found, using rule-based scoring instead.")
        return None

# Generate Itinerary
def generate_itinerary(user_preferences: dict, top_n=5):
    df = pd.read_csv(DATA_PATH)
    df_filtered = filter_destinations(df, user_preferences)

    model = load_model()
    if model:
        feature_cols = [
            "entry_fee",
            "rating",
            "distance_from_center_km",
            
            "travel_time_min",
            "guide_rating",
            "vendor_rating",
        ]
        df_filtered["score"] = model.predict_proba(df_filtered[feature_cols])[:, 1]
    else:
        df_filtered["score"] = df_filtered.apply(
            lambda row: score_destination(row, user_preferences), axis=1
        )

    recommendations = (
        df_filtered.sort_values(by="score", ascending=False)
        .head(top_n)
        .reset_index(drop=True)
    )

    itinerary = recommendations[
        [
            "city",
            "spot_name",
            "category",
            "entry_fee",
            "rating",
            "guide_rating",
            "vendor_rating",
        ]
    ]
    return itinerary.to_dict(orient="records")
