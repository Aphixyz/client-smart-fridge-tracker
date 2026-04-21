"use client";

import { useState } from "react";
import axios from "axios";
import { fridgeProductService } from "@/service/fridge/fridgeService";
import { showToast } from "@/lib/toast";
import { FormProudct } from "@/types/fridge/responce";

const initialForm: FormProudct = {
  category_id: 0,
  name: "",
  quantity: 0,
  unit: "",
  expiry_date: "",
};

export const useAddFridgeProduct = (fridgeId: number) => {
  const [formData, setFormData] = useState<FormProudct>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ฟังก์ชันอัปเดต State ที่รองรับทั้ง Event และการส่งค่าตรงๆ
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

  const handleSubmit = async () => {
    // สามารถเพิ่ม Validation Logic ตรงนี้ได้เหมือน useRegister
    setIsSubmitting(true);
    try {
      await fridgeProductService.insertProductToFridge(fridgeId, formData);
      showToast("เพิ่มสินค้าสำเร็จ", "success");
      setFormData(initialForm); // Reset form
      return true; // คืนค่า true เพื่อบอกหน้า UI ว่าสำเร็จ
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

  return {
    formData,
    isSubmitting,
    errors,
    handleChange,
    updateField, // ใช้ตัวนี้กับพวก Dropdown/Date
    handleSubmit,
  };
};