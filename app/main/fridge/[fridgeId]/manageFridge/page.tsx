"use client"

import BaseButton from "@/components/Base/Button";
import BaseInput from "@/components/Base/Input";
import BaseDatePicker from "@/components/Base/Picker";
import { useState } from "react";
import BaseDropdown from "@/components/Base/Dropdown";
import { useCategory } from "@/hook/firdge/useCategory";
import BaseLoading from "@/components/Base/Loading";
import { useParams, useRouter } from "next/navigation";
import { useAddFridgeProduct } from "@/hook/firdge/useInsertProduct";
import { showToast } from "@/lib/toast";
import { DateUtils } from '@/utils/date';
import BaseConfirmModal from "@/components/Base/ConfirmModal";

export default function ManageFridge() {
    const params = useParams();
    const router = useRouter();
    const fridgeId = Number(params.fridgeId);

    const { addProduct, isSubmitting } = useAddFridgeProduct(fridgeId); 
    const { categories, loading } = useCategory();

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [unit, setUnit] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | number>("");
    
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const categoryOptions = categories.map((cat) => ({
        value: cat.id,
        label: cat.name
    }));

    if (loading) {
        return <BaseLoading />;
    }

    const handleAddClick = () => {
        if (!selectedCategory || !name || !quantity || !unit || !startDate) {
            showToast("กรุณากรอกข้อมูลให้ครบถ้วน", "warning");
            return;
        }          
        setIsModalOpen(true);
    };

    const handleConfirmAdd = async () => {
        const payload = {
            category_id: selectedCategory,
            name: name,
            quantity: Number(quantity),
            unit: unit,
            expiry_date: DateUtils.format(startDate, 'iso').split('T')[0]
        };

        await addProduct(payload, () => {
            setIsModalOpen(false);
            router.push(`/main/fridge/${fridgeId}`);
        });
    };

    return (
        <div className="my-8 mx-30 flex flex-col gap-4">
            <BaseDropdown
                label="ประเภทวัตถุดิบ"
                placeholder={loading ? "กำลังโหลดข้อมูล..." : "กรุณาเลือกประเภทวัตถุดิบ..."}
                options={categoryOptions}
                value={selectedCategory}
                onChange={(value) => setSelectedCategory(value)}
            />

            <BaseInput
                label="ชื่อรายการวัตถุดิบ"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <BaseInput
                label="จำนวนที่แช่"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
            />
            <BaseInput
                label="หน่วยเรียก(เช่น ชิ้น , กิโล)"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
            />

            <BaseDatePicker
                label="วันหมดอายุ"
                selected={startDate}
                onChange={(date: Date | null) => setStartDate(date)}
            />

            <div className="flex justify-between gap-20">
                <BaseButton
                    type="button"
                    variant="emral"
                    size="lg"
                    className="mt-4 w-full"
                    onClick={handleAddClick}
                    disabled={isSubmitting}
                >
                    เพิ่มรายการวัตถุดิบ
                </BaseButton>

                <BaseButton
                    type="button"
                    variant="cancel"
                    size="lg"
                    className="mt-4 w-full"
                    onClick={() => router.push(`/main/fridge/${fridgeId}`)}
                    disabled={isSubmitting}
                >
                    ยกเลิก
                </BaseButton>
            </div>

            <BaseConfirmModal
                isOpen={isModalOpen}
                onClose={() => !isSubmitting && setIsModalOpen(false)}
                onConfirm={handleConfirmAdd}
                title={`ต้องการนำวัตถุดิบไปเข้าแช่ตู้หรือไม่`}
                type="question-success"
                confirmText="แช่เลย"
                cancelText="ยกเลิก"
                isLoading={isSubmitting}
            />
        </div>
    );
}