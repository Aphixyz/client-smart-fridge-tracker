import { z } from "zod";
import { RegisterFormData, RegisterFormErrors } from "@/types/user/request";
export const registerSchema = z
  .object({
    name: z.string().trim().min(1, "กรุณากรอกชื่อบ้าน / ชื่อคนในบ้าน"),
    username: z.string().trim().min(1, "กรุณากรอกชื่อผู้ใช้"),
    password: z.string().trim().min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"),
    confirmpassword: z.string().trim().min(1, "กรุณากรอกยืนยันรหัสผ่าน"),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmpassword"],
  });

export const validateRegisterForm = (form: {
  name: string;
  username: string;
  password: string;
  confirmpassword: string;
}) => {
  const result = registerSchema.safeParse(form);

  if (result.success) {
    return {
      success: true,
      errors: {} as RegisterFormErrors,
      firstError: "",
    };
  }

  const errors: RegisterFormErrors = {};

  result.error.issues.forEach((issue) => {
    const field = issue.path[0] as keyof RegisterFormErrors;
    if (!errors[field]) {
      errors[field] = issue.message;
    }
  });

  return {
    success: false,
    errors,
    firstError: result.error.issues[0]?.message ?? "",
  };
};
