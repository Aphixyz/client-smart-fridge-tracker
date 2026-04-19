import apiClient from "@/plugins/axios";
import type { RegisterFormData } from "@/types/user/request";
import type { RegisterResponse } from "@/types/user/response";

export const registerService = {
  async createUser(payload: RegisterFormData): Promise<RegisterResponse> {
    const response = await apiClient.post("/register", payload);
    return response.data;
  },
};