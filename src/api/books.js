// src/api/books.js
import axios from "axios";

const API_BASE_URL = "https://localhost:7133/api";

export const getBooks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Books`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
