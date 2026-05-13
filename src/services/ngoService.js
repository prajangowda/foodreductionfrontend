import axios from "axios";

const API = "http://localhost:8080/ngo";

const getAuthHeader = () => {

  return {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  };
};

/* GET ALL NGO DONATIONS */

export const getNgoDonations = async () => {

  const response = await axios.get(
    `${API}/donations`,
    getAuthHeader()
  );
  
  return response.data;
};

/* ACCEPT DONATION */

export const acceptDonation = async (donationId) => {

  const response = await axios.put(
    `${API}/accept/${donationId}`,
    {},
    getAuthHeader()
  );
  
  return response.data;
};

export const getMyNgoDonations = async () => {

  const response = await axios.get(
    `${API}/my-donations`,
    getAuthHeader()
  );
 return response.data;
};