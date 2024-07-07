import axios from "axios";

const login = async (data) => {
    console.log(data)
    const response = await axios.post("https://localhost:7133/api/auth/login", data);
    console.log(response.data)
    return response.data;
  };
  
  export { login };