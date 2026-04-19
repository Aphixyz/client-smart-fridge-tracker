export interface UserRequest {
  name: string;
  email: string;
  role: string;
  status: string;
}

export interface UserValidationError {
  name?: string;
  email?: string;
  role?: string;
  status?: string;
}

export interface RegisterFormData {
  name: string;
  username: string;
  password: string;
  confirmpassword: string;
}

export interface LoginFormData {
  username: string;
  password: string;
}

export interface UserValidationError {
  name?: string;
  username?: string;
  password?: string;
}

export type RegisterFormErrors = {
  name?: string;
  username?: string;
  password?: string;
  confirmpassword?: string;
};
