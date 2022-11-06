import axios, { AxiosRequestConfig } from "axios";
import { getUserFromLocalStorage } from "./localStorage";

export const customFetch = axios.create({
  baseURL: "https://jobify-prod.herokuapp.com/api/v1/toolkit",
});

customFetch.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const user = getUserFromLocalStorage();
    if (user) {
      config.headers = {
        authorization: `Bearer ${user.token}`,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
