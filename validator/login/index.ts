import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().trim().min(1, "กรุณากรอกชื่อผู้ใช้"),
  password: z.string().trim().min(1, "กรุณากรอกรหัสผ่าน"),
});

export type LoginFormErrors = {
  username?: string;
  password?: string;
};

export const validateLoginForm = (form: {
  username: string;
  password: string;
}) => {
  const result = loginSchema.safeParse(form);

  if (result.success) {
    return {
      success: true,
      errors: {} as LoginFormErrors,
      firstError: "",
    };
  }

  const errors: LoginFormErrors = {};

  result.error.issues.forEach((issue) => {
    const field = issue.path[0] as keyof LoginFormErrors;
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
