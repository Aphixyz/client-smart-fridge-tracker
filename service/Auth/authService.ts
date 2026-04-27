import apiClient from "@/plugins/axios";
import { AuthToken } from "@/plugins/auth";
import { UserProfileResponse } from "@/types/user/response";

export type LoginFormData = {
  username: string;
  password: string;
};

export type AuthUser = {
  id: number;
  name?: string;
  username: string;
};

export type LoginResponse = {
  success?: boolean;
  message?: string;
  data?: {
    user?: AuthUser;
  };
};

export const AuthService = {
  login: async (payload: LoginFormData): Promise<LoginResponse> => {
    const response = await apiClient.post("/auth/login", payload);
    return response.data;
  },

  getProfile: async (): Promise<UserProfileResponse> => {
    const response = await apiClient.get("/profiles");
    return response.data;
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post("/auth/logout");
    } finally {
      AuthToken.clear();
    }
  },

  getLocalUser: (): AuthUser | null => {
    return AuthToken.getUser<AuthUser>();
  },
};
