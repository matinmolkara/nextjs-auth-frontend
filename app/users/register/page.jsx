"use client";
import { signup } from "@/app/actions/auth";

import React from "react";
import styles from "../../../styles/components/Login.module.css";

import Link from "next/link";
import LoginHeader from "@/components/login/LoginHeader";
import LoginFrame from "@/components/login/LoginFrame";

const Register = () => {
  return (
    <LoginFrame>
      <form className="row g-3" action={signup}>
        <LoginHeader title="ثبت نام سایت" />
        <div className="col-12 mb-3">
          <label
            htmlFor="inputEmail4"
            className={`form-label ${styles.formLabel}`}
          >
            نام و نام خانوادگی:
          </label>
          <input
            name="name"
            type="text"
            className={`form-control ${styles.formControl}`}
            id="inputEmail4"
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
            name="email"
            type="email"
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
            name="password"
            type="password"
            className={`form-control ${styles.formControl}`}
            id="inputPassword4"
            placeholder="انتخاب رمز عبور"
          />
        </div>
        {/* <div className="col-12">
          <label
            htmlFor="inputPassword5"
            className={`form-label ${styles.formLabel}`}
          >
            تکرار رمز عبور:
          </label>
          <input
            name="password"
            type="password"
            className={`form-control ${styles.formControl}`}
            id="inputPassword5"
            placeholder="رمز عبور انتخابی را دوباره بنویسید"
          />
        </div> */}

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
            ثبت نام هستید؟{" "}
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
