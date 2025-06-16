"use client";
import React, { useState } from "react";
import { sendContactMessage } from "@/app/api/api";
import Image from "next/image";

const Contact = () => {
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    try {
      await sendContactMessage(form);
      setSuccess("پیام شما با موفقیت ارسال شد ✅");
      setForm({ full_name: "", phone: "", email: "", message: "" });
    } catch (err) {
      setError("❌ خطا در ارسال پیام. دوباره تلاش کنید.");
    }
  };

  return (
    <section className="container">
      <div className="row">
        <div className="col-6">
          <div className="contact-us-1">
            <form className="row g-3" onSubmit={handleSubmit}>
              {success && <div className="alert alert-success">{success}</div>}
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="col-12">
                <label htmlFor="inputText1" className="form-label">
                  نام و نام خانوادگی:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputText1"
                  placeholder="نام کامل خود را وارد کنید"
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputText2" className="form-label">
                  شماره تماس:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputText2"
                  placeholder="شماره تماس خود را وارد کنید"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputEmail" className="form-label">
                  ایمیل:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail"
                  placeholder="ایمیل خود را وارد کنید"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <label htmlFor="Textarea1" className="form-label">
                  پیام
                </label>
                <textarea
                  className="form-control"
                  id="Textarea1"
                  rows="3"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="col-12">
                <button type="submit" className="btn">
                  ارسال پیام
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-6">
          <div className="contact-us-0-0">
            <h3>در ارتباط باشید</h3>

            <div className="contact-us-0-0-0">
              <span>📞 +988438355909</span>
            </div>
            <div className="contact-us-0-0-0">
              <span>✉️ walmart@info.net</span>
            </div>
            <div className="contact-us-0-0-1">
              📍 تهران ، خیابان آرژانتین بهار چهاردهم پلاک ۴۴
            </div>
            <Image
              src="/images/contact/haircomplete.png"
              width="400"
              height="400"
              alt="phonecall"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
