import apiClient from "@/plugins/axios";
import type { Fridge, FridgeProduct } from "@/types/fridge";

export const fridgeService = {
  async getFridges(): Promise<Fridge[]> {
    const response = await apiClient.get("/fridges");
    return response.data.data;
  },

  async createFridge(payload: any): Promise<any> {
    const response = await apiClient.post("/fridges", payload);
    return response.data;
  }
};

export const fridgeProductService = {
  async getFridgeProducts(): Promise<FridgeProduct[]> {
    const response = await apiClient.get("/fridge-products");
    return response.data.data;
  },

  async getFridgeProductsByFridgeId(fridgeId: number): Promise<FridgeProduct[]> {
    const response = await apiClient.get(`/fridges/${fridgeId}/products`);
    return response.data.data;
  },

  async deleteProductFromFridge(fridgeId: number, productId: number): Promise<void> {
    await apiClient.delete(`/fridges/${fridgeId}/products/${productId}`);
  },

  async insertProductToFridge(fridgeId: number, payload: any): Promise<any> {
    const response = await apiClient.post(`/fridges/${fridgeId}/products`, payload);
    return response.data;
  }
};

