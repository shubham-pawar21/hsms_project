import api from "./axios";

export const fetchBillsAPI = async () => {
  const res = await api.get("/maintenance");
  return res.data;
};


export const addBillAPI = async (data) => {
  const res = await api.post("/maintenance", data);
  return res.data;
};

export const updateBillAPI = async (id, data) => {
  const res = await api.put(`/maintenance/${id}`, data);
  return res.data;
};

export const deleteBillAPI = async (id) => {
  await api.delete(`/maintenance/${id}`);
};
