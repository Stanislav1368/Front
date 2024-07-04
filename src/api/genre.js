import axios from "axios";

const getGenres = async () => {
  const response = await axios.get("https://localhost:7133/api/Genres");
  return response.data;
};

export { getGenres };
