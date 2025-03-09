"use client";
import { useState } from "react";
import { useAuth } from "@/context/authContext";
import styles from "../../../styles/components/Login.module.css";
import LoginHeader from "@/components/login/LoginHeader";
import Link from "next/link";
import LoginFrame from "@/components/login/LoginFrame";
const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <LoginFrame>
      <form className="row g-3"
        onSubmit={async (e) => {
          e.preventDefault();
          await login(email, password);
        }}
      >
        <LoginHeader title="ورود به سایت" />
        <div className="col-12 mb-3">
          <label
            htmlFor="inputEmail4"
            className={`form-label ${styles.formLabel}`}
          >
            ایمیل یا شماره موبایل:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`form-control ${styles.formControl}`}
            id="inputEmail4"
            placeholder="شماره موبایل خود را وارد کنید"
          />
        </div>
        <div className="col-12">
          <label
            htmlFor="inputPassword4"
            className={`form-label ${styles.formLabel}`}
          >
            رمز عبور:
          </label>
          <input
            type="password"
            value={password}
          onChange={(e) => setPassword(e.target.value)}
            className={`form-control ${styles.formControl}`}
            id="inputPassword4"
            placeholder="رمز عبور را وارد کنید"
          />
        </div>

        <div className="col-12 d-flex">
          <div className={styles.forgotLink}>
            <Link href="/users/changepassword">رمز عبور خود را فراموش کردید؟</Link>
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
