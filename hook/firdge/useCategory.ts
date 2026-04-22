"use client";

import { useState, useCallback, useEffect } from "react";
import { CategoryService } from "@/service/fridge/fridgeService";

export const useCategory = () => {
    const [categories, setCategories] = useState<any[]>([]);

    const [loading, setLoading] = useState(true);

    const fetchCategories = useCallback(async (silent = false) => {
        try {
            if (!silent) setLoading(true);
            const response = await CategoryService.getCategories();
            setCategories(response || []);
        } catch (error) {
            console.error("โหลดข้อมูลประเภทวัตถุดิบไม่สำเร็จ:", error);
        } finally {
            if (!silent) setLoading(false);
        }
    }, []);

   
    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return {
        categories,
        loading,
        fetchCategories,
    };
};