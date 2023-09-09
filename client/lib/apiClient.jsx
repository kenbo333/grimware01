import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  // baseURL: process.env.NEXT_PUBLIC_API_BASEURL,
});

export default apiClient;
