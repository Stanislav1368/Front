import axios from "axios";
import { BASE_URL } from "./config";

const login = async (data) => {
    console.log(data)
    const response = await axios.post(`${BASE_URL}/api/auth/login`, data);
    console.log(response.data)
    return response.data;
  };
  
  export { login };