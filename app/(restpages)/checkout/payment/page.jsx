"use client";
import React, { useContext, useEffect, useState } from "react";
import { useCartContext } from "@/context/cartContext";
import { ProductContext } from "@/context/ProductContext";
import CartItemPreview from "@/components/shipping/CartItemPreview";
import SummaryBox from "@/components/checkout/SummaryBox";
import styles from "../../../../styles/components/Address.module.css";
import { useRouter } from "next/navigation";

const PaymentPage = () => {
  const router = useRouter();
  const { cartItems, removeFromCart, isCartLoading } = useCartContext();
  const { discountValue, calculateShippingPrice, addresses } =
    useContext(ProductContext);

  const [paymentMethod, setPaymentMethod] = useState("cod"); // روش پیش‌فرض: پرداخت در محل
const [selectedShippingMethod, setSelectedShippingMethod] =
  useState("standard");
  useEffect(() => {
    if (isCartLoading) return;
    if (!cartItems?.length) {
      router.push("/checkout/cart");
    }
    if (!addresses.some((addr) => addr.is_default)) {
      router.push("/checkout/shipping");
    }
  }, [cartItems, isCartLoading, addresses, router]);

  const selectedProvinceId = addresses.find((a) => a.is_default)?.province_id;
  const shippingPrice = calculateShippingPrice(selectedProvinceId);

  return (
    <div>
      <div className="container mt-4">
        <div className="row">
          {/* لیست محصولات در سبد */}
          <div className="col-12 col-xl-6">
            {/* انتخاب روش پرداخت */}
            <div className="mt-4 border rounded p-3">
              <h5>انتخاب روش پرداخت</h5>
              <div className="form-check mt-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  id="cod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label className="form-check-label" htmlFor="cod">
                  پرداخت در محل
                </label>
              </div>
              <div className="form-check mt-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  id="online"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label className="form-check-label" htmlFor="online">
                  پرداخت آنلاین (درگاه بانکی)
                </label>
              </div>
            </div>
            <div className={styles.eventTable}>
              <p>
                <i className="bi bi-basket"></i>
                بررسی نهایی سبد خرید
              </p>
              <div className={styles.inviteContentTable}>
                <div
                  className={`${styles.inviteContentTable0} table-responsive`}
                >
                  <table className="table">
                    <thead>
                      <tr>
                        <th>محصول</th>
                        <th>قیمت</th>
                        <th>حذف</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((product) => (
                        <CartItemPreview
                          key={product.id}
                          product={product}
                          onRemove={() => removeFromCart(product.id)}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* باکس خلاصه پرداخت */}
          <div className="col-12 col-xl-6 d-flex justify-content-center justify-content-xl-end mt-5">
            <SummaryBox
              shippingPrice={shippingPrice}
              discountValue={discountValue}
              step="submit"
              paymentMethod={paymentMethod}
              selectedShippingMethod={selectedShippingMethod}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
