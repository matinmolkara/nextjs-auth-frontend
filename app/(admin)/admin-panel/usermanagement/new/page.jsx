
"use client"
import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-datepicker/dist/react-datepicker.css";
import { createUser } from "@/app/api/api";
import Section from "@/components/admin/products/Section";
import Link from "next/link";


const UserAddPage = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    role: "",
    is_active: true, // پیش‌فرض: فعال
    birthDate: new Date(),
  });
  

  const [formErrors, setFormErrors] = useState({});
  const [formSuccess, setFormSuccess] = useState("");

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };


  const validateForm = () => {
    const errors = {};
    if (!formValues.name.trim()) errors.name = "نام و نام خانوادگی الزامی است.";
    if (!formValues.email.trim() || !formValues.email.includes("@")) errors.email = "ایمیل معتبر وارد کنید.";
    if (!formValues.password) errors.password = "رمز عبور الزامی است.";
    if (formValues.password !== formValues.confirmPassword)
      errors.confirmPassword = "رمز عبور با تکرار آن مطابقت ندارد.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setFormErrors({});
    setFormSuccess("");

    if (!validateForm()) return;


    try {


      const birthDate = formValues.birthDate?.toDate?.(); // تبدیل به JavaScript Date میلادی
      const formattedBirthDate = birthDate
        ? birthDate.toISOString().split("T")[0] // YYYY-MM-DD
        : null;

      const payload = {
        name: formValues.name,
        email: formValues.email,
        password: formValues.password,
        gender: formValues.gender,
        role: formValues.role,
        is_active: formValues.is_active,
        date_of_birth: formattedBirthDate,
      };

      await createUser(payload);
      setFormSuccess("کاربر با موفقیت ایجاد شد!");
      setFormValues({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        role: "",
        is_active: "",
        birthDate: new Date(),
      });
    } catch (err) {
      setFormErrors({ api: "خطا در ثبت کاربر. لطفاً دوباره تلاش کنید." });
    }
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>افزودن کاربر جدید</h3>
        <Link
          href="/admin-panel/usermanagement"
          className="btn btn-outline-dark"
        >
          <i className="bi bi-people"></i> بازگشت به لیست کاربران
        </Link>
      </div>
      {formSuccess && <div className="alert alert-success">{formSuccess}</div>}
      {Object.keys(formErrors).length > 0 && (
        <div className="alert alert-danger">
          لطفاً خطاهای فرم را بررسی کنید.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Section title="اطلاعات پایه کاربر" id="section-basic-user-info">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">
                نام و نام خانوادگی <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="name"
                className={`form-control ${
                  formErrors.name ? "is-invalid" : ""
                }`}
                value={formValues.name}
                onChange={handleChange}
              />
              {formErrors.name && (
                <div className="invalid-feedback">{formErrors.name}</div>
              )}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">
                ایمیل <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                name="email"
                className={`form-control ${
                  formErrors.email ? "is-invalid" : ""
                }`}
                value={formValues.email}
                onChange={handleChange}
              />
              {formErrors.email && (
                <div className="invalid-feedback">{formErrors.email}</div>
              )}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">
                رمز عبور <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                name="password"
                className={`form-control ${
                  formErrors.password ? "is-invalid" : ""
                }`}
                value={formValues.password}
                onChange={handleChange}
              />
              {formErrors.password && (
                <div className="invalid-feedback">{formErrors.password}</div>
              )}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">
                تکرار رمز عبور <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                className={`form-control ${
                  formErrors.confirmPassword ? "is-invalid" : ""
                }`}
                value={formValues.confirmPassword}
                onChange={handleChange}
              />
              {formErrors.confirmPassword && (
                <div className="invalid-feedback">
                  {formErrors.confirmPassword}
                </div>
              )}
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">جنسیت</label>
              <select
                name="gender"
                className="form-select"
                value={formValues.gender}
                onChange={handleChange}
              >
                <option value="">-جنسیت-</option>
                <option value="زن">زن</option>
                <option value="مرد">مرد</option>
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">نقش</label>
              <select
                name="role"
                className="form-select"
                value={formValues.role}
                onChange={handleChange}
              >
                <option value="user">کاربر عادی</option>
                <option value="admin">ادمین</option>
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">وضعیت</label>
              <select
                name="is_active"
                className="form-select"
                value={formValues.is_active ? "true" : "false"}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    is_active: e.target.value === "true",
                  })
                }
              >
                <option value="true">فعال</option>
                <option value="false">غیرفعال</option>
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">تاریخ تولد</label>
              <DatePicker
                value={formValues.birthDate}
                onChange={(date) =>
                  setFormValues({ ...formValues, birthDate: date })
                }
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                inputClass="form-control"
                format="YYYY/MM/DD"
                placeholder="تاریخ تولد را انتخاب کنید"
              />
            </div>
          </div>
        </Section>
        <button type="submit" className="btn btn-primary mt-3">
          ثبت کاربر
        </button>
      </form>
    </div>
  );
};

export default UserAddPage;
