"use client";
import LoginFrame from "@/components/login/LoginFrame";
import LoginHeader from "@/components/login/LoginHeader";
import React, { Suspense, useState } from "react";
import styles from "../../../styles/components/Login.module.css";
import { resendVerificationEmail } from "@/app/api/api";
import { useSearchParams } from "next/navigation";
import { useError } from "@/context/ErrorContext";
import { handleApiError } from "@/utils/errorHandler";
import { ERROR_CODES } from "@/app/lib/errors";
import ErrorDisplay from "@/components/ErrorDisplay";

const CheckMailContent = ({ type = "verify" }) => {
  const [message, setMessage] = useState("");
  const [currentError, setCurrentError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { addError } = useError();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const handleResend = async () => {
    if (!email) {
      const error = {
        message: "ایمیل مشخص نشده است.",
        code: ERROR_CODES.BAD_REQUEST,
      };
      setCurrentError(error);
      addError(error);
      return;
    }

    setIsLoading(true);
    setCurrentError(null);
    setMessage("");

    try {
      await resendVerificationEmail(email);
      setMessage(
        "ایمیل تایید مجدد ارسال شد. لطفاً صندوق ایمیل خود را بررسی کنید."
      );

      // پیام موفقیت را به toast اضافه کنیم
      addError({
        message: "ایمیل تایید با موفقیت ارسال شد",
        code: "SUCCESS",
        type: "success",
      });
    } catch (err) {
      console.error("Resend email error:", err);

      // پردازش خطا
      const processedError = handleApiError(err);
      setCurrentError(processedError);
      addError(processedError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setCurrentError(null);
    handleResend();
  };

  return (
    <LoginFrame>
      <form className="row g-3">
        <LoginHeader title="بررسی ایمیل" />

        {/* نمایش خطای کلی */}
        <ErrorDisplay
          error={currentError}
          onRetry={
            currentError?.code === ERROR_CODES.NETWORK_ERROR
              ? handleRetry
              : null
          }
          className="mb-3"
        />

        <div className="col-12">
          <div className="text-center">
            {type === "verify" ? (
              <div>
                <div className="mb-3">
                  <span style={{ fontSize: "3rem" }}>📧</span>
                </div>
                <p className="mb-3">
                  برای تایید ایمیل، لطفا صندوق ایمیل خود را بررسی کنید.
                </p>
                {email && (
                  <p className="text-muted small">
                    ایمیل به آدرس <strong>{email}</strong> ارسال شده است.
                  </p>
                )}
              </div>
            ) : (
              <div>
                <div className="mb-3">
                  <span style={{ fontSize: "3rem" }}>🔐</span>
                </div>
                <p className="mb-3">
                  لینک بازیابی رمز عبور به ایمیل شما ارسال شد.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* نمایش پیام موفقیت */}
        {message && (
          <div className="col-12">
            <div
              className="alert alert-success d-flex align-items-center"
              role="alert"
            >
              <span className="me-2">✅</span>
              <div>{message}</div>
            </div>
          </div>
        )}

        {type === "verify" && (
          <div className="col-12 d-flex justify-content-center">
            <button
              type="button"
              onClick={handleResend}
              disabled={isLoading || !email}
              className={`btn btn-outline-primary ${styles.btnPrimary}`}
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  در حال ارسال...
                </>
              ) : (
                "ارسال مجدد ایمیل تایید"
              )}
            </button>
          </div>
        )}

        {!email && type === "verify" && (
          <div className="col-12">
            <div className="alert alert-warning text-center" role="alert">
              <span className="me-2">⚠️</span>
              ایمیل مشخص نشده است. لطفاً دوباره ثبت نام کنید.
            </div>
          </div>
        )}

        {/* راهنمایی اضافی */}
        <div className="col-12">
          <div className="text-center">
            <small className="text-muted">
              ایمیل را دریافت نکردید؟ پوشه اسپم خود را بررسی کنید.
            </small>
          </div>
        </div>
      </form>
    </LoginFrame>
  );
};

const CheckMail = ({ type = "verify" }) => {
  return (
    <Suspense
      fallback={
        <LoginFrame>
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </LoginFrame>
      }
    >
      <CheckMailContent type={type} />
    </Suspense>
  );
};

export default CheckMail;
