import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from preprocessing import load_and_preprocess_data

# Load & preprocess
X, y, label_encoders = load_and_preprocess_data("data/risk_prediction_dataset.csv")

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save model and encoders
joblib.dump(model, "models/risk_model.pkl")
joblib.dump(label_encoders, "models/label_encoders.pkl")

print(" Model trained and saved as risk_model.pkl")
