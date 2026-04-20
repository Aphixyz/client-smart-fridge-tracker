"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import type { RegisterFormData } from "@/types/user/request";
import type { RegisterResponse } from "@/types/user/response";
import { registerService } from "@/service/Auth/registerServic";
import { showToast } from "@/lib/toast";
import { validateRegisterForm } from "@/validator/register";
import { RegisterFormErrors } from "@/types/user/request";
import { getErrorMessage } from "@/lib/error";

const initialForm: RegisterFormData = {
  name: "",
  username: "",
  password: "",
  confirmpassword: "",
};

export const useRegister = () => {
  const router = useRouter();
  const [form, setForm] = useState<RegisterFormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [data, setData] = useState<RegisterResponse | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof RegisterFormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if (submitError) {
      setSubmitError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitError("");

    const validateResult = validateRegisterForm(form);

    if (!validateResult.success) {
      setErrors(validateResult.errors);
      if (validateResult.firstError) {
        showToast(validateResult.firstError, "warning");
      }
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await registerService.createUser(form);
      setData(response);
      setForm(initialForm);
      showToast("สมัครสมาชิกสำเร็จ", "success");
      router.push("/auth/login");
    } catch (err) {
      let message = "เกิดข้อผิดพลาดจากเครือข่าย";

      if (axios.isAxiosError(err)) {
        const responseMessage = err.response?.data?.message;

        if (responseMessage === "username already exists") {
          message = "มีชื่อผู้ใช้นี้อยู่แล้ว";
          showToast(message, "warning");
        } else if (
          typeof responseMessage === "string" &&
          responseMessage.trim()
        ) {
          message = responseMessage;
          showToast(message, "error");
        }
      }

      setSubmitError(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    errors,
    submitError,
    data,
    handleChange,
    handleSubmit,
  };
};
