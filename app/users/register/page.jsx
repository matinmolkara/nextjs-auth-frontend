"use client";
import { useState } from "react";
import { useAuth } from "@/context/authContext";
import styles from "../../../styles/components/Login.module.css";
import LoginHeader from "@/components/login/LoginHeader";
import Link from "next/link";
import LoginFrame from "@/components/login/LoginFrame";

const Register = () => {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <LoginFrame>
      <form
        className="row g-3"
        onSubmit={async (e) => {
          e.preventDefault();
          await register(email, password, name);
        }}
      >
        <LoginHeader title="ثبت نام سایت" />
        <div className="col-12 mb-3">
          <label
            htmlFor="inputName"
            className={`form-label ${styles.formLabel}`}
          >
            نام و نام خانوادگی:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`form-control ${styles.formControl}`}
            id="inputName"
            placeholder="نام خود را وارد کنید"
          />
        </div>
        <div className="col-12 mb-3">
          <label
            htmlFor="inputEmail6"
            className={`form-label ${styles.formLabel}`}
          >
            ایمیل:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`form-control ${styles.formControl}`}
            id="inputEmail6"
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
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`form-control ${styles.formControl}`}
            id="inputPassword4"
            placeholder="انتخاب رمز عبور"
          />
        </div>

        <div className="col-12 d-flex justify-content-center">
          <button
            type="submit"
            className={`btn btn-primary ${styles.btnPrimary}`}
          >
            ثبت نام
          </button>
        </div>
        <div className="col-12">
          <div className="d-flex justify-content-center">
            ثبت نام کرده‌اید؟{" "}
            <Link className={styles.registerLink} href="/users/login">
              وارد شوید
            </Link>
          </div>
        </div>
      </form>
    </LoginFrame>
  );
};

export default Register;
