import axios from "axios";
import { getSession } from "next-auth/react";

const baseURL = process.env.API_URL || "http://localhost:3000";

export const http = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(async (config: any) => {
  const session = await getSession();

  if (session) {
    config.headers.Authorization = `Bearer ${session?.user.access_token}`;
  }
  return config;
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(`error`, error);
  }
);
