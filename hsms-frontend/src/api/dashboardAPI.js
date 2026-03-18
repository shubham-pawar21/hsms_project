import axios from "axios";

const API = axios.create({
  baseURL: "https://hsms-project.onrender.com/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const fetchAdminDashboard = () => API.get("/dashboard/admin");

export const fetchMemberDashboard = () => API.get("/dashboard/member");
