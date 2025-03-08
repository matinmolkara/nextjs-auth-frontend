import LoginFrame from '@/components/login/LoginFrame'
import LoginHeader from '@/components/login/LoginHeader'
import styles from "../../../styles/components/Login.module.css";
import React from 'react'

const NewPass = () => {
  return (
    <LoginFrame>
      <LoginHeader title="تغییر رمز عبور" />
      <form className="row g-3">
        <div className="col-12">
          <label
            htmlFor="inputEmail4"
            className={`form-label ${styles.formLabel}`}
          >
            کد تایید:
          </label>
          <input
            type="text"
            className={`form-control ${styles.formControl}`}
            id="inputEmail4"
            placeholder="کد ارسال شده از طریق پیامک یا ایمیل"
          />
        </div>
        <div className="col-12">
          <label
            htmlFor="inputPassword4"
            className={`form-label ${styles.formLabel}`}
          >
            رمز عبور جدید:
          </label>
          <input
            type="password"
            className={`form-control ${styles.formControl}`}
            id="inputPassword4"
            placeholder="رمز عبور جدید را وارد کنید"
          />
        </div>
        <div className="col-12">
          <label
            htmlFor="inputPassword5"
            className={`form-label ${styles.formLabel}`}
          >
            تکرار رمز عبور :
          </label>
          <input
            type="password"
            className={`form-control ${styles.formControl}`}
            id="inputPassword5"
            placeholder="رمز عبور جدید را دوباره بنویسید"
          />
        </div>
        <div className="col-6">
          <button
            type="submit"
            className={`btn btn-primary ${styles.btnPrimary}`}
          >
            تغییر رمز عبور
          </button>
        </div>
        <div className="col-6">
          <button
            type="submit"
            className={`btn btn-secondary ${styles.btnSecondary}`}
          >
            لغو
          </button>
        </div>
      </form>
    </LoginFrame>
  );
}

export default NewPass