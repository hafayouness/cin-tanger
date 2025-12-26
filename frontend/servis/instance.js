import axios from "axios";

export const instance = axios.create({
  baseURL: "https://fairylike-harlee-unsurvived.ngrok-free.dev",
});
