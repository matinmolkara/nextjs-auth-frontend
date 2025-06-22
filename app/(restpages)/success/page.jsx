// file: app/checkout/success/page.jsx
"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import React,{Suspense, useEffect} from "react";
import { useCartContext } from "@/context/cartContext";
const SuccessPage = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
const { clearCart } = useCartContext();

useEffect(() => {
  if (orderId) {
    clearCart(); // ✅ فقط اگر orderId موجود باشد، سبد خرید را پاک کن
  }
}, [orderId]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container text-center mt-5">
        <h2 className="text-success">سفارش شما با موفقیت ثبت شد 🎉</h2>
        <p className="mt-3">
          شماره سفارش شما:
          <strong className="mx-2">{orderId || "نامشخص"}</strong>
        </p>
        <p className="mt-2">
          می‌توانید وضعیت سفارش را از پنل کاربری پیگیری کنید.
        </p>
        <Link href="/" className="btn btn-primary mt-4">
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </Suspense>
  );
};

export default SuccessPage;
