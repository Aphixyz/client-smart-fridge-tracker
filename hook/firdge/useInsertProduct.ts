"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { fridgeProductService } from "@/service/fridge/fridgeService";
import { showToast } from "@/lib/toast";
import { FormProudct } from "@/types/fridge";
import { productService } from "@/service/product/productService";


const initialForm: FormProudct = {
  category_id: 0,
  name: "",
  quantity: 0,
  unit: "",
  expiry_date: "",
};

export const useAddFridgeProduct = (fridgeId: number, productId: number) => {
  const [formData, setFormData] = useState<FormProudct>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: name === "category_id" || name === "quantity" ? Number(value) : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateField(name, value);
  };

  const fetchProductData = async () => {
    if (productId !== 0) {
      try {
        const data = await productService.getProductById(productId);
        if (data) {
          setFormData({
            category_id: data.category_id,
            name: data.name,
            quantity: data.quantity,
            unit: data.unit,
            expiry_date: data.expiry_date,
          });
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    }
  };

  const hybridProduct = async () => {
    setIsSubmitting(true);
    try {
      if (productId !== 0) {
        await productService.updateProduct(productId, formData);
        showToast('อัปเดตสินค้าสำเร็จ', 'success');
      } else {
        await fridgeProductService.insertProductToFridge(fridgeId, formData);
        showToast("เพิ่มสินค้าสำเร็จ", "success");
      }
      setFormData(initialForm);
      return true;
    } catch (err) {
      let message = "เกิดข้อผิดพลาด";
      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || message;
      }
      showToast(message, "error");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  return {
    formData,
    isSubmitting,
    errors,
    handleChange,
    updateField,
    hybridProduct,
  };
};