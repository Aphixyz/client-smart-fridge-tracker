"use client";

import React from 'react';
import Modal from '@/components/Base/Modal';
import Button from '@/components/Base/Button';
import { AlertTriangle, Info, CheckCircle2, HelpCircle } from 'lucide-react'; 
import { ConfirmModalProps } from '@/types/modal';



function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title = "ยืนยันการทำรายการ",
    description,
    type = 'warning',
    confirmText = "ยืนยัน",
    cancelText = "ยกเลิก",
    isLoading = false,
    size = 'sm'
}: ConfirmModalProps) {

    type ButtonVariant = 'primary' | 'danger';


    const config: Record<string, { icon: React.ReactNode; btn: ButtonVariant; iconStyle: string }> = {
        danger: { icon: <AlertTriangle className="text-red-500" size={40} />, btn: 'danger', iconStyle: 'bg-red-50' },
        warning: { icon: <AlertTriangle className="text-amber-500" size={40} />, btn: 'primary', iconStyle: 'bg-amber-50' },
        success: { icon: <CheckCircle2 className="text-emerald-500" size={40} />, btn: 'primary', iconStyle: 'bg-emerald-50' },
        info: { icon: <Info className="text-blue-500" size={40} />, btn: 'primary', iconStyle: 'bg-blue-50' },
        question: {
            icon: <HelpCircle className="text-slate-300" size={50} strokeWidth={2.5} />, 
            btn: 'danger', 
            iconStyle: 'bg-slate-50 border-[6px] border-slate-100 h-30 w-30 flex items-center justify-center'
        },
    };

    // Fallback เผื่อ type ที่ส่งมาไม่มีใน config
    const currentConfig = config[type as keyof typeof config] || config.warning;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={size}
            footer={

                <div className="flex w-full gap-3 flex-row">
                    <Button
                        shape='full'
                        variant={currentConfig.btn}
                        fullWidth
                        onClick={onConfirm}
                        isLoading={isLoading}
                    >
                        {confirmText}
                    </Button>
                    <Button
                        shape='full'
                        variant="secondary"
                        fullWidth
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        {cancelText}
                    </Button>
                </div>
            }
        >
            <div className="flex flex-col items-center text-center py-4 font-kanit">

                <div className={`mb-4 p-3 rounded-full ${currentConfig.iconStyle}`}>
                    {currentConfig.icon}
                </div>


                <h3 className="text-xl font-bold text-black mb-2">
                    {title}
                </h3>


                {description && (
                    <p className="text-slate-500 text-sm leading-relaxed">
                        {description}
                    </p>
                )}
            </div>
        </Modal>
    );
}

export default ConfirmModal;