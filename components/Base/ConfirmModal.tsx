"use client";

import React from 'react';
import Modal from '@/components/Base/Modal';
import Button from '@/components/Base/Button';
import { AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
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
    isLoading = false
}: ConfirmModalProps) {

    type ButtonVariant = 'primary' | 'danger';

    // กำหนดสีและไอคอนตามประเภท
    const config: Record<NonNullable<ConfirmModalProps['type']>, { icon: React.ReactNode; btn: ButtonVariant }> = {
        danger: { icon: <AlertTriangle className="text-red-500" size={40} />, btn: 'danger' },
        warning: { icon: <AlertTriangle className="text-amber-500" size={40} />, btn: 'primary' },
        success: { icon: <CheckCircle2 className="text-emerald-500" size={40} />, btn: 'primary' },
        info: { icon: <Info className="text-blue-500" size={40} />, btn: 'primary' },
    };

    const currentConfig = config[type];

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="sm" // Confirm Modal มักจะใช้ขนาดเล็ก
            footer={
                <div className="flex w-full gap-3">
                    <Button
                        shape='full'
                        variant="outline"
                        fullWidth
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        shape='full'
                        variant={currentConfig.btn}
                        fullWidth
                        onClick={onConfirm}
                        isLoading={isLoading}
                    >
                        {confirmText}
                    </Button>
                </div>
            }
        >
            <div className="flex flex-col items-center text-center py-4 font-kanit">
                <div className="mb-4 p-3 bg-slate-50 rounded-full">
                    {currentConfig.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                    {title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                    {description}
                </p>
            </div>
        </Modal>
    );
}

export default ConfirmModal;
