import axios from "axios";

export const getThaiErrorMessage = (error: any): string => {
    let message = "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง";

    if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const apiMessage = error.response?.data?.message;

        if (status === 404) return "ไม่พบข้อมูลในระบบ";
        if (status === 401) return "การยืนยันตัวตนล้มเหลว หรือคุณไม่มีสิทธิ์เข้าถึง";
        if (status === 429) return "คุณทำรายการบ่อยเกินไป กรุณารอสักครู่";

        const errorMap: Record<string, string> = {
            "User not found": "ไม่พบผู้ใช้งานนี้ในระบบ",
            "Invalid OTP": "รหัส OTP ไม่ถูกต้อง",
            "OTP expired": "รหัส OTP หมดอายุ",
            "OTP not found": "ไม่พบรหัส OTP ในระบบ",
            "OTP already used": "รหัส OTP นี้ถูกใช้งานไปแล้ว",
            "Too many attempts": "กรอกรหัสผิดเกินจำนวนครั้งที่กำหนด กรุณาขอรหัสใหม่",
            "OTP is invalid or expired": "รหัส OTP ไม่ถูกต้องหรือหมดอายุ",
            "Password does not match": "รหัสผ่านไม่ตรงกัน",
            "User already exists": "ผู้ใช้งานนี้มีอยู่ในระบบแล้ว",
            "Invalid credentials": "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
            "Network Error": "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้",
        };

        if (apiMessage && errorMap[apiMessage]) {
            return errorMap[apiMessage];
        }
    }

    return message;
};
