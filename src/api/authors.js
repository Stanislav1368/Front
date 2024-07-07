import axios from "axios";
import { BASE_URL } from "./config";

const getAuthors = async () => {
  const response = await axios.get(`${BASE_URL}/api/Authors`);
  return response.data;
};

export { getAuthors };
