import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const loginUserApi = (formData) =>
  API.post("/auth/login", formData);

export const registerUserApi = (formData) =>
  API.post("/auth/register", formData);
