from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
from pydantic import BaseModel
import tensorflow as tf
import numpy as np
from PIL import Image
import io

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

# Gemini API Configuration
GEMINI_API_KEY = "AIzaSyCaEtGh2eP9ykuxNXdkiI-Wcf2cDd1Duo8"
GEMINI_API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={GEMINI_API_KEY}"

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat(request: ChatRequest):
    headers = {
        "Content-Type": "application/json"
    }

    payload = {
        "contents": [{"parts": [{"text": request.message}]}]
    }

    response = requests.post(GEMINI_API_URL, json=payload, headers=headers)

    # Debugging: Print response
    print("Response Status:", response.status_code)
    print("Response Text:", response.text)

    if response.status_code == 200:
        try:
            reply = response.json()["candidates"][0]["content"]["parts"][0]["text"]
            return {"reply": reply}
        except KeyError:
            return {"error": "Invalid response format from Gemini API"}
    else:
        return {"error": f"Gemini API Error: {response.status_code}, {response.text}"}

# Load the trained .h5 model
model = tf.keras.models.load_model("./models/skin_disease_model.h5")

# Define class labels based on your model's training classes
CLASS_NAMES = ["Actinic keratosis", "Atopic Dermatitis", "Benign keratosis", "Dermatofibroma", "Melanocytic nevus", "Melanoma", "Squamous cell carcinoma", "Tinea Ringworm Candidiasis", "Vascular lesion"]  # Modify based on your dataset


def preprocess_image(image):
    img = Image.open(io.BytesIO(image)).convert("RGB")  # Convert to RGB
    img = img.resize((224, 224))  # Resize to match model input size
    img_array = np.array(img) / 255.0  # Normalize
    img_array = np.expand_dims(img_array, axis=0)  # Expand dimensions for batch
    return img_array

from fastapi import File, UploadFile
@app.post("/predict_image")
async def predict_disease(file: UploadFile = File(...)):
    image_data = await file.read()
    processed_image = preprocess_image(image_data)
    
    prediction = model.predict(processed_image)
    predicted_class = CLASS_NAMES[np.argmax(prediction)]  # Get the highest probability class
    
    return {"disease": predicted_class}








