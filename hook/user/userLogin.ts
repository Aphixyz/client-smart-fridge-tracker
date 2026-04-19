"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import type { LoginFormData } from "@/types/user/request";
import type { LoginResponse } from "@/types/user/response";
import { AuthService } from "@/service/Auth/authService";
import { showToast } from "@/lib/toast";
import { validateLoginForm, type LoginFormErrors } from "@/validator/login";

const initialForm: LoginFormData = {
  username: "",
  password: "",
};

export const useLogin = () => {
  const router = useRouter();

  const [form, setForm] = useState<LoginFormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [data, setData] = useState<LoginResponse | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof LoginFormErrors]) {
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

    const validateResult = validateLoginForm(form);

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
      const response = await AuthService.login(form);

      setData(response);
      setForm(initialForm);

      showToast(response.message || "เข้าสู่ระบบสำเร็จ", "success");

      // เก็บ user ถ้าต้องการ
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      router.push("/main");
    } catch (err) {
      let message = "เกิดข้อผิดพลาดจากเครือข่าย";

      if (axios.isAxiosError(err)) {
        const responseMessage = err.response?.data?.message;

        if (
          responseMessage === "invalid credentials" ||
          responseMessage === "username or password is incorrect"
        ) {
          message = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
        } else if (
          typeof responseMessage === "string" &&
          responseMessage.trim()
        ) {
          message = responseMessage;
        } else if (err.message) {
          message = err.message;
        }
      }

      setSubmitError(message);
      showToast(message, "error");
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
