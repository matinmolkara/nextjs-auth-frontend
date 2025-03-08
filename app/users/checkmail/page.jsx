import LoginFrame from '@/components/login/LoginFrame'
import LoginHeader from '@/components/login/LoginHeader'
import React from 'react'
import styles from "../../../styles/components/Login.module.css";

import Link from "next/link";
const CheckMail = () => {
  return (
    <LoginFrame>
      <form className="row g-3">
        <LoginHeader title="ارسال کد تایید" />
        <div className="col-12">
          <p className="text-center">
            لطفا پیامک ارسال شده و یا ایمیل خود را بررسی کنید.
          </p>
        </div>
        <div className="col-12 d-flex justify-content-center">
          <button type="submit" className={`btn btn-primary ${styles.btnPrimary}`}>
            <Link href="/users/newpassword" className="text-white">
             
              ورود کد تایید
            </Link>
          </button>
        </div>
      </form>
    </LoginFrame>
  );
}

export default CheckMail