import axios from "axios";

const getStatuses = async () => {
  const response = await axios.get("https://localhost:7133/api/Statuses");
  return response.data;
};

export { getStatuses };
