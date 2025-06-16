// app/(admin)/orders/[orderId]/edit/page.jsx
"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getOrderById, updateOrderStatus } from "@/app/api/api";
import axios from "axios";
import Link from "next/link";
const OrderEditPage = () => {
  const { orderId } = useParams();
  const router = useRouter();

  const [order, setOrder] = useState(null);
  const [form, setForm] = useState({
    payment_status: "",
    order_status: "",
    notes: "",
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const data = await getOrderById(orderId); // فراخوانی از api.js
      const orderData = data.data || data; // بسته به ساختار پاسخ سرور

      setOrder(orderData);
      setForm({
        payment_status: orderData.payment_status || "",
        order_status: orderData.order_status || "",
        notes: orderData.notes || "",
      });
    } catch (err) {
      console.error("خطا در دریافت سفارش:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await updateOrderStatus(
          orderId,
          {
            paymentStatus: form.payment_status,
            orderStatus: form.order_status,
            notes: form.notes,
          },
          { withCredentials: true }
        );

      alert("سفارش با موفقیت به‌روزرسانی شد.");
      router.push(`/admin-panel/orders/${orderId}`);
    } catch (err) {
      console.error("خطا در ذخیره:", err);
      alert("خطا در به‌روزرسانی سفارش.");
    }
  };

  if (loading) return <p className="text-center mt-5">در حال بارگذاری...</p>;
  if (!order || !form)
    return (
      <p className="text-center text-danger">
        سفارش پیدا نشد یا خطا در داده‌ها.
      </p>
    );

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-4">ویرایش سفارش #{order.order_id}</h3>
        <Link href="/admin-panel/orders" className="btn btn-outline-dark">
          <i class="bi bi-boxes"></i> بازگشت به لیست سفارشات
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">وضعیت پرداخت</label>
          <select
            className="form-select"
            value={form.payment_status}
            onChange={(e) =>
              setForm({ ...form, payment_status: e.target.value })
            }
          >
            <option value="پرداخت نشده">پرداخت نشده</option>
            <option value="پرداخت شده">پرداخت شده</option>
            <option value="در انتظار پرداخت">در انتظار پرداخت</option>
            <option value="ناموفق">ناموفق</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">وضعیت سفارش</label>
          <select
            className="form-select"
            value={form.order_status}
            onChange={(e) => setForm({ ...form, order_status: e.target.value })}
          >
            <option value="در حال پردازش">در حال پردازش</option>
            <option value="آماده ارسال">آماده ارسال</option>
            <option value="ارسال شده">ارسال شده</option>
            <option value="تحویل شده">تحویل شده</option>
            <option value="لغو شده">لغو شده</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">یادداشت</label>
          <textarea
            className="form-control"
            rows="3"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          ذخیره تغییرات
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => router.back()}
        >
          بازگشت
        </button>
      </form>
    </div>
  );
};

export default OrderEditPage;
