"use client"

import Image from 'next/image'
import BaseCard from '@/components/Base/Card'
import BaseLoading from '@/components/Base/Loading'
import { useFridge } from '@/hook/firdge/useFridge'
import type { Fridge } from '@/types/fridge'
import Link from 'next/link'

export default function FridgePage() {
    const { fridges, loading, refetch } = useFridge()


    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <BaseLoading type='card' />
            </div>
        )
    }
    if (fridges.length === 0) {
        return <div className="text-center text-slate-500 font-kanit mt-10">ยังไม่มีข้อมูลตู้เย็น</div>
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {Array.isArray(fridges) && fridges.map((fridge: Fridge) => (
                <Link href={`/main/fridge/${fridge.fridge_id}`} key={fridge.fridge_id}>
                    <BaseCard key={fridge.fridge_id} className="flex flex-col items-center p-6 border shadow-lg">
                        <Image src="/fridge.png" alt="Fridge" width={200} height={200} className="mb-6" />
                        <div className="space-y-2 text-center">
                             <h2 className="text-xl md:text-2xl text-slate-800 font-kanit">
                                จำนวนวัตถุดิบในตู้{' '}
                                <span className={`${Number(fridge.inactive_items_count) > 0 ? 'text-red-500' : 'text-emerald-500'
                                    } font-kanit text-3xl mx-1`}>
                                    {fridge.total_items}
                                </span>{' '}
                                ชิ้น
                            </h2>
                            <p className="text-start text-base md:text-lg text-slate-700 font-kanit">
                                ประเภทของแช่{' '}
                                <span className="text-emerald-500 font-kanit text-2xl mx-1">
                                    {fridge.total_categories}
                                </span>{' '}
                                อย่าง
                            </p>
                        </div>
                    </BaseCard>
                </Link>
            ))}
        </div>
    )
}