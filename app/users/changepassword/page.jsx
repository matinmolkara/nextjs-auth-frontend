import LoginFrame from "@/components/login/LoginFrame";
import LoginHeader from "@/components/login/LoginHeader";
import React from "react";
import styles from "../../../styles/components/Login.module.css";
const Changepass = () => {
  return (
    <LoginFrame>
      <form className="row g-3">
        <LoginHeader title="ارسال کد تایید" />
        <div className="col-12">
          <p>
            برای تغییر رمز عبور ابتدا شماره تماس یا ایمیل خود را وارد کنید تا کد
            برایتان ارسال شود
          </p>
        </div>
        <div className="col-12">
          <label
            htmlFor="inputEmail4"
            className={`form-label ${styles.formLabel}`}
          >
            ایمیل 
          </label>
          <input
            type="email"
            className={`form-control ${styles.formControl}`}
            id="inputEmail4"
            placeholder="ایمیل یا شماره تماس برای ارسال کد تایید"
          />
        </div>

        <div className="col-12 d-flex justify-content-center">
          <button
            type="submit"
            className={`btn btn-primary ${styles.btnPrimary}`}
          >
            ارسال کد
          </button>
        </div>
      </form>
    </LoginFrame>
  );
};

export default Changepass;
