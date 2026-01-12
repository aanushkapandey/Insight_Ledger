# predict.py
import argparse
import joblib
import numpy as np

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--transaction_count", type=float, required=True)
    parser.add_argument("--avg_transaction_value", type=float, required=True)
    parser.add_argument("--transaction_frequency", type=float, required=True)
    parser.add_argument("--wallet_age", type=float, required=True)
    args = parser.parse_args()

    model = joblib.load("trained_model.pkl")
    scaler = joblib.load("scaler.pkl")

    features = np.array([[args.transaction_count, args.avg_transaction_value, args.transaction_frequency, args.wallet_age]])
    features_scaled = scaler.transform(features)
    prediction = model.predict(features_scaled)
    risk_label = "High Risk" if prediction[0] == 0 else "Low Risk"
    print(risk_label)

if __name__ == "__main__":
    main()




