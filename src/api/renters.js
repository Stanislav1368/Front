import axios from "axios";
import { BASE_URL } from "./config";

const getRenters = async () => {
  const response = await axios.get(`${BASE_URL}/api/Renters`);
  return response.data;
};

const createRenter = async (data) => {
  console.log(data)
    try {
      const response = await axios.post(`${BASE_URL}/api/Renters`, data);
      console.log(response.data)
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export { getRenters, createRenter };