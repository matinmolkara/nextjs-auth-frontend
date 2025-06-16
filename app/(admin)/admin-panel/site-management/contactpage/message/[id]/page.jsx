"use client";
import React, { useEffect, useState } from "react";
import { getContactMessageById } from "@/app/api/api";
import { useParams } from "next/navigation";
import { format } from "date-fns-jalali";

import Link from "next/link";


const ContactMessageDetailPage = () => {
  const { id } = useParams();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchMessage = async () => {
      const data = await getContactMessageById(id);
      setMessage(data);
    };
    fetchMessage();
  }, [id]);

  if (!message) return <div>در حال بارگذاری...</div>;

  const formattedDate = format(
    new Date(message.created_at),
    "yyyy/MM/dd HH:mm"
  );







  return (
    <div className="bg-light min-vh-100 p-4 p-sm-6 p-lg-8 font-sans" dir="rtl">
      <div className="container">
        <div className="d-flex align-items-center mb-6 gap-3">
          <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-circle">
            <i className="bi bi-envelope-fill fs-4"></i>
          </div>
          <div>
            <h1 className="h3 fw-bold text-dark">جزئیات پیام دریافتی</h1>
            <p className="text-muted">
              نمایش اطلاعات کامل پیام ارسال شده توسط کاربر.
            </p>
          </div>
          <div className="ms-auto">
            <Link href="/admin-panel/site-management/contactpage" className="btn btn-outline-dark">
              <i className="bi bi-card-list"></i> بازگشت به لیست پیام ها
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-4 shadow overflow-hidden">
          <div className="p-4 p-sm-5">
            <div className="row row-cols-1 row-cols-md-2 g-4 border-bottom border-muted pb-4 mb-4">
              <div className="d-flex align-items-center">
                <i className="bi bi-person-fill text-muted me-3 fs-5"></i>
                <div>
                  <p className="small text-muted mb-1">نام و نام خانوادگی</p>
                  <p className="fw-semibold text-dark h6 mb-0">
                    {message.full_name}
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-center">
                <i className="bi bi-envelope-fill text-muted me-3 fs-5"></i>
                <div>
                  <p className="small text-muted mb-1">آدرس ایمیل</p>
                  <p className="fw-semibold text-dark h6 mb-0">
                    {message.email}
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-center">
                <i className="bi bi-telephone-fill text-muted me-3 fs-5"></i>
                <div>
                  <p className="small text-muted mb-1">شماره تماس</p>
                  <p className="fw-semibold text-dark h6 mb-0">
                    {message.phone || "ثبت نشده"}
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-center">
                <i className="bi bi-calendar-fill text-muted me-3 fs-5"></i>
                <div>
                  <p className="small text-muted mb-1">تاریخ ارسال</p>
                  <p className="fw-semibold text-dark h6 mb-0">
                    {formattedDate}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="h5 fw-bold text-dark mb-4">متن پیام</h3>
              <div className="bg-light rounded-3 p-4">
                <p className="text-dark lh-lg mb-0">{message.message}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMessageDetailPage;
