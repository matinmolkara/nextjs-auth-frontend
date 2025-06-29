"use client";
import { useState } from "react";
import { useAuth } from "@/context/authContext";
import { useError } from "@/context/ErrorContext";
import { ERROR_CODES, ERROR_MESSAGES } from "@/app/lib/errors";
import styles from "../../../styles/components/Login.module.css";
import LoginHeader from "@/components/login/LoginHeader";
import Link from "next/link";
import LoginFrame from "@/components/login/LoginFrame";
import ErrorDisplay from "@/components/ErrorDisplay";

const Register = () => {
  const { register, loading } = useAuth();
  const { addError } = useError();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [currentError, setCurrentError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  // اعتبارسنجی فیلدها
  const validateFields = () => {
    const errors = {};

    // اعتبارسنجی نام
    if (!name.trim()) {
      errors.name = ERROR_MESSAGES[ERROR_CODES.REQUIRED_FIELD];
    }

    // اعتبارسنجی ایمیل
    if (!email.trim()) {
      errors.email = ERROR_MESSAGES[ERROR_CODES.REQUIRED_FIELD];
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = ERROR_MESSAGES[ERROR_CODES.INVALID_EMAIL];
    }

    // اعتبارسنجی رمز عبور
    if (!password.trim()) {
      errors.password = ERROR_MESSAGES[ERROR_CODES.REQUIRED_FIELD];
    } else if (password.length < 8) {
      errors.password = ERROR_MESSAGES[ERROR_CODES.WEAK_PASSWORD];
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // پاک کردن خطاهای قبلی
    setCurrentError(null);
    setValidationErrors({});

    // اعتبارسنجی
    const errors = validateFields();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      await register(email, password, name);
    } catch (error) {
      console.error("Registration error:", error);

      // نمایش خطا در کامپوننت و همچنین اضافه کردن به toast
      setCurrentError(error);
      addError(error);
    }
  };

  const handleRetry = () => {
    setCurrentError(null);
  };

  return (
    <LoginFrame>
      <form className="row g-3" onSubmit={handleSubmit}>
        <LoginHeader title="ثبت نام سایت" />

        {/* نمایش خطای کلی */}
        <ErrorDisplay
          error={currentError}
          onRetry={handleRetry}
          className="mb-3"
        />

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
            onChange={(e) => {
              setName(e.target.value);
              // پاک کردن خطای اعتبارسنجی هنگام تایپ
              if (validationErrors.name) {
                setValidationErrors((prev) => ({ ...prev, name: null }));
              }
            }}
            className={`form-control ${styles.formControl} ${
              validationErrors.name ? "is-invalid" : ""
            }`}
            id="inputName"
            placeholder="نام خود را وارد کنید"
            disabled={loading}
          />
          {validationErrors.name && (
            <div className="invalid-feedback">{validationErrors.name}</div>
          )}
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
            onChange={(e) => {
              setEmail(e.target.value);
              if (validationErrors.email) {
                setValidationErrors((prev) => ({ ...prev, email: null }));
              }
            }}
            className={`form-control ${styles.formControl} ${
              validationErrors.email ? "is-invalid" : ""
            }`}
            id="inputEmail6"
            placeholder="ایمیل خود را وارد کنید"
            disabled={loading}
          />
          {validationErrors.email && (
            <div className="invalid-feedback">{validationErrors.email}</div>
          )}
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
                if (validationErrors.password) {
                  setValidationErrors((prev) => ({ ...prev, password: null }));
                }
              }}
              className={`form-control ${styles.formControl} ${
                validationErrors.password ? "is-invalid" : ""
              }`}
              id="inputPassword4"
              placeholder="انتخاب رمز عبور"
              disabled={loading}
            />
            <span
              className="position-absolute top-50 end-0 translate-middle-y me-3"
              style={{ cursor: "pointer", zIndex: 10 }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
            {validationErrors.password && (
              <div className="invalid-feedback">
                {validationErrors.password}
              </div>
            )}
          </div>
        </div>

        <div className="col-12 d-flex justify-content-center">
          <button
            type="submit"
            className={`btn btn-primary ${styles.btnPrimary}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                در حال ثبت نام...
              </>
            ) : (
              "ثبت نام"
            )}
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
