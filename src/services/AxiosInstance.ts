import axios, { AxiosError } from "axios";
import { getEnvironmentValue } from "../utils";
import { setErrorInterceptor, store } from "../redux";

export const axiosInstance = axios.create({
  baseURL: getEnvironmentValue("apiUrl"),
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "skip-browser-warning",
  },
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: AxiosError) {
    if (error.response) {
      if (error.response.status >= 500) {
        store.dispatch(
          setErrorInterceptor({
            code: error.response.status,
            text: "Server sedang error. Silahkan menunggu beberapa saat kembali.",
          })
        );
      }
    }

    return Promise.reject(error);
  }
);
