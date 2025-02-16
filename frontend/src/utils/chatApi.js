const API_URL = "http://localhost:8000/chat";

export async function fetchChatResponse(userMessage) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();
    return data.reply || "Error: No response";
}
