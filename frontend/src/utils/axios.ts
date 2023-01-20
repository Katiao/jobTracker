import axios, { AxiosRequestConfig } from "axios";
import { getUserFromLocalStorage } from "./localStorage";
import { clearStore } from "../features/user/userSlice";

export const customFetch = axios.create({
  baseURL: "/api/v1",
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

export const handleRequestError = (error: any, thunkAPI: any) => {
  if (error.response.status === 401) {
    // TODO: fix issue of toast showing up twice
    thunkAPI.dispatch(clearStore("Unauthorized! Logging Out..."));
    return thunkAPI.rejectWithValue();
  }
  return thunkAPI.rejectWithValue(error.response.data.msg);
};
