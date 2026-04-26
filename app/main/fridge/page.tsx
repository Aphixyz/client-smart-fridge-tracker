"use client"

import { useState } from 'react'

import { Plus } from 'lucide-react'
import { useFridge } from '@/hook/firdge/useFridge'
import type { Fridge } from '@/types/fridge'

import Image from 'next/image'
import Link from 'next/link'
import BaseCard from '@/components/Base/Card'
import BaseLoading from '@/components/Base/Loading'
import BaseInput from '@/components/Base/Input'
import BaseButton from '@/components/Base/Button'
import BaseModal from '@/components/Base/Modal'



export default function FridgePage() {
    const {
        fridges,
        loading,
        handleAddFridge,
        isSubmitting,
        formData,
        setFormData,
        initialForm
    } = useFridge()

    const [isModalOpen, setIsModalOpen] = useState(false)

    const onConfirmAdd = async () => {
        const isSuccess = await handleAddFridge();
        if (isSuccess) {
            setIsModalOpen(false);
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <BaseLoading type='card' />
            </div>
        )
    }

    return (
        <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
                {Array.isArray(fridges) && fridges.map((fridge: Fridge) => (
                    <Link href={`/main/fridge/${fridge.fridge_id}`} key={fridge.fridge_id}>
                        <BaseCard className="flex flex-col items-center p-6 border shadow-lg hover:scale-105 transition-transform duration-300">
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

                <div
                    onClick={() => setIsModalOpen(true)}
                    className="flex flex-col items-center justify-center p-6 border-4 border-dashed border-slate-200 rounded-3xl cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/50 transition-all duration-300 group min-h-[350px]"
                >
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-emerald-100 transition-colors duration-300">
                        <Plus className="w-12 h-12 text-slate-400 group-hover:text-emerald-600" />
                    </div>
                    <p className="mt-4 font-kanit text-xl text-slate-400 group-hover:text-emerald-600">เพิ่มตู้เย็นใหม่</p>
                </div>
            </div>

            {/* 🌟 BaseModal สำหรับเพิ่มตู้เย็นใหม่ */}
            <BaseModal
                isOpen={isModalOpen}
                // 🌟 ดัก onClose ให้ล้างข้อมูลฟอร์มด้วย เผื่อผู้ใช้กดปิด (กากบาท/คลิกข้างนอก)
                onClose={() => {
                    setIsModalOpen(false);
                    setFormData({ name: '', location: '' });
                }}
                title="เพิ่มตู้เย็นใหม่"
                size="md"
                footer={
                    <div className="flex gap-4 w-full">
                        <BaseButton
                            variant="emral"
                            size="lg"
                            className="w-full"
                            onClick={onConfirmAdd}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'กำลังบันทึก...' : 'ยืนยัน'}
                        </BaseButton>
                        <BaseButton
                            variant="secondary"
                            size="lg"
                            className="w-full"
                            onClick={() => {
                                setIsModalOpen(false);
                                setFormData(initialForm);
                            }}
                            disabled={isSubmitting}
                        >
                            ยกเลิก
                        </BaseButton>
                    </div>
                }
            >
                {/* ใส่เนื้อหา Form ตรงนี้ */}
                <form className="space-y-4 font-kanit pb-4">
                    <BaseInput
                        label="ชื่อตู้เย็น"
                        name="name"
                        type="text"
                        placeholder="ระบุชื่อตู้เย็น..."
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <BaseInput
                        label="ตำแหน่งที่ตั้ง"
                        name="location"
                        type="text"
                        placeholder="ระบุตำแหน่งที่ตั้ง..."
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                </form>
            </BaseModal>
        </div>
    )
}