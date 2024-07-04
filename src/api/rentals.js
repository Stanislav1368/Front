import axios from "axios";
import { BASE_URL } from "./config";

const getRentals = async () => {
  const response = await axios.get(`${BASE_URL}/api/Rentals`);
  return response.data;
};

const createRental = async (rental) => {
  const response = await axios.post(`${BASE_URL}/api/Rentals`, rental);
  return response.data;
};

const updateRental = async (id, rental) => {
  console.log(rental);
  const response = await axios.put(`${BASE_URL}/api/Rentals/${id}`, rental);
  console.log(response.data);
  return response.data;
};

export { getRentals, createRental, updateRental };
