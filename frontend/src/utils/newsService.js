import axios from "axios";
import { backendUrl } from "./urlApi"; // Adjust the import path as necessary

const API_URL = `${backendUrl}/api/news`;

export const fetchHealthNews = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching health news:", error);
    return [];
  }
};
