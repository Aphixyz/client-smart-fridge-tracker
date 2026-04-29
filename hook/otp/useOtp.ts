"use client";

import { useState, ChangeEvent } from "react";
import { showToast } from "@/lib/toast";
import { otpService } from "@/service/otp/otpService";
import { AuthService } from "@/service/Auth/authService";
import { OtpRequest, ResetPasswordRequest, VerifyOtp } from "@/types/otp";
import { getThaiErrorMessage } from "@/utils";

const initialForm: OtpRequest = {
    username: "",
    purpose: "reset-password",
};

const initialFormOtp: VerifyOtp = {
    username: "",
    purpose: "reset-password",
    otp: "",
}

const initialFormResetPassword: ResetPasswordRequest = {
    username: "",
    newPassword: "",
    confirmPassword: ""
}


export const useOtp = () => {
    const [formData, setFormData] = useState<OtpRequest>(initialForm);
    const [formDataOtp, setFormDataOtp] = useState<VerifyOtp>(initialFormOtp);
    const [formResetPassword, setFormResetPassword] = useState<ResetPasswordRequest>(initialFormResetPassword);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "username" && value) {
            setFormDataOtp((prev) => ({
                ...prev,
                username: value,
            }));

            setFormResetPassword((prev) => ({
                ...prev,
                username: value,
            }));
        }


    };

    const handleChangeOtp = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormDataOtp((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleChangeResetPassword = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormResetPassword((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const sendOtp = async () => {
        setIsLoading(true);
        try {
            await otpService.sendOtp(formData);
            showToast("ส่ง OTP สำเร็จ", "success");
            return true;
        } catch (err) {
            showToast(getThaiErrorMessage(err), "error");
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const VerifyOtp = async () => {
        setIsLoading(true);
        try {
            await otpService.verifyOtp(formDataOtp);
            showToast("ยืนยัน OTP สำเร็จ", "success");
            return true;
        } catch (err) {
            showToast(getThaiErrorMessage(err), "error");
            return false;
        } finally {
            setIsLoading(false);
        }
    }

    const ResetPassword = async () => {
        setIsLoading(true);
        try {
            await AuthService.resetPassword(formResetPassword);
            showToast("รีเซ็ตรหัสผ่านสำเร็จ", "success");
            return true;
        } catch (err) {
            showToast(getThaiErrorMessage(err), "error");
            return false;
        } finally {
            setIsLoading(false);
        }
    }

    return {
        formData,
        setFormData,
        isLoading,
        handleChange,
        sendOtp,
        handleChangeOtp,
        formDataOtp,
        VerifyOtp,
        handleChangeResetPassword,
        formResetPassword,
        ResetPassword
    };
};