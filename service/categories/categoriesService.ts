import apiClient from "@/plugins/axios";
import { Categories, CategoriesRespones } from "@/types/categories/index";

export const categoriesService = {
  async getCategories(): Promise<Categories[]> {
    const response = await apiClient.get("/categories");
    return response.data.data ?? [];
  },

  async createCategory(data: Partial<Categories>): Promise<Categories> {
    const response = await apiClient.post("/categories", data);
    return response.data.data ?? [];
  },

  async updateCategory(
    id: number | string,
    data: Partial<Categories>,
  ): Promise<Categories> {
    const response = await apiClient.put(`/categories/${id}`, data);
    return response.data.data;
  },

  async deleteCategory(id: number | string): Promise<void> {
    await apiClient.delete(`/categories/${id}`);
  },
};
