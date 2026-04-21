"use client";

import React from "react";
import { useCategories } from "@/hook/categories/useCategories";
import BaseLoading from "@/components/Base/Loading";
import { BaseTable } from "@/components/Base/Table";
import Button from "@/components/Base/Button";
import { Edit, Trash2 } from "lucide-react";
import { Categories } from "@/types/categories";
import { Column } from "@/types/table";
import Image from "next/image";

export default function Categoriespage() {
  const { fetchCategories, loading, categories, error } = useCategories();

  const columns: Column<Categories>[] = [
    {
      header: "รูปไอคอน",
      accessor: (item: Categories) => {
        const imageUrl = item.icon
          ? `${process.env.NEXT_PUBLIC_BASE_URL}${item.icon}`
          : "/icons/fridge.png";
        return (
          <div className="relative w-10 h-10 overflow-hidden rounded-lg border border-slate-100">
            <Image
              src={imageUrl}
              alt={item.name as string}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        );
      },
      width: 80,
    },
    {
      header: "รหัสประเภท",
      accessor: "id",
      minWidth: 200,
    },
    {
      header: "ช่ือประเภท",
      accessor: "name",
      truncate: true,
    },
    {
      header: "การจัดการ",
      accessor: (item) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => console.log("Edit", item.id)}
            leftIcon={<Edit size={14} />}
          >
            แก้ไข
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => console.log("Delete", item.id)}
            leftIcon={<Trash2 size={14} />}
          >
            ลบ
          </Button>
        </div>
      ),
      width: 180,
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <BaseLoading type="table" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-bold">หมวดหมู่สินค้า</h1>
      <BaseTable
        data={categories}
        columns={columns}
        isLoading={loading}
        showIndex={true}
        indexHeader="No."
        pageSize={10}
        showPagination={categories.length > 10}
      />
    </div>
  );
}
