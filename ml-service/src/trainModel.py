import os
import pandas as pd
import pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(BASE_DIR, "data", "TripMate_AI_Dataset_Cleaned.csv")
MODEL_PATH = os.path.join(BASE_DIR, "models", "trip_planner_model.pkl")

# Load Data
df = pd.read_csv(DATA_PATH)

# Encode categorical columns
label_cols = ["city", "category", "guide_name", "vendor_name"]
for col in label_cols:
    if col in df.columns:
        df[col] = LabelEncoder().fit_transform(df[col].astype(str))

# Define a simple "recommended" label
# Spots with rating >= 4.0 and guide/vendor verified are treated as recommended
df["recommended"] = (
    (df["rating"] >= 4.0)
    & (df["guide_verified"] == True)
    & (df["vendor_verified"] == True)
).astype(int)

# Features & target
X = df[
    [
        "entry_fee",
        "rating",
        "distance_from_center_km",
        "travel_time_min",
        "guide_rating",
        "vendor_rating",
        "city",
        "category",
    ]
]
y = df["recommended"]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save model
os.makedirs(os.path.join(BASE_DIR, "models"), exist_ok=True)
with open(MODEL_PATH, "wb") as f:
    pickle.dump(model, f)

print("Model trained and saved at:", MODEL_PATH)
