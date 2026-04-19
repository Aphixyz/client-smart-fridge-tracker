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