"use client"

import { useState } from "react";

import BaseInput from "@/components/Base/Input";
import BaseSwitch from "@/components/Base/Switch";
import BaseButton from "@/components/Base/Button";
import BaseConfirmModal from "@/components/Base/ConfirmModal";
import { useRouter } from "next/navigation";


export default function NotificationPage() {
    const [switchOn, setSwitchOn] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    // const onConfirm = async () => {
    //     const success = await handleSubmit();
    //     if (success) {
    //         setIsModalOpen(false);
    //     }
    // };

    return (
        <div className=" flex flex-col mt-10 mx-auto w-[700px] gap-4">
            <h1>จำนวนวันที่ต้องการให้แจ้งเตือนก่อนหมดอายุ</h1>
            <BaseInput />
            <BaseSwitch
                description={switchOn ? "เปิดการแจ้งเตือน" : "ปิดการแจ้งเตือน"}
                activeColor="emerald"
                checked={switchOn}
                onChange={setSwitchOn}
            />
            <div className="flex justify-between mt-20 gap-10">
                <BaseButton
                    variant="emral"
                    size="lg"
                    className="mt-4 w-full"
                    onClick={() => setIsModalOpen(true)}
                    disabled={false}
                >
                    ยืนยันการตั้งค่าการแจ้งเตือน
                </BaseButton>

                <BaseButton
                    variant="cancel"
                    size="lg"
                    className="mt-4 w-full"
                    onClick={() => router.back()}
                >
                    ยกเลิก
                </BaseButton>
            </div>
        </div>
    )
}