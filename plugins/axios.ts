import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 วินาที
});

import { AuthToken } from "@/plugins/auth";

apiClient.interceptors.request.use(
  (config) => {
    const token = AuthToken.get();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

import { showToast } from "@/lib/toast";

const handleError = (error: any) => {
  let message = "เกิดข้อผิดพลาดในการเชื่อมต่อระบบ";

  if (error.response) {
    const status = error.response.status;
    const serverMessage = error.response.data?.message;

    switch (status) {
      case 400:
        message = serverMessage || "ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง";
        break;
      case 401:
        message = "เซสชั่นหมดอายุ กรุณาเข้าสู่ระบบใหม่";
        if (typeof window !== "undefined") {
          AuthToken.clear();
          window.location.href = "/auth/login";
        }
        break;
      case 403:
        message = "คุณไม่มีสิทธิ์เข้าถึงส่วนนี้";
        break;
      case 404:
        message = "ไม่พบข้อมูลที่ต้องการ";
        break;
      case 422:
        message =
          serverMessage || "ข้อมูลไม่ผ่านการตรวจสอบ (Validation Failed)";
        break;
      case 500:
        message = "เกิดข้อผิดพลาดจากทางเซิร์ฟเวอร์ (Internal Server Error)";
        break;
      default:
        message =
          serverMessage || `เกิดข้อผิดพลาดที่ไม่รู้จัก (Code: ${status})`;
    }
  } else if (error.request) {
    message = "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาเช็คอินเทอร์เน็ตของคุณ";
  }

  return Promise.reject(error);
};

apiClient.interceptors.response.use(
  (response) => response,
  (error) => handleError(error),
);

import { FileUtils } from "@/utils";

export const ApiHelper = {
  downloadFile: async (
    url: string,
    params?: any,
    fileName: string = "file",
  ): Promise<void> => {
    const response = await apiClient.get(url, { params, responseType: "blob" });
    const mimeType = response.headers["content-type"];
    FileUtils.downloadBlob(response.data, fileName, mimeType);
  },

  previewPdf: async (url: string, params?: any): Promise<void> => {
    const response = await apiClient.get(url, { params, responseType: "blob" });
    FileUtils.previewBlob(response.data, "application/pdf");
  },
};

export default apiClient;
