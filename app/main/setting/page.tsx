"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSetting } from "@/hook/setting/useSetting";

import BaseInput from "@/components/Base/Input";
import BaseSwitch from "@/components/Base/Switch";
import BaseButton from "@/components/Base/Button";
import BaseConfirmModal from "@/components/Base/ConfirmModal";
import BaseSpinner from "@/components/Base/Spinner";

export default function NotificationPage() {
    const router = useRouter();

    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        formData,
        isLoading,
        executeHybridSetting,
        isSubmitting,
        handleAlertThresholdDaysChange,
        handlePushNotificationEnabledChange
    } = useSetting();

    const handleConfirmSave = async () => {
        const success = await executeHybridSetting();
        if (success) {
            setIsModalOpen(false);
        }
    };

    if (isLoading) {
        return <BaseSpinner />;
    }

    return (
        <div className="flex flex-col mt-10 mx-auto w-[700px] gap-4">
            <h1>จำนวนวันที่ต้องการให้แจ้งเตือนก่อนหมดอายุ</h1>

            <BaseInput
                name="alert_threshold_days"
                type="number"
                placeholder="เลือกจำนวนวันที่ต้องการให้แจ้งเตือน"
                value={formData.alert_threshold_days ?? ""}
                onChange={(e) => handleAlertThresholdDaysChange(e.target.value)}
            />

            <BaseSwitch
                description={formData.push_notification_enabled ? "เปิดการแจ้งเตือน" : "ปิดการแจ้งเตือน"}
                activeColor="emerald"
                checked={formData.push_notification_enabled}
                onChange={handlePushNotificationEnabledChange}
            />

            <div className="flex justify-between mt-20 gap-10">
                    <BaseButton
                        variant="emerald"
                        size="lg"
                        className="mt-4 w-full"
                        onClick={() => setIsModalOpen(true)}
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

            <BaseConfirmModal
                isOpen={isModalOpen}
                onClose={() => !isSubmitting && setIsModalOpen(false)}
                onConfirm={handleConfirmSave}
                title="ต้องการตั้งค่าการแจ้งเตือนหรือไม่"
                type="emerald"
                confirmText="ยืนยัน"
                cancelText="ยกเลิก"
                isLoading={isSubmitting}
            />
        </div>
    )
}