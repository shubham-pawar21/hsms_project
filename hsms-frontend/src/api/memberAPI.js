import api from "./axios";

export const fetchMembers = () => api.get("/members");
export const addMember = (data) => api.post("/members", data);
export const updateMember = (id, data) => api.put(`/members/${id}`, data);
export const deleteMember = (id) => api.delete(`/members/${id}`);
