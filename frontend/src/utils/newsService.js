import axios from "axios";

const API_URL = "http://localhost:3000/api/news"; 

export const fetchHealthNews = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching health news:", error);
        return [];
    }
};
