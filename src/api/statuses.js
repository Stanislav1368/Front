import axios from "axios";
import { BASE_URL } from "./config";

const getStatuses = async () => {
  const response = await axios.get(`${BASE_URL}/api/Statuses`);
  return response.data;
};

export { getStatuses };
