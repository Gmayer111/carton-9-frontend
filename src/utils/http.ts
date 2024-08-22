import axios, { AxiosError, AxiosResponse } from "axios";

const baseURL = process.env.API_URL || "http://localhost:3000";

export const http = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setToken = (token: string) => {
  http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

