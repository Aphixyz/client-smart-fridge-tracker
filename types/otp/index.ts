export interface OtpRequest {
    email: string,
    purpose: string
}

export interface VerifyOtp {
    email: string,
    otp: string,
    purpose: string
}