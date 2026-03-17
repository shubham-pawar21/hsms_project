import api from "./axios";

export const fetchMemberBillsAPI = async () => {
  const res = await api.get("/member/maintenance");
  return res.data;
};

//  pay a bill
export const payBillAPI = async (billId) => {
  const res = await api.put(`/member/maintenance/pay/${billId}`);
  return res.data;
};