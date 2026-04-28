"use client";

import { useState, useEffect, useCallback } from "react";
import { Fridge } from "@/types/fridge";
import { fridgeService } from "@/service/fridge/fridgeService";
import { showToast } from "@/lib/toast";


export const useFridge = () => {
  const [fridges, setFridges] = useState<Fridge[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initialForm = { name: '', location: '' };


  const [formData, setFormData] = useState(initialForm);

  const handleAddFridge = async () => {
    if (!formData.name || !formData.location) {
      showToast("กรุณากรอกข้อมูลให้ครบถ้วน", "error");
      return false;
    }

    setIsSubmitting(true)
    try {
      await fridgeService.createFridge({
        name: formData.name,
        location: formData.location
      });

      showToast("เพิ่มตู้เย็นใหม่เรียบร้อยแล้ว", "success")
      setFormData(initialForm);
      await fetchFridges();
      return true;
    } catch (error) {
      showToast("ไม่สามารถเพิ่มตู้เย็นได้", "error")
      return false;
    } finally {
      setIsSubmitting(false)
    }
  }

  const fetchFridges = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fridgeService.getFridges();
      setFridges(response || []);
    } catch (error) {
      console.error("โหลดข้อมูลตู้เย็นไม่สำเร็จ:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFridges();
  }, [fetchFridges]);

  return {
    fridges,
    loading,
    isSubmitting,
    formData,
    setFormData,
    refetch: fetchFridges,
    handleAddFridge,
    initialForm,
  };
};