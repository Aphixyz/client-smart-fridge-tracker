"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCategoryForm } from "@/hook/categories/useCategoryForm";
import BaseInput from "@/components/Base/Input";
import BaseButton from "@/components/Base/Button";
import BaseLoading from "@/components/Base/Loading";
import Link from "next/link";
import BaseConfirmModal from "@/components/Base/ConfirmModal";
import BaseFileUpload from "@/components/Base/FileUpload";

export default function CategoryDetailPage() {
  const params = useParams();
  const categoryId = params?.categoryId ? Number(params.categoryId) : undefined;
  const route = useRouter();

  const [showCreate, setShowCreate] = useState(false);

  const {
    formData,
    handleChange,
    handleFileChange,
    handleSubmit,
    loading,
    submitLoading,
    isEditMode,
  } = useCategoryForm(categoryId);


  const handleCreate = async () => {
    setShowCreate(true);
  };

  const handleConfirmCreate = async () => {
    await handleSubmit();
    setShowCreate(false);
    route.back();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <BaseLoading type="spinner" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div className="space-y-2">
              <BaseFileUpload
                id="category-icon"
                name="icon"
                label="ไอค่อนรายการประเภทวัตถุดิบ"
                preview={formData.preview}
                onFileChange={handleFileChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                ชื่อรายการประเภท
              </label>
              <BaseInput
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="กรอกชื่อรายการประเภท"
                required
                containerClassName="mb-0"
              />
            </div>

            <div className="flex gap-3 pt-6">
              <BaseButton
                type="button"
                variant="emral"
                fullWidth
                isLoading={submitLoading}
                disabled={submitLoading}
                onClick={() => handleCreate()}
              >
                {isEditMode
                  ? "แก้ไขข้อมูลรายการวัตถุดิบ"
                  : "เพิ่มข้อมูลรายการวัตถุดิบ"}
              </BaseButton>
              <Link href="/main/categories" className="flex-1">
                <BaseButton variant="cancel" fullWidth disabled={submitLoading}>
                  ยกเลิก
                </BaseButton>
              </Link>
            </div>
          </form>
        </div>
        <BaseConfirmModal
          isOpen={showCreate}
          onClose={() => setShowCreate(false)}
          onConfirm={handleConfirmCreate}
          isLoading={false}
          type="question-success"
          title="คุณแน่ใจหรือไม่?"
          description="คุณต้องการดำเนินการต่อใช่หรือไม่?"
          confirmText="ใช่"
          cancelText="ไม่"
        />
      </div>
    </div>
  );
}
