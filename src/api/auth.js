import axios from "axios";

const login = async (data) => {
    console.log(data)
    const response = await axios.post("https://localhost:7133/api/login", data);
    return response.data;
  };
  
  export { login };