"use client";

import { useState, useEffect } from "react";
import { Notification } from "@/types/setting";
import { settingService } from "@/service/setting/settingService";
import { showToast } from "@/lib/toast";

const initialForm: Notification = {
    id: 0,
    alert_threshold_days: null,
    push_notification_enabled: false,
}

export const useSetting = () => {
    const [formData, setFormData] = useState<Notification>(initialForm);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleAlertThresholdDaysChange = (value: string) => {
        setFormData({
            ...formData,
            alert_threshold_days: value ? Number(value) : null,
        });
    };

    const handlePushNotificationEnabledChange = (checked: boolean) => {
        setFormData({
            ...formData,
            push_notification_enabled: checked,
        });
    };

    const fetchSetting = async () => {
        setIsLoading(true);
        try {
            const data = await settingService.getSetting();
            if (data) {
                setFormData({
                    id: data.id,
                    alert_threshold_days: data.alert_threshold_days,
                    push_notification_enabled: data.push_notification_enabled,
                });
            }
        } catch (error) {
            console.error("Error fetching setting:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const executeHybridSetting = async () => {
        setIsSubmitting(true);
        try {
            const updatedData = await settingService.hybridSetting(formData);
            if (updatedData) {
                setFormData({
                    id: updatedData.id,
                    alert_threshold_days: updatedData.alert_threshold_days,
                    push_notification_enabled: updatedData.push_notification_enabled,
                });
                showToast("success","success");
                return true; 
            }
            return false;
        } catch (error) {
            showToast("error","error");
            return false; 
        } finally {
            setIsSubmitting(false);
        }
    }

    useEffect(() => {
        fetchSetting();
    }, []);

    return {
        formData,
        isLoading,
        isSubmitting,
        executeHybridSetting,
        handleAlertThresholdDaysChange,
        handlePushNotificationEnabledChange,
    };
}