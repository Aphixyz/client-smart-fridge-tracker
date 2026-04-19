export interface UserSubRow {
  id: number;
  field: string;
  value: string;
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt?: string;
  credit?: number;
  subRows: UserSubRow[];
}

export interface RegisterResponse {
  message: string;
  user: {
    id: string;
    name: string;
    username: string;
  };
}

export interface LoginResponse {
  success?: boolean;
  message?: string;
  token?: string;
  accessToken?: string;
  data?: {
    token?: string;
    accessToken?: string;
    user?: {
      id: number | string;
      name?: string;
      username?: string;
    };
  };
}
