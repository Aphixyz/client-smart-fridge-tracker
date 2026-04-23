"use client";

import axios from "axios";
import { CategoryForm } from "@/types/categories";
import { categoriesService } from "@/service/categories/categoriesService";
import { showToast } from "@/lib/toast";

import {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  FormEvent,
} from "react";

const initialForm: CategoryForm = {
  name: "",
  icon: "",
  iconFile: null,
  preview: "",
};

export const useCategoryForm = (categoryId?: number) => {
  const isEditMode = !!categoryId && categoryId !== 0;

  const [formData, setFormData] = useState<CategoryForm>(initialForm);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = useCallback((file: File) => {
    const previewUrl = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      iconFile: file,
      preview: previewUrl,
    }));
  }, []);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const fetchCategoryDetail = useCallback(async () => {
    if (!isEditMode || !categoryId) return;

    setLoading(true);
    setError(null);

    try {
      const data = await categoriesService.getCategoryById(categoryId);
      setFormData({
        name: data.name ?? "",
        icon: data.icon ?? "",
        iconFile: null,
        preview: data.icon ?? "",
      });
    } catch (err) {
      showToast("ไม่สามารถโหลดข้อมูลหมวดหมู่ได้");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [categoryId, isEditMode]);

  const handleSubmit = async () => {
    setSubmitLoading(true);

    try {
      const payload = new FormData();
      payload.append("name", formData.name);

      if (formData.iconFile) {
        payload.append("icon", formData.iconFile);
      }

      if (categoryId) {
        await categoriesService.updateCategory(categoryId, payload);
        showToast("อัปเดทข้อมูลสำเร็จ", "success");
      } else {
        await categoriesService.createCategory(payload);
        showToast("เพิ่มข้อมูลสำเร็จ", "success");
      }

      setFormData(initialForm);
      return true;
    } catch (error) {
      let message = "เกิดข้อผิดพลาด";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }
      showToast(message, "error");
      return false;
    } finally {
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryDetail();
  }, [fetchCategoryDetail]);

  return {
    formData,
    setFormData,
    loading,
    submitLoading,
    error,
    isEditMode,
    handleChange,
    handleFileChange,
    handleSubmit,
  };
};
