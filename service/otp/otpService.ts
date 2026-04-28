import apiClient from "@/plugins/axios";
import { OtpRequest, VerifyOtp } from "@/types/otp";
export const otpService = {

    sendOtp: async (data: OtpRequest) => {
        const response = await apiClient.post('/otp/send', data)
        return response.data
    },

    verifyOtp: async (data: VerifyOtp) => {
        const response = await apiClient.post('/otp/verify', data)
        return response.data
    }

}