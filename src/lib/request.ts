import { API_BASE_URL } from "@/constants";
import axios from "axios";

export const request = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
