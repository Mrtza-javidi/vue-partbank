import axios, { InternalAxiosRequestConfig, AxiosHeaders } from "axios";
import { useToastStore } from "@/stores/toast-store";

const axiosInstance = axios.create({
  baseURL: "https://college.apipart.ir",
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem("token");

    const headersObject = {
      "gateway-system": "turboFront",
      "gateway-token": token ? token : "",
    };
    const headers = AxiosHeaders.from(headersObject);
    config.headers = headers;

    return config;
  },
  (error) => {
    const toastStore = useToastStore();
    toastStore.showToast("خطا در ارسال درخواست.", "error");
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data && response.data.data) {
      return response.data.data;
    }
    return Promise.reject(new Error("No data found in the response."));
  },
  (error) => {
    const toastStore = useToastStore();
    const errorMessage: string =
      error.response?.data?.message || "خطا در برقراری ارتباط با سرور";
    toastStore.showToast(errorMessage, "error");
    return Promise.reject(error);
  }
);

export default axiosInstance;
