from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests
import re
import pickle
import numpy as np
import pandas as pd
import tensorflow as tf
from sklearn.metrics.pairwise import cosine_similarity
from PIL import Image
import io
from pydantic import BaseModel
from typing import List

app = FastAPI(title="Disease Prediction & Chat API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # ✅ Replace "*" with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------- Health Challenge & Habit Tracking --------------------

# In-memory storage (Replace with DB in production)
user_habits = {}
user_challenges = {}

# Habit Data Model
class Habit(BaseModel):
    user_id: str
    habit_name: str
    progress: int  # e.g., 5/30 days completed

# Challenge Data Model
class Challenge(BaseModel):
    user_id: str
    challenge_name: str
    completed_days: int

@app.post("/track-habit")
async def track_habit(habit: Habit):
    if habit.user_id not in user_habits:
        user_habits[habit.user_id] = []
    user_habits[habit.user_id].append(habit)
    return {"message": "Habit tracked successfully"}

@app.post("/join-challenge")
async def join_challenge(challenge: Challenge):
    if challenge.user_id not in user_challenges:
        user_challenges[challenge.user_id] = []
    user_challenges[challenge.user_id].append(challenge)
    return {"message": "Challenge joined successfully"}

@app.get("/user-progress/{user_id}")
async def get_user_progress(user_id: str):
    return {
        "habits": user_habits.get(user_id, []),
        "challenges": user_challenges.get(user_id, [])
    }
    
@app.post("/increment-habit")
async def increment_habit(data: dict):
    user_id = data["user_id"]
    habit_name = data["habit_name"]
    
    if user_id in user_habits:
        for habit in user_habits[user_id]:
            if habit.habit_name == habit_name:
                habit.progress += 1
                return {"message": f"Progress for '{habit_name}' incremented successfully!", "progress": habit.progress}

    raise HTTPException(status_code=404, detail="Habit not found")


@app.post("/increment-challenge")
async def increment_challenge(data: dict):
    user_id = data["user_id"]
    challenge_name = data["challenge_name"]
    
    if user_id in user_challenges:
        for challenge in user_challenges[user_id]:
            if challenge.challenge_name == challenge_name:
                challenge.completed_days += 1
                return {"message": f"Progress for challenge '{challenge_name}' incremented successfully!", "completed_days": challenge.completed_days}

    raise HTTPException(status_code=404, detail="Challenge not found")


# -------------------- Gemini Chat API --------------------

# Gemini API Configuration
GEMINI_API_KEY = "AIzaSyCaEtGh2eP9ykuxNXdki-IWcf2cDd1Duo8"
GEMINI_API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={GEMINI_API_KEY}"

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat(request: ChatRequest):
    headers = {"Content-Type": "application/json"}
    payload = {"contents": [{"parts": [{"text": request.message}]}]}

    response = requests.post(GEMINI_API_URL, json=payload, headers=headers)

    if response.status_code == 200:
        try:
            reply = response.json()["candidates"][0]["content"]["parts"][0]["text"]
            return {"reply": reply}
        except KeyError:
            return {"error": "Invalid response format from Gemini API"}
    else:
        return {"error": f"Gemini API Error: {response.status_code}, {response.text}"}

# -------------------- Skin Disease Prediction --------------------

# Load trained .h5 model
model = tf.keras.models.load_model("./models/skin_disease_model.h5")

# Define class labels based on model training
CLASS_NAMES = [
    "Actinic keratosis", "Atopic Dermatitis", "Benign keratosis",
    "Dermatofibroma", "Melanocytic nevus", "Melanoma",
    "Squamous cell carcinoma", "Tinea Ringworm Candidiasis", "Vascular lesion"
]

def preprocess_image(image):
    img = Image.open(io.BytesIO(image)).convert("RGB")
    img = img.resize((224, 224))  # Resize to match model input size
    img_array = np.array(img) / 255.0  # Normalize
    img_array = np.expand_dims(img_array, axis=0)  # Expand dimensions
    return img_array

@app.post("/predict_image")
async def predict_disease(file: UploadFile = File(...)):
    image_data = await file.read()
    processed_image = preprocess_image(image_data)

    prediction = model.predict(processed_image)
    predicted_class = CLASS_NAMES[np.argmax(prediction)]  # Get highest probability class
    
    return {"disease": predicted_class}

# -------------------- Symptom-based Disease Prediction --------------------

# Load stop words
with open("./models/stop_words.ob", "rb") as fp:
    domain_stop_word = pickle.load(fp)

def clean_text(text):
    """Clean and preprocess input text."""
    text = str(text).lower()
    text = re.sub(r"[^a-z ]", " ", text)
    text = " ".join([word for word in text.split() if word not in domain_stop_word])
    return text

# Load main disease dataset
df_main = pd.read_csv("./models/updated_disease_with_description.csv")
df_main = df_main.rename(columns={'D_Name': 'main_disease'})
df_main['cleaned_text'] = df_main['Description'].apply(clean_text)
disease_names = df_main['main_disease'].tolist()  # Extract disease names

# Load main disease vectorizer & vectors
with open("./models/vectorizers/vectorizer_main.pkl", "rb") as f:
    vectorizer_main = pickle.load(f)
with open("./models/main_disease_vectors.pkl", "rb") as f:
    main_disease_vectors = pickle.load(f)

def predict_disease_symptoms(user_input: str):
    """Predict main and sub-disease based on user symptoms."""
    cleaned_input = clean_text(user_input)

    # Compute cosine similarity for main disease
    input_vector = vectorizer_main.transform([cleaned_input])
    similarity_scores = cosine_similarity(input_vector, main_disease_vectors)
    main_disease_index = np.argmax(similarity_scores)
    main_disease = disease_names[main_disease_index]  # Fetch disease name

    # Load corresponding sub-disease model and vectorizer
    try:
        with open(f"./models/vectorizers/{main_disease}_vectorizer.pkl", "rb") as f:
            vectorizer_sub = pickle.load(f)
        with open(f"./models/subdisease_models/{main_disease}_model.pkl", "rb") as f:
            model = pickle.load(f)
        
        # Predict sub-disease
        input_vector_sub = vectorizer_sub.transform([cleaned_input])
        sub_disease = model.predict(input_vector_sub)[0]
    except FileNotFoundError:
        sub_disease = "No sub-disease model available"

    return {"main_disease": main_disease, "sub_disease": sub_disease}

@app.get("/")
def home():
    return {"message": "Welcome to the Disease Prediction API!"}

@app.post("/predict")
def get_prediction(user_input: str = Form(...)):
    """API endpoint to predict disease from user symptoms."""
    prediction = predict_disease_symptoms(user_input)
    return prediction

