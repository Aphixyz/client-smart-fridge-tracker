import apiClient from "@/plugins/axios";
import { AuthToken } from "@/plugins/auth";

export const AuthService = {

    getProfile: async () => {
        try {
            const response = await apiClient.get('/auth/session');

            if (response.data) {
                AuthToken.setUser(response.data);
            }

            return response.data;
        } catch (error) {
            AuthToken.clear();
            throw error;
        }
    },

    login: async (credentials: any) => {
        const response = await apiClient.post('/auth/login', credentials);
        if (response.data?.token) {
            AuthToken.set(response.data.token);
            await AuthService.getProfile();
        }
        return response.data;
    },

    isAuthenticated: (): boolean => {
        return !!AuthToken.get();
    }
};
