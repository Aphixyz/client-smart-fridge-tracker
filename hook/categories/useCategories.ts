"use client";

import { useEffect, useState, useCallback } from "react";
import { categoriesService } from "@/service/categories/categoriesService";
import { Category } from "@/types/categories";
import { showToast } from "@/lib/toast";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);

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

  const ConfirmDelete = async (id: number) => {
    try {
      setDeleting(true);
      await categoriesService.deleteCategory(id);
      showToast("ลบข้อมูลสำเร็จ", "success");
      await fetchCategories();
    } catch (error) {
      showToast("ลบข้อมูลไม่สำเร็จ", "error");
    } finally {
      setDeleting(false);
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
    deleting,
  };
};
