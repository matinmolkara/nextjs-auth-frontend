"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyEmail } from "@/app/api/api";
import LoginFrame from "@/components/login/LoginFrame";
import LoginHeader from "@/components/login/LoginHeader";

const VerifyEmailPage = () => {
  const [status, setStatus] = useState("در حال تایید...");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");

    const verify = async () => {
      if (!token) {
        setStatus("توکن یافت نشد.");
        return;
      }

      try {
        await verifyEmail(token);
        setStatus("ایمیل با موفقیت تایید شد.");
        setTimeout(() => router.push("/users/login"), 3000); // بعد 3 ثانیه میره به صفحه لاگین
      } catch (error) {
        console.error("خطا در تایید ایمیل:", error);
        setStatus("خطا در تایید ایمیل. ممکن است لینک منقضی شده باشد.");
      }
    };

    verify();
  }, [searchParams, router]);

  return (
    <Suspense fallback={<div>در حال بارگیری...</div>}>
      <LoginFrame>
        <LoginHeader title="تایید ایمیل" />
        <p className="text-center mt-4">{status}</p>
      </LoginFrame>
    </Suspense>
  );
};

export default VerifyEmailPage;
