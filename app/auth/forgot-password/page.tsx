"use client";

import React from "react";
import BaseCard from "@/components/Base/Card";
import BaseInput from "@/components/Base/Input";
import BaseButton from "@/components/Base/Button";
import { useOtp } from "@/hook/otp/useOtp";


function Page() {
    const { formData, isLoading, handleChange, sendOtp } = useOtp();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await sendOtp();
    };
    return (
        <div className="w-full container justify-center flex items-center mx-auto min-h-screen">
            <div className="min-w-md">
                <BaseCard>
                    <h1 className="text-xl font-semibold">รีเซ็ตรหัสผ่าน</h1>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <BaseInput
                            name="email"
                            label="กรุณากรอกชื่อผู้ใช้หรืออีเมล"
                            type="email"
                            placeholder="กรอกอีเมล"
                            value={formData.email}
                            onChange={handleChange}
                        />

                        <input type="hidden" name="purpose" value="reset_password" />

                        <div className="flex justify-end">
                            <BaseButton type="submit" variant="emerald" isLoading={isLoading}>
                                ขอ OTP
                            </BaseButton>
                        </div>
                    </form>
                </BaseCard>
            </div>
        </div>
    );
}

export default Page;