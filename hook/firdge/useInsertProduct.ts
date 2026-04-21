"use client";

import { useState } from "react";
import { fridgeProductService } from "@/service/fridge/fridgeService";
import { showToast } from "@/lib/toast";
import { FormProudct } from "@/types/fridge/responce";

export const useAddFridgeProduct = (fridgeId: number) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const addProduct = async (payload: FormProudct, onSuccess: () => void) => {
        try {
            setIsSubmitting(true);

            await fridgeProductService.insertProductToFridge(fridgeId, payload);

            showToast("เพิ่มรายการวัตถุดิบสำเร็จ!", "success");

            if (onSuccess) onSuccess();

        } catch (error) {
            console.error("Add product error:", error);
            showToast("ไม่สามารถเพิ่มรายการได้ โปรดตรวจสอบข้อมูล", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return { addProduct, isSubmitting };
};