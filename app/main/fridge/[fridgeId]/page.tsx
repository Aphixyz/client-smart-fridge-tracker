"use client"

import { useParams } from 'next/navigation'
import Image from 'next/image'
import BaseCard from '@/components/Base/Card'
import BaseLoading from '@/components/Base/Loading'
import { useFridgeProductById } from '@/hook/firdge/useFridgeProduct'
import type { FridgeProduct } from '@/types/fridge/responce'
import { Trash2 } from 'lucide-react'
import { DateUtils } from '@/utils/date'
import normalizeStatus from '@/utils/fridge'

export default function FridgeDetailPage() {
  const { fridgeId } = useParams()
  const id = Array.isArray(fridgeId) ? fridgeId[0] : fridgeId
  const { products, loading } = useFridgeProductById(id || null)

  if (loading) {
    return (
       <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-h-[450px] gap-20' >
         <BaseLoading type='card' />
       </div>
    )
  }

  if (products.length === 0) {
    return <div className="text-center text-slate-500 font-kanit mt-10">ยังไม่มีสินค้าในตู้เย็น</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-h-[450px] gap-20">
      {products.map((product: FridgeProduct) => (
        <BaseCard key={product.id} className="p-4 border shadow-lg relative">
          <button className="absolute top-3 right-3 p-2 bg-gray-200 rounded-full hover:bg-red-100 transition-colors">
            <Trash2 className="w-10 h-10 text-red-500" />
          </button>

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
  )
}

