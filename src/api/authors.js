import axios from "axios";

const getAuthors = async () => {
  const response = await axios.get("https://localhost:7133/api/Authors");
  return response.data;
};

export { getAuthors };
