export interface OtpRequest {
    username: string,
    purpose: string
}

export interface VerifyOtp extends OtpRequest {
    otp: string,
}

export interface ResetPasswordRequest {
    username: string,
    newPassword: string,
    confirmPassword: string
}