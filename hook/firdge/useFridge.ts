"use client";

import { useState, useEffect,useCallback } from "react";
import axios from "axios";
import { Fridge } from "@/types/fridge/responce";
import { fridgeService } from "@/service/fridge/fridgeService";
import { refresh } from "next/cache";

export const useFridge = () => {
  const [fridges, setFridges] = useState<Fridge[]>([]);
  const [loading, setLoading] = useState(true);

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
       fetchFridges()
   }, [fetchFridges])
  return {
    fridges,
    loading,
    refetch: fetchFridges
  };
};