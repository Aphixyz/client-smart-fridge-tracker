"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCategories } from "@/hook/categories/useCategories";
import { useAddFridgeProduct } from "@/hook/firdge/useInsertProduct"; 

import BaseButton from "@/components/Base/Button";
import BaseInput from "@/components/Base/Input";
import BaseDatePicker from "@/components/Base/Picker";
import BaseDropdown from "@/components/Base/Dropdown";
import BaseConfirmModal from "@/components/Base/ConfirmModal";

export default function ManageFridge() {
  const params = useParams();
  const router = useRouter();
  const fridgeId = Number(params.fridgeId);

  
  const { categories, loading: catLoading } = useCategories();
  const { 
    formData, 
    isSubmitting, 
    handleChange, 
    updateField, 
    handleSubmit 
  } = useAddFridgeProduct(fridgeId);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onConfirmAdd = async () => {
    const success = await handleSubmit();
    if (success) {
      setIsModalOpen(false);
      router.push(`/main/fridge/${fridgeId}`);
    }
  };

  return (
    <div className="my-8 mx-30 flex flex-col gap-4">
      <BaseDropdown
        label="ประเภทวัตถุดิบ"
        placeholder={catLoading ? "กำลังโหลด..." : "กรุณาเลือกประเภท..."}
        options={categories.map((c) => ({ label: c.name, value: c.id }))}
        value={formData.category_id}
        onChange={(val) => updateField("category_id", val)}
      />

      <BaseInput
        label="ชื่อรายการวัตถุดิบ"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />

      <BaseInput
        label="จำนวนที่แช่"
        name="quantity"
        type="number"
        value={formData.quantity}
        onChange={handleChange}
      />

      <BaseInput
        label="หน่วยเรียก(เช่น ชิ้น , กิโล)"
        name="unit"
        value={formData.unit}
        onChange={handleChange}
      />

      <BaseDatePicker
        label="วันหมดอายุ"
        selected={formData.expiry_date ? new Date(formData.expiry_date) : null}
        onChange={(date) => updateField("expiry_date", date?.toISOString())}
      />

      <div className="flex justify-between gap-20">
        <BaseButton
          variant="emral"
          size="lg"
          className="mt-4 w-full"
          onClick={() => setIsModalOpen(true)}
          disabled={isSubmitting}
        >
          เพิ่มรายการวัตถุดิบ
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
        onConfirm={onConfirmAdd}
        title="ต้องการนำวัตถุดิบไปเข้าแช่ตู้หรือไม่"
        type="question-success"
        confirmText="แช่เลย"
        cancelText="ยกเลิก"
        isLoading={isSubmitting}
      />
    </div>
  );
}