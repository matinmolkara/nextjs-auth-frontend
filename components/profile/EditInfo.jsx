"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/authContext"; 
import axios from "axios";



const EditInfo = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const { user, fetchUser } = useAuth(); 
  const [formData, setFormData] = useState({
  
    name: "",
    phone: "",
    national_id: "",
    password: "", 
  });
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [success, setSuccess] = useState(false); 

const [isNationalIdSetInitially, setIsNationalIdSetInitially] = useState(false);
useEffect(() => {
  if (!user) return;

  const { name = "", phone = "", national_id = "" } = user;

  setFormData({
    name: name ?? "",
    phone: phone ?? "",
    national_id:national_id || "",
    password: "",
  });
    const nationalIdValue = (national_id || "").trim();

    setIsNationalIdSetInitially(nationalIdValue !== "");
  
}, [user]);

  

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setError(null);
    setSuccess(false);

   
    if (name === "national_id") {
      
      if (isNationalIdSetInitially) {
        console.warn("Attempted to change readOnly national_id field");
        return;
      }


      const numericValue = value.replace(/\D/g, ""); 

      
      const limitedValue = numericValue.slice(0, 10);

      setFormData((prevState) => ({
        ...prevState,
        [name]: limitedValue, 
      }));
    } else {
      
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    if (!user) {
      setError("اطلاعات کاربر در دسترس نیست.");
      setLoading(false);
      return;
    }

    const dataToUpdate = {
      name: formData.name,
      phone: formData.phone,
    };
   
    if (!isNationalIdSetInitially) {
      const nationalIdValue = formData.national_id.trim(); 

      if (nationalIdValue) {
       
        if (!/^\d{10}$/.test(nationalIdValue)) {
          setError("کد ملی باید دقیقاً ۱۰ رقم عددی باشد.");
          setLoading(false);
          return; 
        }
        
        dataToUpdate.national_id = nationalIdValue;
      }
      
    }
    

    if (formData.password) {
      dataToUpdate.password = formData.password;
    }

    try {
      const res = await axios.put(
        `${BASE_URL}/auth/update-profile`,
        dataToUpdate,
        { withCredentials: true }
      );

      await fetchUser();
      setSuccess(true);
      setError(null);
       if (!isNationalIdSetInitially && dataToUpdate.national_id) {
         setIsNationalIdSetInitially(true);
       }
    } catch (err) {
      console.error(
        "Error updating user:",
        err.response ? err.response.data : err.message
      );
      setError("خطا در به‌روزرسانی اطلاعات. لطفا دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };


  if (!user) {
    return <div>در حال بارگذاری اطلاعات پروفایل...</div>; 
  }

  return (
    <div className="mb-4">
      <h5 className="bg-head border-bottom mb-3">ویرایش پروفایل</h5>

      {error && <div className="alert alert-danger">{error}</div>}

      {success && (
        <div className="alert alert-success">
          اطلاعات با موفقیت به‌روزرسانی شد.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="name">نام:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="نام خود را وارد کنید"
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="email">ایمیل:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={user.email}
            readOnly
            disabled
          />
          <small className="form-text text-muted">
            ایمیل قابل ویرایش نیست.
          </small>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="phone">شماره تماس:</label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
            placeholder="شماره تماس خود را وارد کنید (مثال: 09121234567)"
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="national_id">کد ملی:</label>
          <input
            type="text"
            className={`form-control ${
              isNationalIdSetInitially ? "bg-light" : ""
            }`}
            id="national_id"
            name="national_id"
            value={formData.national_id}
            onChange={handleChange}
            placeholder={
              isNationalIdSetInitially
                ? "کد ملی شما ثبت شده"
                : "کد ملی خود را وارد کنید (۱۰ رقم عددی)"
            }
            maxLength={10} // محدود کردن حداکثر طول در HTML
            readOnly={isNationalIdSetInitially}
            disabled={isNationalIdSetInitially}
            inputMode="numeric"
          />
          {isNationalIdSetInitially ? (
            <small className="form-text text-muted">
              کد ملی شما ثبت شده و قابل ویرایش نیست.
            </small>
          ) : (
            <small className="form-text text-muted">
              کد ملی باید دقیقاً ۱۰ رقم عددی باشد و پس از ثبت قابل تغییر نخواهد
              بود.
            </small>
          )}
        </div>

        <div className="form-group mb-4">
          <label htmlFor="password">رمز عبور جدید:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="برای تغییر رمز عبور، رمز جدید را وارد کنید"
          />
          <small className="form-text text-muted">
            برای تغییر رمز عبور، فیلد بالا را پر کنید. در غیر این صورت، آن را
            خالی بگذارید.
          </small>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "در حال ذخیره..." : "ذخیره اطلاعات"}
        </button>
      </form>
    </div>
  );
};

export default EditInfo;
