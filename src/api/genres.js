import axios from "axios";
import { BASE_URL } from "./config";

const getGenres = async () => {
  const response = await axios.get(`${BASE_URL}/api/Genres`);
  return response.data;
};

export { getGenres };
