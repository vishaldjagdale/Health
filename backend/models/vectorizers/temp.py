import pickle

try:
    with open("respiratory_vectorizer.pkl", "rb") as f:
        vectorizer = pickle.load(f)
    print("Vectorizer loaded successfully!")
except Exception as e:
    print(f"Error loading vectorizer: {e}")
