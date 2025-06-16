// file: app/checkout/verify/page.jsx
"use client";
import React, { useContext, useEffect } from "react";
import { ProductContext } from "@/context/ProductContext";
import { useCartContext } from "@/context/cartContext";
import { useRouter } from "next/navigation";
import styles from "../../../../styles/components/Address.module.css";

const OrderVerifyPage = () => {
  const { cartItems, clearCart } = useCartContext();
  const { addresses } = useContext(ProductContext);
  const router = useRouter();

  const selectedAddress = addresses.find((a) => a.is_default);

  useEffect(() => {
    if (!cartItems?.length) {
      router.push("/checkout/cart");
    }
    if (!selectedAddress) {
      router.push("/checkout/shipping");
    }
  }, [cartItems, selectedAddress, router]);

  const handlePlaceOrder = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address_id: selectedAddress.id,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        clearCart();
        router.push(`/checkout/success?orderId=${data.orderId}`);
      } else {
        alert("خطا در ثبت سفارش: " + (data.message || ""));
      }
    } catch (error) {
      console.error("خطای سفارش:", error);
      alert("سفارش ثبت نشد. لطفاً دوباره تلاش کنید.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className={styles.eventTable}>
            <h4 className="mb-3">تایید نهایی سفارش</h4>
            <p>سفارش شما با آدرس زیر ارسال خواهد شد:</p>
            <div className="border rounded p-3 mb-3">
              <p>
                گیرنده: {selectedAddress?.reciever}
                <br />
                آدرس: {selectedAddress?.full_address}، پلاک{" "}
                {selectedAddress?.building_num}، واحد{" "}
                {selectedAddress?.unit_num}
                <br />
                کدپستی: {selectedAddress?.zip_code}
                <br />
                تلفن: {selectedAddress?.tel}
              </p>
            </div>
            <button
              className="btn btn-success w-100"
              onClick={handlePlaceOrder}
            >
              ثبت سفارش
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderVerifyPage;
