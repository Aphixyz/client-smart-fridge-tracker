"use client";

import { useState, useCallback, useEffect } from "react";
import { FridgeProduct } from "@/types/fridge/responce";
import { fridgeProductService } from "@/service/fridge/fridgeService";

export const useFridgeProductById = (fridgeId: string | null) => {
    const [products, setProducts] = useState<FridgeProduct[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = useCallback(async () => {
        if (!fridgeId) {
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const response = await fridgeProductService.getFridgeProductsByFridgeId(fridgeId);
            setProducts(response || []);
        } catch (error) {
            console.error("โหลดข้อมูลของในตู้เย็นไม่สำเร็จ:", error);
        } finally {
            setLoading(false);
        }
    }, [fridgeId]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return {
        products,
        loading,
        refetch: fetchProducts,
    };
};
