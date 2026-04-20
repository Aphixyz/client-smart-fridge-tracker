import apiClient from "@/plugins/axios";
import type { Fridge, FridgeProduct } from "@/types/fridge/responce";

export const fridgeService = {
  async getFridges(): Promise<Fridge[]> {
    const response = await apiClient.get("/fridges");
    return response.data.data;
  },
};

export const fridgeProductService = {
  async getFridgeProducts(): Promise<FridgeProduct[]> {
    const response = await apiClient.get("/fridge-products");
    return response.data.data;
  },

  async getFridgeProductsByFridgeId(fridgeId: string): Promise<FridgeProduct[]> {
    const response = await apiClient.get(`/fridges/${fridgeId}/products`);
    return response.data.data;
  },
};