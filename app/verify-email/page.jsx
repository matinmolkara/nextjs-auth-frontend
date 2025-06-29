"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyEmail } from "@/app/api/api";
import LoginFrame from "@/components/login/LoginFrame";
import LoginHeader from "@/components/login/LoginHeader";
import { useError } from "@/context/ErrorContext";
import { handleApiError } from "@/utils/errorHandler";

const VerifyEmailPage = () => {
  const [status, setStatus] = useState("در حال تایید...");
  const [isSuccess, setIsSuccess] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addError } = useError();

  useEffect(() => {
    const token = searchParams.get("token");

    const verify = async () => {
      if (!token) {
        setStatus("توکن یافت نشد.");
        addError({
          message: "لینک تایید نامعتبر است.",
          code: "INVALID_TOKEN",
        });
        return;
      }

      try {
        await verifyEmail(token);
        setStatus("ایمیل با موفقیت تایید شد.");
        setIsSuccess(true);
        setTimeout(() => router.push("/users/login"), 3000);
      } catch (error) {
        console.error("خطا در تایید ایمیل:", error);
        const processedError = handleApiError(error);
        addError(processedError);
        setStatus("خطا در تایید ایمیل رخ داد.");
      }
    };

    verify();
  }, [searchParams, router, addError]);

  return (
    <Suspense fallback={<div>در حال بارگیری...</div>}>
      <LoginFrame>
        <LoginHeader title="تایید ایمیل" />
        <div className="text-center mt-4">
          <p className={isSuccess ? "text-success" : "text-muted"}>{status}</p>
          {isSuccess && (
            <div className="mt-3">
              <div
                className="spinner-border spinner-border-sm text-success me-2"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              <small className="text-muted">
                در حال انتقال به صفحه ورود...
              </small>
            </div>
          )}
          {!isSuccess && status.includes("خطا") && (
            <div className="mt-3">
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => router.push("/users/login")}
              >
                بازگشت به صفحه ورود
              </button>
            </div>
          )}
        </div>
      </LoginFrame>
    </Suspense>
  );
};

export default VerifyEmailPage;
