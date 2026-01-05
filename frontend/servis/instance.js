import axios from "axios";

export const instance = axios.create({
  baseURL: "http://192.168.100.121:5000/api",
});
