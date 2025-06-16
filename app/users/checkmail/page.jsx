"use client";
import LoginFrame from "@/components/login/LoginFrame";
import LoginHeader from "@/components/login/LoginHeader";
import React, { useState } from "react";
import styles from "../../../styles/components/Login.module.css";
import { resendVerificationEmail } from "@/app/api/api"; // فرض: این متد در api.js نوشته شده
import { useSearchParams } from "next/navigation";

const CheckMail = ({ type = "verify" }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const email = searchParams.get("email"); // ایمیل از URL می‌گیریم

  const handleResend = async () => {
    try {

      await resendVerificationEmail(email);
      setMessage("ایمیل تایید مجدد ارسال شد.");
    } catch (err) {
      setError("خطا در ارسال مجدد ایمیل.");
    }
  };

  return (
    <LoginFrame>
      <form className="row g-3">
        <LoginHeader title="بررسی ایمیل" />
        <div className="col-12">
          <p className="text-center">
            {type === "verify"
              ? "برای تایید ایمیل، لطفا صندوق ایمیل خود را بررسی کنید."
              : "لینک بازیابی رمز عبور به ایمیل شما ارسال شد."}
          </p>
        </div>

        {type === "verify" && (
          <div className="col-12 d-flex justify-content-center">
            <button
              type="button"
              onClick={handleResend}
              className={`btn btn-outline-primary ${styles.btnPrimary}`}
            >
              ارسال مجدد ایمیل تایید
            </button>
          </div>
        )}

        {message && <p className="text-success text-center">{message}</p>}
        {error && <p className="text-danger text-center">{error}</p>}
      </form>
    </LoginFrame>
  );
};

export default CheckMail;
