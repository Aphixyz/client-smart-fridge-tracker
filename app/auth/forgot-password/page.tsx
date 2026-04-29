"use client";

import React, { useState } from "react";
import BaseCard from "@/components/Base/Card";
import BaseInput from "@/components/Base/Input";
import BaseButton from "@/components/Base/Button";
import { useOtp } from "@/hook/otp/useOtp";
import { useRouter } from "next/navigation";


function Page() {
    const router = useRouter();
    const { formData, isLoading, handleChange, sendOtp, handleChangeOtp, formDataOtp, VerifyOtp, formResetPassword, handleChangeResetPassword, ResetPassword } = useOtp();
    const [stateOtp, setStateOtp] = useState<boolean>(false);
    const [stateResetPassword, setStateResetPassword] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await sendOtp();
        setStateOtp(true)
    };

    const handleVerifyOtp = async () => {
        const result = await VerifyOtp();
        if (result) {
            setStateOtp(false);
            setStateResetPassword(true)
        }
    };

    const handleUpdatePassword = async () => {
        const result = await ResetPassword();
        if (result) {
            setStateResetPassword(false)
            setStateOtp(false)
            router.push("/")
        }
    }


    return (
        <div className="w-full container justify-center flex items-center mx-auto min-h-screen">
            <div className="min-w-md">
                <BaseCard>
                    <h1 className="text-xl font-semibold">รีเซ็ตรหัสผ่าน</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <BaseInput
                            name="username"
                            label="กรุณากรอกชื่อผู้ใช้"
                            type="text"
                            placeholder="กรอกชื่อผู้ใช้"
                            value={formData.username}
                            onChange={handleChange}
                        />

                        {stateOtp &&
                            <>
                                <p className="text-sm text-gray-500">ห้ามรีเฟรชหน้าเว็บ</p>
                                <BaseInput
                                    name="otp"
                                    type="text"
                                    label="กรุณากรอก OTP"
                                    placeholder="กรอก OTP"
                                    value={formDataOtp.otp}
                                    onChange={handleChangeOtp}
                                />
                            </>
                        }

                        {stateResetPassword && (
                            <>
                                <BaseInput
                                    name="newPassword"
                                    label="กรุณากรอกรหัสผ่านใหม่"
                                    type="password"
                                    placeholder="กรอกรหัสผ่านใหม่"
                                    value={formResetPassword.newPassword}
                                    onChange={handleChangeResetPassword}
                                />
                                <BaseInput
                                    name="confirmPassword"
                                    label="กรุณากรอกรหัสผ่านยืนยัน"
                                    type="password"
                                    placeholder="กรอกรหัสผ่านยืนยัน"
                                    value={formResetPassword.confirmPassword}
                                    onChange={handleChangeResetPassword}
                                />
                            </>
                        )}

                        <div className="flex justify-end gap-2">
                            {stateOtp ? (
                                <>
                                    <BaseButton type="button" variant="emerald" isLoading={isLoading} onClick={handleVerifyOtp}>
                                        ยืนยัน OTP
                                    </BaseButton>
                                    <BaseButton type="button" variant="cancel" onClick={() => setStateOtp(false)}>
                                        ยกเลิก
                                    </BaseButton>
                                </>
                            ) : stateResetPassword ? (
                                <>
                                    <BaseButton type="button" variant="emerald" isLoading={isLoading} onClick={handleUpdatePassword}>
                                        ยืนยันการรีเซ็ตรหัสผ่าน
                                    </BaseButton>
                                    <BaseButton type="button" variant="cancel" onClick={() => setStateResetPassword(false)}>
                                        ยกเลิก
                                    </BaseButton>
                                </>
                            ) : (
                                <BaseButton type="submit" variant="emerald" isLoading={isLoading}>
                                    ขอ OTP
                                </BaseButton>
                            )}
                        </div>
                    </form>
                </BaseCard>
            </div>
        </div>
    );
}

export default Page;