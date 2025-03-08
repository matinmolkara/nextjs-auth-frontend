"use client"
import React, { useContext,useState } from "react";
import { ProductContext } from "@/context/ProductContext";
import CheckoutButton from "./CheckoutButton";
import styles from "../../styles/components/Cart.module.css";
const SummaryBox = ({ shippingPrice, discountValue }) => {
  const { cartProducts } = useContext(ProductContext); // دریافت محصولات سبد خرید از Context
  
  const calculateTotal = () => {
    return cartProducts.reduce(
      (total, product) => total + product.price * product.count,
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
                {shippingPrice
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
          <CheckoutButton />
        </div>
      </div>
    </div>
  );
};

export default SummaryBox;
