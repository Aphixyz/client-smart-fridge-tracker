import axios from "axios";

export const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const responseMessage = error.response?.data?.message;

    if (typeof responseMessage === "string" && responseMessage.trim()) {
      if (responseMessage === "username already exists") {
        return "มีชื่อผู้ใช้นี้อยู่แล้ว";
      }

      return responseMessage;
    }

    if (error.message) {
      return error.message;
    }
  }

  return "เกิดข้อผิดพลาดจากเครือข่าย";
};