import apiClient from "@/plugins/axios";
import { AuthToken } from "@/plugins/auth";
import type { LoginFormData } from "@/types/user/request";
import type { LoginResponse } from "@/types/user/response";

export const AuthService = {
  getProfile: async () => {
    try {
      const response = await apiClient.get("/auth/session");

      if (response.data) {
        AuthToken.setUser(response.data);
      }

      return response.data;
    } catch (error) {
      AuthToken.clear();
      throw error;
    }
  },

  login: async (payload: LoginFormData): Promise<LoginResponse> => {
    const response = await apiClient.post("/auth/login", payload);
    return response.data;
  },

  logout: async () => {
    AuthToken.clear();
    window.location.href = "/auth/login";
  },

  isAuthenticated: (): boolean => {
    return !!AuthToken.get();
  },
};
