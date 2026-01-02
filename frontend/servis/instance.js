import axios from "axios";

export const instance = axios.create({
  baseURL: "http://192.168.1.199:5000/api",
});
