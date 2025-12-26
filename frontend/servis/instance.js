import axios from "axios";

export const instance = axios.create({
  baseURL: "http://192.168.68.115:5000/api",
});
