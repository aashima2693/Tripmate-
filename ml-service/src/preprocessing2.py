import pandas as pd
from sklearn.preprocessing import LabelEncoder

def load_and_preprocess_data(path: str):
    # Load dataset
    df = pd.read_csv(path)
    
    # Handle missing values (if any)
    df.fillna({
        'weather_condition': 'Clear',
        'road_condition': 'Good',
        'time_of_day': 'Day',
        'nearby_incidents': 0,
        'humidity': df['humidity'].mean(),
        'visibility': df['visibility'].mean(),
        'temperature': df['temperature'].mean()
    }, inplace=True)
    
    # Encode categorical columns
    label_encoders = {}
    for col in ['weather_condition', 'road_condition', 'time_of_day']:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col])
        label_encoders[col] = le
    
    # Split features and target
    X = df.drop('safety_label', axis=1)
    y = df['safety_label']
    
    return X, y, label_encoders
