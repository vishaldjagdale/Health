import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/v1/news"; // Ensure your backend is running

export const fetchNews = async() => {
    try {
        const response = await axios.get(API_BASE_URL);
        console.log("Fetched news data from backend:", response.data); // Debugging log
        return response.data; // Make sure this returns `{ articles: [...] }`
    } catch (error) {
        console.error("Error fetching news from backend:", error);
        return { articles: [] };
    }
};