import apiClient from "@/plugins/axios";
import { Proudct } from "@/types/product";

export const productService = {
  async getProductById( productId: number): Promise<Proudct> {
    const response = await apiClient.get(`/products/${productId}`);
    return response.data.data;
  },

  async updateProduct( productId: number, data:Partial<Proudct>): Promise<any> {
    const response = await apiClient.patch(`/products/${productId}`, data);
    return response.data;
  },
};
