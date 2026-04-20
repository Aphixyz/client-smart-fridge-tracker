"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRegister } from "@/hook/user/userRegister";
import BaseInput from "@/components/Base/Input";
import BaseButton from "@/components/Base/Button";

function Page() {
  const router = useRouter();
  const { form, loading, errors, handleChange, handleSubmit } = useRegister();

  return (
    <div className="mx-auto font-kanit w-full max-w-md">
      <div className="mb-6 flex flex-col items-center justify-center object-cover">
        <Image
          src="/icons/head.png"
          alt="Logo"
          width={250}
          height={250}
          className="h-[250px] w-[250px] object-contain"
          priority
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <BaseInput
          name="name"
          label="ชื่อบ้าน / ชื่อคนในบ้าน"
          type="text"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
        />

        <BaseInput
          name="username"
          label="กรุณาชื่อผู้ใช้"
          type="text"
          value={form.username}
          onChange={handleChange}
          error={errors.username}
        />

        <BaseInput
          name="password"
          label="กรุณากรอกรหัสผ่าน"
          type="password"
          placeholder="********"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />

        <BaseInput
          name="confirmpassword"
          label="กรุณายืนยันรหัสผ่าน"
          type="password"
          placeholder="********"
          value={form.confirmpassword}
          onChange={handleChange}
          error={errors.confirmpassword}
        />

        <div className="flex flex-col gap-2 md:flex-row">
          <BaseButton
            type="submit"
            shape="rounded"
            variant="emral"
            disabled={loading}
            className="w-full md:w-9/12"
          >
            {loading ? "กำลังสมัครใช้งาน..." : "สมัครใช้งาน"}
          </BaseButton>

          <BaseButton
            type="button"
            shape="rounded"
            variant="cancel"
            disabled={loading}
            className="w-full md:w-3/12"
            onClick={() => router.back()}
          >
            ยกเลิก
          </BaseButton>
        </div>
      </form>
    </div>
  );
}

export default Page;
