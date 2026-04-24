import apiClient from "@/plugins/axios";
import { Notification } from "@/types/setting";

export const settingService = {
  async getSetting(): Promise<Notification> {
    const response = await apiClient.get(`/settings`);
    return response.data.data;
  },

  async hybridSetting(data: Notification): Promise<Notification> {
    const response = await apiClient.post(`/settings`, data);
    return response.data.data;
  },
};
