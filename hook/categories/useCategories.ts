"use client";

import { useEffect, useState, useCallback } from "react";
import { categoriesService } from "@/service/categories/categoriesService";
import { Categories, CategoriesRespones } from "@/types/categories";
import { showToast } from "@/lib/toast";

export const useCategories = () => {
  const [categories, setCategories] = useState<CategoriesRespones[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await categoriesService.getCategories();
      setCategories(data);
    } catch (err) {
      const message = "ไม่สามารถโหลดข้อมูลหมวดหมู่ได้";
      setError(message);
      showToast(message, "error");
    } finally {
      setLoading(false);
    }
  }, []);

  const ConfirmDelete = async (id: string | number) => {
    try {
      setLoading(true);
      await categoriesService.deleteCategory(id);
      showToast("ลบข้อมูลสำเร็จ", "success");
      await fetchCategories();
    } catch (error) {
      showToast("ลบข้อมูลไม่สำเร็จ", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    fetchCategories,
    loading,
    categories,
    error,
    ConfirmDelete,
  };
};
