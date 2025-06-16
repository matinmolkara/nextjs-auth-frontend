"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getUserOrders } from "@/app/api/api";
const LastOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getUserOrders();

        if (Array.isArray(response?.data)) {
          const lastTwoOrders = response.data.slice(0, 2);
          setOrders(lastTwoOrders);
        } else {
          console.error(
            "Expected response.data to be an array, but received:",
            response?.data
          );
          setOrders([]);
        }
      } catch (error) {
        setError(err.message || "خطا در دریافت سفارشات");
        setOrders([]); // در صورت خطا، لیست را خالی می‌کنیم
      } finally {
        // این بلاک همیشه اجرا می‌شود، چه موفقیت‌آمیز باشد چه خطا رخ دهد
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // تابعی برای فرمت‌دهی تاریخ
  const formatOrderDate = (dateString) => {
    if (!dateString) {
      return "تاریخ نامشخص";
    }

    try {
      const date = new Date(dateString);

      // بررسی معتبر بودن تاریخ
      if (isNaN(date.getTime())) {
        return "تاریخ نامعتبر";
      }

      // استفاده از Intl.DateTimeFormat برای فرمت‌دهی بومی‌شده (فارسی)
      // می‌توانید گزینه‌های فرمت‌دهی را طبق نیاز خود تغییر دهید
      const options = {
        year: "numeric",
        month: "long", // یا 'numeric', '2-digit', 'short'
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // برای نمایش ساعت ۲۴ ساعته
        // اگر تاریخ سرور به وقت UTC است، ممکن است نیاز به تنظیم timeZone داشته باشید
        // timeZone: 'UTC'
      };

      // 'fa-IR' برای زبان فارسی در ایران
      const formatter = new Intl.DateTimeFormat("fa-IR", options);

      return formatter.format(date);
    } catch (error) {
      console.error("Error formatting date:", error);
      return "خطا در نمایش تاریخ"; // در صورت بروز خطا در فرمت‌دهی
    }
  };

  return (
    <div>
      <div className="mb-4">
        <div className="row">
          <div className="col-10">
            <h6 className="bg-head border">آخرین سفارشات</h6>
            {loading && <p>در حال بارگذاری سفارشات...</p>}
            {error && <p className="text-danger">خطا: {error}</p>}
            {!loading && !error && (
              <ul className="list-unstyled mt-2">
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <li
                      key={order.order_id}
                      className="pb-2 mb-2 border-bottom"
                    >
                      {order.order_status || `سفارش #${order.order_id}`} -{" "}
                      <small>{formatOrderDate(order.order_date)}</small>
                    </li>
                  ))
                ) : (
                  <li>هنوز سفارشی ثبت نکرده‌اید.</li>
                )}
              </ul>
            )}
          </div>
          <div className="col-2 text-end">
            <Link
              href="/profile/orders"
              className="head-size text-decoration-none"
            >
              <i className="bi bi-eye ms-1"></i> جزئیات
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastOrders;
