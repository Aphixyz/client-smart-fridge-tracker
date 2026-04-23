import apiClient from "@/plugins/axios";
import {
  CategoriesResponse,
  CategoryForm,
  Category,
  CategoryResponse,
} from "@/types/categories/index";

export const categoriesService = {
  async getCategories(): Promise<Category[]> {
    const response = await apiClient.get<CategoriesResponse>("/categories");
    return response.data.data ?? [];
  },

  async getCategoryById(id: number): Promise<Category> {
    const response = await apiClient.get<CategoryResponse>(`/categories/${id}`);
    return response.data.data;
  },

  createCategory: async (data: FormData) => {
    const response = await apiClient.post("/categories", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  updateCategory: async (id: number, data: FormData) => {
    const response = await apiClient.put(`/categories/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  async deleteCategory(id: number | string): Promise<void> {
    await apiClient.delete(`/categories/${id}`);
  },
};
