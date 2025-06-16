"use client";
import { useState } from "react";
import { useAuth } from "@/context/authContext";
import styles from "../../../styles/components/Login.module.css";
import LoginHeader from "@/components/login/LoginHeader";
import Link from "next/link";
import LoginFrame from "@/components/login/LoginFrame";
import { useRouter } from "next/navigation";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); // ✅ نمایش خطا
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const user = await login(email, password); // 👈 کاربر برگشت داده شد
      // بر اساس نقش redirect کن
      if (user?.role === "admin") {
        router.push("/admin-panel/dashboard");
      } else {
        router.push("/"); // 👈 یا "/home" یا صفحه دلخواه
      }
    } catch (error) {
      const message = error.response?.data?.message || "خطایی رخ داده است.";

      if (message.includes("ایمیل خود را تایید کنید")) {
        router.push(`/users/checkmail?email=${email}`);
      } else if (
        message.includes("کاربر یافت نشد") ||
        message.includes("رمز عبور نادرست")
      ) {
        setError("ایمیل یا رمز عبور اشتباه است.");
      } else {
        setError(message);
      }
    }
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
            onChange={(e) => setEmail(e.target.value)}
            className={`form-control ${styles.formControl}`}
            id="inputEmail4"
            placeholder="ایمیل خود را وارد کنید"
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
              onChange={(e) => setPassword(e.target.value)}
              className={`form-control ${styles.formControl}`}
              id="inputPassword4"
              placeholder="رمز عبور را وارد کنید"
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

        {error && (
          <div className="col-12">
            <p className="text-danger text-center">{error}</p>{" "}
            {/* ✅ نمایش پیام خطا */}
          </div>
        )}

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
          >
            ورود به سایت
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
