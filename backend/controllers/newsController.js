import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const getNews = async(req, res) => {
    try {
        const apiKey = process.env.NEWS_API_KEY;
        console.log("Using API Key:", apiKey); // Debugging log
        console.log("Query Params:", req.query); // Check query params

        const { category = "general", country = "us" } = req.query;
        const response = await axios.get(
            `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`
        );

        console.log("News API Response:", response.data); // Debugging log
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching news:", error.response.data || error.message);
        res.status(500).json({ error: "Failed to fetch news" });
    }
};

export default getNews;