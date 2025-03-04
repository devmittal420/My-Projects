import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5004",
  withCredentials: true,
});

export const checkSession = () => API.get("/check-session");
export const submitForm = (formdata) => API.post("/submit", formdata);
export const logout = (id) => API.post("/logout", { id });
