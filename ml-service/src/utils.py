import math
import pandas as pd

# Distance Calculator (Haversine formula)
def haversine_distance(lat1, lon1, lat2, lon2):
    """Calculate distance (in km) between two lat/lon coordinates."""
    R = 6371  # Earth radius in km
    d_lat = math.radians(lat2 - lat1)
    d_lon = math.radians(lon2 - lon1)
    a = (
        math.sin(d_lat / 2) ** 2
        + math.cos(math.radians(lat1))
        * math.cos(math.radians(lat2))
        * math.sin(d_lon / 2) ** 2
    )
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c

# Destination Scoring
def score_destination(row, user_preferences):
    """Simple rule-based score."""
    score = 0

    # Budget-based scoring
    if "budget" in user_preferences:
        score += max(0, 100 - abs(row.get("entry_fee", 0) - user_preferences["budget"]/10))

    # Interest matching
    if "interests" in user_preferences:
        for interest in str(user_preferences["interests"]).split(","):
            if interest.strip().lower() in str(row.get("category", "")).lower():
                score += 30

    # Rating and verification bonus
    score += row.get("rating", 0) * 5
    if row.get("guide_verified"):
        score += 10
    if row.get("vendor_verified"):
        score += 10

    return score

# Filtering Destinations
def filter_destinations(df: pd.DataFrame, user_preferences: dict):
    """Filter destinations based on climate, budget, and activity."""
    filtered = df.copy()

    if "climate" in user_preferences:
        filtered = filtered[
            filtered["Climate"].str.contains(user_preferences["climate"], case=False, na=False)
        ]
    if "budget" in user_preferences:
        filtered = filtered[filtered["Avg_Cost"] <= user_preferences["budget"]]

    return filtered.reset_index(drop=True)
