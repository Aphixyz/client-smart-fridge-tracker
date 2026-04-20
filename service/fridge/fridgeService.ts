import apiClient from "@/plugins/axios";
import type { Fridge } from "@/types/fridge/responce";

export const fridgeService = {
  async getFridges(): Promise<Fridge[]> {
    const response = await apiClient.get("/fridges");
    return response.data.data;
  },
};