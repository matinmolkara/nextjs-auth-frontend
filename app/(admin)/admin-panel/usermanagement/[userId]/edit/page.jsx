"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getUserById, updateUser } from "@/app/api/api";
import Section from "@/components/admin/products/Section";
import Link from "next/link";
const UserEditPage = () => {
  const { userId } = useParams();
  const router = useRouter();

  const [formValues, setFormValues] = useState({
    email: "",
    role: "",
    is_active: true,
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [formSuccess, setFormSuccess] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserById(userId);
        setFormValues({
          email: user.email || "",
          role: user.role || "user",
          is_active: user.is_active ?? true,
          password: "",
        });
      } catch (err) {
        console.error("خطا در دریافت اطلاعات کاربر:", err);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "is_active") {
      setFormValues({ ...formValues, is_active: value === "true" });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formValues.email.includes("@")) {
      errors.email = "ایمیل معتبر وارد کنید.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    setFormSuccess("");

    if (!validateForm()) return;

    try {
      const payload = {
        email: formValues.email,
        role: formValues.role,
        is_active: formValues.is_active,
      };

      if (formValues.password?.trim()) {
        payload.password = formValues.password;
      }

      await updateUser(userId, payload);
      setFormSuccess("کاربر با موفقیت ویرایش شد.");
    } catch (err) {
      console.error("خطا در به‌روزرسانی کاربر:", err);
      setFormErrors({ api: "خطا در ذخیره کاربر. لطفاً دوباره تلاش کنید." });
    }
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>ویرایش کاربر</h3>
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
        <Section title="ویرایش اطلاعات کاربر" id="section-user-edit">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">ایمیل</label>
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                className={`form-control ${
                  formErrors.email ? "is-invalid" : ""
                }`}
              />
              {formErrors.email && (
                <div className="invalid-feedback">{formErrors.email}</div>
              )}
            </div>

            <div className="col-md-3 mb-3">
              <label className="form-label">نقش</label>
              <select
                name="role"
                value={formValues.role}
                onChange={handleChange}
                className="form-select"
              >
                <option value="user">کاربر عادی</option>
                <option value="admin">ادمین</option>
              </select>
            </div>

            <div className="col-md-3 mb-3">
              <label className="form-label">وضعیت</label>
              <select
                name="is_active"
                value={formValues.is_active ? "true" : "false"}
                onChange={handleChange}
                className="form-select"
              >
                <option value="true">فعال</option>
                <option value="false">غیرفعال</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">رمز عبور جدید (اختیاری)</label>
              <input
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                className="form-control"
              />
              <small className="text-muted">
                در صورت عدم نیاز، خالی بگذارید.
              </small>
            </div>
          </div>
        </Section>

        <button type="submit" className="btn btn-primary mt-3">
          ذخیره تغییرات
        </button>
      </form>
    </div>
  );
};

export default UserEditPage;
