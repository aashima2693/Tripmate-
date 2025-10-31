import os
import pandas as pd

# Path setup
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW_DATA_PATH = os.path.join(BASE_DIR, "data", "TripMate_AI_Dataset.csv")
CLEANED_DATA_PATH = os.path.join(BASE_DIR, "data", "TripMate_AI_Dataset_Cleaned.csv")

# Load Dataset
def load_data():
    """Load the raw TripMate dataset."""
    try:
        df = pd.read_csv(RAW_DATA_PATH)
        return df
    except FileNotFoundError:
        raise FileNotFoundError(f"Dataset not found at: {RAW_DATA_PATH}")
    
# Clean Dataset
def clean_data(df: pd.DataFrame):
    """Clean and preprocess the TripMate dataset."""
    # Drop exact duplicates
    df = df.drop_duplicates()

    # Remove completely empty rows
    df = df.dropna(how="all")

    # Fill numeric missing values with mean
    num_cols = df.select_dtypes(include=["number"]).columns
    df[num_cols] = df[num_cols].fillna(df[num_cols].mean())

    # Fill categorical missing values with mode
    cat_cols = df.select_dtypes(include=["object", "bool"]).columns
    for col in cat_cols:
        if not df[col].mode().empty:
            df[col] = df[col].fillna(df[col].mode()[0])

    # Convert TRUE/FALSE columns to boolean
    bool_cols = ["guide_verified", "vendor_verified"]
    for col in bool_cols:
        if col in df.columns:
            df[col] = df[col].astype(str).str.lower().map({"true": True, "false": False})

    # Ensure rating columns are within valid range
    for col in ["rating", "guide_rating", "vendor_rating"]:
        if col in df.columns:
            df[col] = df[col].clip(1, 5)

    return df

# Save Cleaned Data
def save_cleaned_data(df: pd.DataFrame):
    """Save cleaned dataset."""
    df.to_csv(CLEANED_DATA_PATH, index=False)

# Runner
if __name__ == "__main__":
    data = load_data()
    cleaned = clean_data(data)
    save_cleaned_data(cleaned)
