// components/login/Login.js - نسخه نهایی با ساختار شما
"use client";
import { useState } from "react";
import { useAuth } from "@/context/authContext";
import styles from "../../../styles/components/Login.module.css";
import LoginHeader from "@/components/login/LoginHeader";
import Link from "next/link";
import LoginFrame from "@/components/login/LoginFrame";
import { useRouter } from "next/navigation";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { ERROR_CODES } from "@/app/lib/errors"
import ErrorDisplay from "@/components/ErrorDisplay";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // استفاده از سیستم error handling یکپارچه
  const { error, loading, handleAsync, clearError } = useErrorHandler();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      return;
    }

    try {
      // استفاده از handleAsync برای مدیریت خطا
      const user = await handleAsync(() => login(email, password));

      // موفقیت‌آمیز - redirect
      if (user?.role === "admin") {
        router.push("/admin-panel/dashboard");
      } else {
        router.push("/");
      }
    } catch (handledError) {
      // خطاهای خاص که نیاز به عملکرد ویژه دارند
      if (handledError.code === ERROR_CODES.EMAIL_NOT_VERIFIED) {
        router.push(`/users/checkmail?email=${email}`);
      }
      // بقیه خطاها در ErrorDisplay نمایش داده می‌شوند
    }
  };

  const handleRetry = () => {
    clearError();
    handleLogin({ preventDefault: () => {} });
  };

  return (
    <LoginFrame>
      <form className="row g-3" onSubmit={handleLogin}>
        <LoginHeader title="ورود به سایت" />

        <div className="col-12 mb-3">
          <label
            htmlFor="inputEmail4"
            className={`form-label ${styles.formLabel}`}
          >
            ایمیل:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearError(); // پاک کردن خطا هنگام تایپ
            }}
            className={`form-control ${styles.formControl} ${
              error ? "is-invalid" : ""
            }`}
            id="inputEmail4"
            placeholder="ایمیل خود را وارد کنید"
            disabled={loading}
          />
        </div>

        <div className="col-12">
          <label
            htmlFor="inputPassword4"
            className={`form-label ${styles.formLabel}`}
          >
            رمز عبور:
          </label>
          <div className="position-relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearError();
              }}
              className={`form-control ${styles.formControl} ${
                error ? "is-invalid" : ""
              }`}
              id="inputPassword4"
              placeholder="رمز عبور را وارد کنید"
              disabled={loading}
            />
            <span
              className="position-absolute top-50 end-0 translate-middle-y me-3"
              style={{ cursor: "pointer", zIndex: 10 }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
        </div>

        {/* جایگزین {error && <div>...} قدیمی */}
        <ErrorDisplay error={error} onRetry={handleRetry} />

        <div className="col-12 d-flex">
          <div className={styles.forgotLink}>
            <Link href="/users/changepassword">
              رمز عبور خود را فراموش کردید؟
            </Link>
          </div>
        </div>

        <div className="col-12 d-flex justify-content-center">
          <button
            type="submit"
            className={`btn btn-primary ${styles.btnPrimary}`}
            disabled={loading || !email || !password}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                در حال ورود...
              </>
            ) : (
              "ورود به سایت"
            )}
          </button>
        </div>

        <div className="col-12">
          <div className="col-12 d-flex justify-content-center">
            هنوز ثبت نام نکردید؟
            <Link className={styles.registerLink} href="/users/register">
              ثبت نام
            </Link>
          </div>
        </div>
      </form>
    </LoginFrame>
  );
};

export default Login;
