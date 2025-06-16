"use client"
import React, { useContext,useState } from "react";
import { useCartContext } from "@/context/cartContext";
import CheckoutRedirectButton from "./CheckoutRedirectButton";
import CheckoutSubmitButton from "./CheckoutSubmitButton";
import styles from "../../styles/components/Cart.module.css";
const SummaryBox = ({
  shippingPrice,
  discountValue,
  nextStep = "/checkout/shipping",
  step = "redirect",
  paymentMethod,
  selectedShippingMethod, // روش ارسال انتخابی کاربر
  orderNotes,
}) => {
  const { cartItems, isCartLoading } = useCartContext(); // دریافت محصولات سبد خرید از Context



  const calculateTotal = () => {
    return cartItems.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };
  const calculateTax = (total) => total * 0.05;
  const calculateFinalPrice = () => {
    const total = calculateTotal();
    const tax = calculateTax(total);
    const discountedTotal = total - discountValue; // اعمال تخفیف
    return discountedTotal + tax + (shippingPrice || 0);
  };
  const formatPrice = (price) => {
    // بررسی مقدار عددی بودن
    if (typeof price !== "number" || isNaN(price)) {
      return "0 تومان";
    }
    return `${price.toLocaleString("fa-IR")} تومان`;
  };

  // نمایش وضعیت بارگذاری یا پیام سبد خالی
  if (isCartLoading) {
    return <div className={styles.payment}>در حال بارگذاری سبد خرید...</div>;
  }

  if (!cartItems || cartItems.length === 0) {
    return <div className={styles.payment}>سبد خرید خالی است.</div>;
  }

  return (
    <div>
      <div className={styles.payment}>
        <div className={styles.cartPayment}>
          <div className={styles.cartPaymentDetail}>
            <div className="d-flex justify-content-between mb-4">
              <span>جمع سبد خرید</span>
              <span>{formatPrice(calculateTotal())}</span>
            </div>
            <div className="d-flex justify-content-between mb-4">
              <span>هزینه ارسال</span>
              <span>
                {typeof shippingPrice === "number"
                  ? formatPrice(shippingPrice)
                  : "محاسبه پس از انتخاب آدرس"}
              </span>
            </div>
            <div className="d-flex justify-content-between mb-4">
              <span>مالیات با ارزش افزوده</span>
              <span>{formatPrice(calculateTax(calculateTotal()))}</span>
            </div>
            <div className="d-flex justify-content-between mb-4">
              <span>تخفیف:</span>
              <span>{discountValue}</span>
            </div>
          </div>
          <div
            className={`d-flex justify-content-between mb-4 ${styles.cartPaymentTotal}`}
          >
            <span>
              <h4>جمع کل</h4>
            </span>
            <h4>{formatPrice(calculateFinalPrice())}</h4>
          </div>
          {step === "submit" ? (
            <CheckoutSubmitButton
              paymentMethod={paymentMethod}
              selectedShippingMethod={selectedShippingMethod} // ارسال پراپ جدید
              calculatedShippingCost={shippingPrice} // ارسال هزینه ارسال به نام جدید در SubmitButton
              orderNotes={orderNotes}
            />
          ) : (
            <CheckoutRedirectButton nextStep={nextStep} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SummaryBox;
