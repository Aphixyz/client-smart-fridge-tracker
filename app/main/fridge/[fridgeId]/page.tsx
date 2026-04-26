"use client"

import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { useState } from 'react'
import BaseCard from '@/components/Base/Card'
import BaseLoading from '@/components/Base/Loading'
import { useFridgeProductById } from '@/hook/firdge/useFridgeProduct'
import type { FridgeProduct } from '@/types/fridge'
import { Trash2 } from 'lucide-react'
import { DateUtils } from '@/utils/date'
import normalizeStatus from '@/utils/fridge'
import BaseConfirmModal from "@/components/Base/ConfirmModal";
import BaseButton from '@/components/Base/Button'


export default function FridgeDetailPage() {
  const { fridgeId } = useParams()
  const router = useRouter()


  const { products, loading, isDeleting, executeDelete } = useFridgeProductById(Number(fridgeId))

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  const handleDeleteClick = (productId: number) => {
    setSelectedProduct(productId);
    setIsModalOpen(true);
  };


  const handleConfirmDelete = async () => {
    if (!selectedProduct) return;

    await executeDelete(selectedProduct);

    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-h-[450px] gap-20' >
        <BaseLoading type='card' />
      </div>
    )
  }



  return (
    <>
      {/* 🌟 เช็คเงื่อนไขตรงนี้แทน ถ้าไม่มีของโชว์ข้อความ ถ้ามีของโชว์ Grid */}
      {products.length === 0 ? (
        <div className="flex justify-center items-center min-h-[450px]">
          <div className="text-center text-slate-500 font-kanit text-xl">ยังไม่มีสินค้าในตู้เย็น</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-h-[450px] gap-20">
          {products.map((product: FridgeProduct) => (
            <BaseCard onClick={() => router.push(`/main/fridge/${fridgeId}/manageFridge/${product.id}`)} key={product.id} className="p-4 border shadow-lg relative">
              <BaseButton
                size='lg'
                shape='full'
                variant="trash"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick(product.id)
                }}
              >
                <Trash2 className="w-10 h-8 text-red-500 hover:scale-110 transition-transform cursor-pointer" />
              </BaseButton>

              <div className="flex items-start gap-4">
                <Image
                  src={process.env.NEXT_PUBLIC_BASE_URL + product.icon}
                  alt={product.products_name}
                  width={200}
                  height={200}
                  className="rounded-lg object-cover w-[200px] h-auto"
                  unoptimized
                />
              </div>

              <div>
                <div className="text-end text-base text-slate-600 font-kanit">
                  ประเภท : {product.categories_name}
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <h3 className="text-3xl font-bold text-slate-800 font-kanit">
                  {product.products_name}
                </h3>

                <p className="text-2xl font-kanit text-black">
                  จำนวน <span className="text-emerald-500  font-bold">{parseFloat(product.quantity)}</span> {product.unit}
                </p>

                <p className="text-2xl font-kanit">
                  คำแนะนำ : <span className={normalizeStatus(product.status)}>{product.status}</span>
                </p>

                <p className="text-md text-black font-kanit">
                  วันหมดอายุ : {DateUtils.format(product.expiry_date, "short")}
                </p>
              </div>
            </BaseCard>
          ))}
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 flex justify-end p-4">
        <BaseButton
          variant="cancel"
          size='lg'
          shape='rounded'
          onClick={() => router.push("/main/fridge/" + fridgeId + "/manageFridge/" + 0)}
        >
          นำเข้าวัตถุดิบ
        </BaseButton>
      </div>

      <BaseConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title={`ต้องการนำวัตถุดิบไปทิ้งใช่ไหม`}
        type="question"
        confirmText="นำทิ้ง"
        cancelText="ยกเลิก"
        isLoading={isDeleting}
      />
    </>
  )
}