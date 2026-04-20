import apiClient from "@/plugins/axios";
import { AuthToken } from "@/plugins/auth";

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
    const user = response.data?.data?.user;
    if (user) {
      AuthToken.setUser(user);
    }
    return response.data;
  },

  // getProfile: async (): Promise<LoginResponse> => {
  //   try {
  //     const response = await apiClient.get("/auth/session");
  //     const user = response.data?.data?.user;
  //     if (user) {
  //       AuthToken.setUser(user);
  //     }
  //     return response.data;
  //   } catch (error) {
  //     AuthToken.clear();
  //     throw error;
  //   }
  // },

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
