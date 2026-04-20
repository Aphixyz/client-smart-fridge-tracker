"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hook/user/userLogin";
import BaseInput from "@/components/Base/Input";
import BaseButton from "@/components/Base/Button";

function Page() {
  const router = useRouter();
  const { form, loading, errors, submitError, handleChange, handleSubmit } =
    useLogin();

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
          name="username"
          label="ชื่อผู้ใช้"
          type="text"
          value={form.username}
          onChange={handleChange}
          error={errors.username}
        />

        <BaseInput
          name="password"
          label="รหัสผ่าน"
          type="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />

        {submitError ? (
          <p className="text-sm text-red-500">{submitError}</p>
        ) : null}

        <div className="flex flex-col gap-2 md:flex-row">
          <BaseButton
            type="submit"
            shape="rounded"
            variant="emral"
            disabled={loading}
            className="w-full md:w-8/12 gap-2"
          >
            {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </BaseButton>
          <BaseButton
            type="button"
            shape="rounded"
            variant="cancel"
            disabled={loading}
            className="w-full md:w-3/12"
            onClick={() => router.push("/auth/register")}
          >
            สมัครใช้งาน
          </BaseButton>
        </div>
      </form>
    </div>
  );
}

export default Page;
