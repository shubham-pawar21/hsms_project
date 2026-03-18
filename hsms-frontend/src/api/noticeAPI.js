// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// // token attach
// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }
//   return req;
// });

// export const fetchNotices = () => API.get("/notices");
// export const createNotice = (data) => API.post("/notices", data);
// export const deleteNotice = (id) => API.delete(`/notices/${id}`);

import axios from "axios";

const API = axios.create({
  baseURL: "https://hsms-project.onrender.com/api",
});

// token attach
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const fetchNotices = () => API.get("/notices");

// ⭐ updated for image upload
export const createNotice = (data) =>
  API.post("/notices", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteNotice = (id) => API.delete(`/notices/${id}`);
