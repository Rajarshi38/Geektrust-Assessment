import axios from "axios";
import { API_BASE_URL } from "../constants";

const AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});
AxiosInstance.defaults.headers.post["Content-Type"] = "application/json";
AxiosInstance.defaults.headers.post.Accept = "application/json";

export default AxiosInstance;
