import React from 'react';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}


export interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    type?: 'danger' | 'warning' | 'success' | 'info' | 'question' | 'question-success';
    confirmText?: string;
    cancelText?: string;
    isLoading?: boolean;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}