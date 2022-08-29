import axios from "axios";

export const axiosUrlEncoded = () => {
  return axios.create({
    baseURL: `http://localhost:8000/api/v1/`,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
};

export const axiosJson = () => {
  return axios.create({
    baseURL: `http://localhost:8000/api/v1/`,
    headers: { "Content-Type": "application/json" },
  });
};

export const axiosFiles = () => {
  return axios.create({
    baseURL: `http://localhost:8000/api/v1/`,
    headers: { "content-type": "multipart/form-data" },
  });
};
