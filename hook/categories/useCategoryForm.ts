"use client";

import { CategoryForm } from "@/types/categories";
import { useRouter } from "next/navigation";
import {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  FormEvent,
} from "react";
import { categoriesService } from "@/service/categories/categoriesService";

const initialForm: CategoryForm = {
  name: "",
  icon: "",
};

export const useCategoryForm = (categoryId?: number) => {
  const router = useRouter();

  const isEditMode = !!categoryId && categoryId !== 0;

  const [formData, setFormData] = useState<CategoryForm>(initialForm);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategoryDetail = useCallback(async () => {
    if (!isEditMode || !categoryId) return;

    setLoading(true);
    setError(null);

    try {
      const data = await categoriesService.getCategoryById(categoryId);
      setFormData({
        name: data.name ?? "",
        icon: data.icon ?? "",
      });
    } catch (err) {
      setError("ไม่สามารถโหลดข้อมูลหมวดหมู่ได้");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [categoryId, isEditMode]);

  useEffect(() => {
    fetchCategoryDetail();
  }, [fetchCategoryDetail]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e?: FormEvent) => {
      e?.preventDefault();

      setSubmitLoading(true);
      setError(null);

      try {
        if (isEditMode && categoryId) {
          await categoriesService.updateCategory(categoryId, formData);
        } else {
          await categoriesService.createCategory(formData);
        }

        router.push("/categories");
      } catch (err) {
        setError("บันทึกข้อมูลไม่สำเร็จ");
        console.error(err);
      } finally {
        setSubmitLoading(false);
      }
    },
    [categoryId, formData, isEditMode, router],
  );

  return {
    formData,
    setFormData,
    loading,
    submitLoading,
    error,
    isEditMode,
    handleChange,
    handleSubmit,
  };
};
