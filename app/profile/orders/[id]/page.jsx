"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getOrderById } from "@/app/api/api"; // فرض وجود این تابع API

const OrderDetailPage = () => {
  const { id } = useParams(); // دریافت id سفارش از URL
  const [orderDetail, setOrderDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        setLoading(true);
        const data = await getOrderById(id);
        setOrderDetail(data.data); // فرض کنید جزئیات سفارش در data.data برگردانده می‌شود
        setLoading(false);
      } catch (err) {
        setError(err.message || "خطا در دریافت جزئیات سفارش");
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [id]);

  if (loading) {
    return <div>در حال بارگیری جزئیات سفارش...</div>;
  }

  if (error) {
    return <div>خطا: {error}</div>;
  }

  if (!orderDetail) {
    return <div>سفارش یافت نشد.</div>;
  }

  return (
    <div>
      <h1>جزئیات سفارش #{orderDetail.order_id}</h1>
      <p>تاریخ خرید: {new Date(orderDetail.created_at).toLocaleString()}</p>
      <p>نحوه پرداخت: {orderDetail.payment_method}</p>
      <p>مبلغ کل: {orderDetail.total_amount}</p>
      {orderDetail.shippingAddress && (
        <div>
          <h3>آدرس ارسال</h3>
          <p>{orderDetail.shippingAddress}</p>
        </div>
      )}
      {/* نمایش لیست محصولات سفارش داده شده */}
      {orderDetail.items && orderDetail.items.length > 0 && (
        <div>
          <h3>محصولات سفارش داده شده:</h3>
          <ul>
            {orderDetail.items.map((item) => (
              <li key={item.id}>
                {item.product_name} - تعداد: {item.quantity} - قیمت واحد:{" "}
                {item.unit_price}
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* نمایش سایر جزئیات مورد نظر */}
    </div>
  );
};

export default OrderDetailPage;
