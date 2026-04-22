"use client";

import { useState, useCallback, useEffect } from "react";
import { FridgeProduct } from "@/types/fridge";
import { fridgeProductService } from "@/service/fridge/fridgeService";
import { showToast } from '@/lib/toast'

export const useFridgeProductById = (fridgeId: number) => {
    const [products, setProducts] = useState<FridgeProduct[]>([]);

    const [loading, setLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchProducts = useCallback(async (silent = false) => {
        if (!fridgeId) {
            setLoading(false);
            return;
        }
        try {
            if (!silent) setLoading(true);
            const response = await fridgeProductService.getFridgeProductsByFridgeId(fridgeId);
            setProducts(response || []);
        } catch (error) {
            console.error("โหลดข้อมูลของในตู้เย็นไม่สำเร็จ:", error);
        } finally {
            if (!silent) setLoading(false);
        }
    }, [fridgeId]);

    const executeDelete = async (productId: number) => {
        if (!productId) return;

        try {
            setIsDeleting(true);

            await fridgeProductService.deleteProductFromFridge(fridgeId, productId);

            showToast(`ลบรายการสำเร็จ`, "success");

            await fetchProducts(true);
        } catch (error) {
            showToast("ไม่สามารถลบรายการได้ โปรดลองอีกครั้ง", "error");
        } finally {
            setIsDeleting(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return {
        products,
        loading,
        isDeleting,
        refetch: fetchProducts,
        executeDelete,
    };
};