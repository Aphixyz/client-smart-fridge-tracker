"use client"
import BaseCard from '@/components/Base/Card'
import BaseLoading from '@/components/Base/Loading'
import { Fridge, ApiResponse } from '@/types/fridge/responce'
import React, { useEffect, useState } from 'react'

export default function FridgePage() {
    const [fridges, setFridges] = useState<Fridge[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchFridges = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/v1/fridges')
                const result: ApiResponse = await response.json()
                if (result.success) {
                    setFridges(result.data)
                }
            } catch (error) {
                console.error('โหลดข้อมูลตู้เย็นไม่สำเร็จ:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchFridges()
    }, [])

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <BaseCard key={i}>
                        <BaseLoading type="card" />
                    </BaseCard>
                ))}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {fridges.map((fridge) => (
                <BaseCard key={fridge.fridge_id} className="flex flex-col items-center p-6">
                    
                    <img src="/fridge.png" alt="Fridge" className="mb-6 w-60px h-77px" />

                    <div className="space-y-2 text-center">

                        <h2 className="text-xl md:text-2xl text-slate-800 font-kanit">
                            จำนวนวัตถุดิบในตู้{' '}
                            <span className="text-emerald-500 font-kanit text-3xl mx-1">
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
            ))}
        </div>
    )
}