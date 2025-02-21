import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/v1/news"; // Corrected API URL

export const fetchNews = async(category = "general", country = "us") => {
    try {
        const response = await axios.get(`${API_BASE_URL}?category=${category}&country=${country}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching news:", error);
        return null;
    }
};