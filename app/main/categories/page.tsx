"use client";

import React from "react";
import { useCategories } from "@/hook/categories/useCategories";
import BaseLoading from "@/components/Base/Loading";
import { BaseTable } from "@/components/Base/Table";
import Button from "@/components/Base/Button";
import { Pencil, Trash2 } from "lucide-react";
import { Categories } from "@/types/categories";
import { Column } from "@/types/table";
import Image from "next/image";
import { useState } from "react";
import BaseConfirmModal from "@/components/Base/ConfirmModal";
import BaseButton from "@/components/Base/Button";

export default function Categoriespage() {
  const {
    fetchCategories,
    categories,
    loading,
    deleting,
    ConfirmDelete,
    handleNavigate,
  } = useCategories();
  const [showDelete, setShowDelete] = useState(false);

  const [selectCateId, setSelectCateId] = useState<number | null>(null);

  const hanleDelete = async (id: number) => {
    setSelectCateId(id);
    setShowDelete(true);
  };

  const handleConfirmDeleted = async () => {
    await ConfirmDelete(Number(selectCateId));
    setShowDelete(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <BaseLoading type="table" />
      </div>
    );
  }

  const columns: Column<Categories>[] = [
    {
      header: "รูปไอค่อน",
      accessor: (item: Categories) => {
        const imageUrl = item.icon
          ? `${process.env.NEXT_PUBLIC_BASE_URL}${item.icon}`
          : "/icons/fridge.png";
        return (
          <div className="flex justify-center items-center w-full">
            <div className="relative ml-2  w-20 h-10 overflow-hidden rounded-lg border-slate-100">
              <Image
                src={imageUrl}
                alt={item.name as string}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        );
      },
      width: 120,
    },
    {
      header: "รหัสประเภท",
      accessor: "id",
      minWidth: 120,
    },
    {
      header: "ชื่อประเภท",
      accessor: "name",
      truncate: true,
    },
    {
      header: "การจัดการ",
      accessor: (item) => (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Pencil size={18} />}
            onClick={() => handleNavigate(item.id)}
            className="p-2 h-auto border-slate-200 text-slate-600 hover:bg-slate-100"
            title="แก้ไข"
          />
          <Button
            variant="danger"
            size="sm"
            leftIcon={<Trash2 size={18} />}
            onClick={() => hanleDelete(item.id)}
            className="h-auto border-slate-200 text-slate-600 hover:bg-red-100"
            title="ลบ"
          />
        </div>
      ),
      width: 120,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-bold text-slate-800">หมวดหมู่และประเภทของในตู้เย็น</h1>
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <BaseTable
          data={categories}
          columns={columns}
          isLoading={loading}
          showIndex={true}
          indexHeader="ลำดับ"
          pageSize={10}
          showPagination={categories.length > 10}
        />
      </div>
      <BaseConfirmModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleConfirmDeleted}
        isLoading={deleting}
        type="danger"
        title="คุณแน่ใจหรือไม่?"
        description="การลบข้อมูลนี้จะไม่สามารถเรียกคืนได้อีก คุณต้องการดำเนินการต่อใช่หรือไม่?"
        confirmText="ใช่, ลบเลย"
        cancelText="ไม่, ยกเลิก"
      />
      <div className="flex justify-end mt-4">
        <BaseButton
          shape="full"
          variant="primary"
          onClick={handleNavigate}
        >
          เพิ่มข้อมูลใหม่
        </BaseButton>
      </div>
    </div>
  );
}
