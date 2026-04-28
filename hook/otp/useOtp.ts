"use client";

import { useState, ChangeEvent } from "react";
import { showToast } from "@/lib/toast";
import { otpService } from "@/service/otp/otpService";
import { OtpRequest } from "@/types/otp";
import axios from "axios";

const initialForm: OtpRequest = {
    email: "",
    purpose: "",
};

export const useOtp = () => {
    const [formData, setFormData] = useState<OtpRequest>(initialForm);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const sendOtp = async () => {
        setIsLoading(true);
        try {
            await otpService.sendOtp(formData);
            showToast("ส่ง OTP สำเร็จ", "success");
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
            setIsLoading(false);
        }
    };

    return {
        formData,
        setFormData,
        isLoading,
        handleChange,
        sendOtp,
    };
};