import axios from "axios";

const API = "http://localhost:8080/donor";

const getAuthHeader = () => {
  return {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  };
};

export const createDonation = async (data) => {
  const response = await axios.post(`${API}/donate`, data, getAuthHeader());
  return response.data;
};

export const getMyDonations = async () => {
  const response = await axios.get(`${API}/my`, getAuthHeader());
  return response.data;
};