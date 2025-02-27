import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const apiKey = process.env.NEWS_API_KEY; 


export const getHealthNews = async (req, res) => {
    try {
        const response = await axios.get(`https://gnews.io/api/v4/top-headlines?category=health?country=india&apikey=${apiKey}`, {
            params: {
                category: "health",
                country: "us",
                // apiKey: process.env.NEWS_API_KEY,
            },
        });

        res.json(response.data.articles);
    } catch (error) {
        console.error("Error fetching news:", error);
        res.status(500).json({ message: "Error fetching news" });
    }
};
