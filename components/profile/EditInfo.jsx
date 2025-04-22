"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/authContext"; // فرض بر این است که authContext در این مسیر قرار دارد
import axios from "axios"; // برای ارسال درخواست HTTP
// ایمپورت کردن ماژول استایل اگر از آن استفاده می‌کنید
// import styles from './EditInfo.module.css';

// فرض می‌کنیم کامپوننت در مسیری قرار دارد که AuthProvider آن را Wrap کرده است
const EditInfo = () => {
  const { user, fetchUser } = useAuth(); // دریافت user و fetchUser از Context
  const [formData, setFormData] = useState({
    // استفاده از useState برای مدیریت وضعیت فرم
    name: "",
    phone: "",
    nationalId: "",
    password: "", // برای رمز عبور جدید
    // ایمیل به عنوان readOnly باقی می ماند و نیازی به وضعیت برای آن نیست مگر اینکه بخواهید آن را در فرم نگه دارید
    // lastName: '' // اگر نام خانوادگی در شیء user وجود دارد، آن را اضافه کنید
  });
  const [loading, setLoading] = useState(false); // وضعیت بارگذاری
  const [error, setError] = useState(null); // وضعیت خطا
  const [success, setSuccess] = useState(false); // وضعیت موفقیت

  // useEffect برای بارگذاری اولیه اطلاعات کاربر در وضعیت فرم
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "", // استفاده از مقدار موجود یا رشته خالی
        phone: user.phone || "",
        nationalId: user.nationalId || "",
        password: "", // رمز عبور هرگز از بک‌اند خوانده نمی‌شود
        // lastName: user.lastName || '' // اگر نام خانوادگی در شیء user وجود دارد
      });
    }
  }, [user]); // این useEffect هر زمان که شیء user تغییر کند، اجرا می‌شود

  // تابع برای مدیریت تغییرات در فیلدهای فرم
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // پاک کردن پیام‌های خطا و موفقیت هنگام شروع تایپ
    setError(null);
    setSuccess(false);
  };

  // تابع برای ارسال فرم
  const handleSubmit = async (e) => {
    e.preventDefault(); // جلوگیری از رفرش شدن صفحه
    setLoading(true);
    setError(null); // پاک کردن خطاهای قبلی
    setSuccess(false); // پاک کردن پیام موفقیت قبلی

    if (!user) {
      setError("اطلاعات کاربر در دسترس نیست.");
      setLoading(false);
      return;
    }

    // ساخت شیء داده برای ارسال به بک‌اند
    // فقط فیلدهایی که اجازه تغییر دارند و تغییر کرده‌اند را ارسال کنید
    const dataToUpdate = {
      name: formData.name,
      phone: formData.phone, // فرض می‌کنیم بک‌اند فیلد phone را در updateUser می‌پذیرد
      nationalId: formData.nationalId, // فرض می‌کنیم بک‌اند فیلد nationalId را می‌پذیرد
    };

    // اضافه کردن رمز عبور جدید فقط اگر وارد شده باشد
    if (formData.password) {
      dataToUpdate.password = formData.password;
    }

    // توجه: بک‌اند شما در update (controllers/userController.js) فیلدهای phone و nationalId را
    // از req.body استخراج و به User.update پاس نمی‌دهد. شما باید بک‌اند را هم اصلاح کنید
    // تا این فیلدها را بپذیرد و در دیتابیس ذخیره کند.
    // بک‌اند فعلی فقط name, email, password, role را می‌پذیرد.
    // برای تطابق با بک‌اند فعلی، فقط name و password را می‌فرستیم.
    // **نیاز به اصلاح بک‌اند برای پذیرش phone و nationalId دارید.**
    // فعلاً فقط name و password را می‌فرستیم:
    const dataForBackend = {
      name: formData.name,
    };
    if (formData.password) {
      dataForBackend.password = formData.password; // هش کردن در بک‌اند الزامی است!
    }

    try {
      // ارسال درخواست PUT به بک‌اند
      // فرض می‌کنیم endpoint شما برای به‌روزرسانی کاربر فعلی /api/auth/update-profile است
      // یا اگر از /api/users/:id استفاده می‌کنید، باید ID کاربر فعلی (user.id) را بفرستید
      // و بک‌اند حتماً باید چک کند که کاربر احراز هویت شده اجازه ویرایش این ID را دارد.
      // استفاده از یک endpoint مخصوص کاربر احراز هویت شده (/api/auth/update-profile) امن‌تر است.
      // اگر endpoint شما /api/users/:id است و می‌خواهید آن را استفاده کنید:
      // const res = await axios.put(`http://localhost:5000/api/users/${user.id}`, dataForBackend, { // فرض استفاده از user.id
      //     withCredentials: true,
      // });

      // اگر یک endpoint مثل /api/auth/update-profile دارید که کاربر لاگین شده را به‌روز می‌کند:
      const res = await axios.put(
        `http://localhost:5000/api/auth/update-profile`,
        dataForBackend,
        {
          withCredentials: true,
        }
      );

      // اگر درخواست موفقیت آمیز بود، اطلاعات کاربر در Context را به‌روز کنید
      await fetchUser();
      setSuccess(true); // نمایش پیام موفقیت
      setError(null); // اطمینان از عدم نمایش خطا
    } catch (err) {
      console.error(
        "Error updating user:",
        err.response ? err.response.data : err.message
      );
      setError("خطا در به‌روزرسانی اطلاعات. لطفا دوباره تلاش کنید."); // نمایش پیام خطا
      setSuccess(false); // اطمینان از عدم نمایش موفقیت
    } finally {
      setLoading(false); // پایان بارگذاری
    }
  };

  // نمایش حالت بارگذاری یا پیام اگر کاربر هنوز بارگذاری نشده
  if (!user) {
    return <div>در حال بارگذاری اطلاعات پروفایل...</div>; // یا پیام دیگری
  }

  return (
    <div className="mb-4">
      {" "}
      {/* استفاده از کلاس‌های Bootstrap یا مشابه */}
      <h5 className="bg-head border-bottom mb-3">ویرایش پروفایل</h5>{" "}
      {/* عنوان */}
      {error && <div className="alert alert-danger">{error}</div>}{" "}
      {/* نمایش خطا */}
      {success && (
        <div className="alert alert-success">
          اطلاعات با موفقیت به‌روزرسانی شد.
        </div>
      )}{" "}
      {/* نمایش موفقیت */}
      <form onSubmit={handleSubmit}>
        {/* نام */}
        <div className="form-group mb-3">
          {" "}
          {/* گروه فرم */}
          <label htmlFor="name">نام:</label>
          <input
            type="text" // نوع ورودی
            className="form-control" // کلاس استایل Bootstrap
            id="name" // ID برای label
            name="name" // نام فیلد
            value={formData.name} // اتصال به وضعیت (state)
            onChange={handleChange} // مدیریت تغییرات
            placeholder="نام خود را وارد کنید" // Placeholder
            required // فیلد اجباری
          />
        </div>

        {/* ایمیل (معمولاً فقط قابل نمایش و نه ویرایش مستقیم) */}
        <div className="form-group mb-3">
          <label htmlFor="email">ایمیل:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={user.email} // نمایش ایمیل اصلی کاربر
            readOnly // فقط خواندنی
            disabled // غیرفعال کردن اینپوت
          />
          <small className="form-text text-muted">
            ایمیل قابل ویرایش نیست.
          </small>{" "}
          {/* پیام راهنما */}
        </div>

        {/* شماره تماس */}
        <div className="form-group mb-3">
          <label htmlFor="phone">شماره تماس:</label>
          <input
            type="tel" // یا text
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="شماره تماس خود را وارد کنید (مثال: 09121234567)"
            // required={false} // اگر فیلد اختیاری است
          />
        </div>

        {/* کد ملی */}
        <div className="form-group mb-3">
          <label htmlFor="nationalId">کد ملی:</label>
          <input
            type="text"
            className="form-control"
            id="nationalId"
            name="nationalId"
            value={formData.nationalId}
            onChange={handleChange}
            placeholder="کد ملی خود را وارد کنید"
            // required={false}
          />
        </div>

        {/* رمز عبور جدید (اختیاری) */}
        <div className="form-group mb-4">
          {" "}
          {/* فاصله بیشتر قبل از دکمه */}
          <label htmlFor="password">رمز عبور جدید:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password} // همیشه خالی نگه داشته می‌شود برای ورودی جدید
            onChange={handleChange}
            placeholder="برای تغییر رمز عبور، رمز جدید را وارد کنید"
            // **تذکر امنیتی:** اضافه کردن فیلد تایید رمز عبور جدید و فیلد رمز عبور فعلی برای امنیت بیشتر توصیه می‌شود.
          />
          <small className="form-text text-muted">
            برای تغییر رمز عبور، فیلد بالا را پر کنید. در غیر این صورت، آن را
            خالی بگذارید.
          </small>
        </div>

        {/* دکمه ذخیره */}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "در حال ذخیره..." : "ذخیره اطلاعات"}
        </button>
      </form>
    </div>
  );
};

export default EditInfo;
