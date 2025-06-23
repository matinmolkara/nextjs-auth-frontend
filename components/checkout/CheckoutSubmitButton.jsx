"use client";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { ProductContext } from "@/context/ProductContext";
import { useCartContext } from "@/context/cartContext";

const CheckoutSubmitButton = ({
  paymentMethod,
  selectedShippingMethod,
  calculatedShippingCost,
  orderNotes,
}) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const { addresses } = useContext(ProductContext);
  const { cartId, clearCart, isCartLoading } = useCartContext(); // cartItems حذف شد چون استفاده نمی‌شه

  const handleCheckout = async () => {
    const defaultAddress = addresses.find((a) => a.is_default);
    if (!defaultAddress) {
      alert("آدرس پیش‌فرض انتخاب نشده است.");
      return;
    }

    if (!selectedShippingMethod) {
      alert("لطفاً روش ارسال را انتخاب کنید.");
      return;
    }

    if (
      calculatedShippingCost === undefined ||
      calculatedShippingCost === null ||
      isNaN(parseFloat(calculatedShippingCost))
    ) {
      alert("هزینه ارسال نامعتبر است.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/orders`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartId: cartId,
          paymentMethod,
          shippingAddress: defaultAddress,
          billingAddress: defaultAddress,
          shippingMethod: selectedShippingMethod,
          shippingCost: parseFloat(calculatedShippingCost),
          notes: orderNotes,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        if (paymentMethod === "online") {
          const gatewayRes = await fetch(
            `${BASE_URL}/api/payments/initiate`,
            {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderId: result.data.order_id }),
            }
          );
          const gateway = await gatewayRes.json();
          await clearCart?.();
          return (window.location.href = gateway.gatewayUrl);
        } else {
          router.push(`/success?orderId=${result.data.order_id}`);
          // await clearCart?.();
          
        }
      } else {
        alert(result.message || "خطا در ثبت سفارش.");
      }
    } catch (error) {
      console.error("خطا در ثبت سفارش:", error);
      alert("خطا در ثبت سفارش.");
    }
  };




  const isButtonDisabled =
    !addresses.find((a) => a.is_default) ||
    !selectedShippingMethod ||
    calculatedShippingCost === undefined ||
    calculatedShippingCost === null ||
    isNaN(parseFloat(calculatedShippingCost));





  return (
    <button
      onClick={handleCheckout}
      className="btn btn-success w-100 mt-4"
      disabled={isButtonDisabled}
    >
      {isCartLoading ? "در حال بارگذاری سبد خرید..." : "تایید و پرداخت"}
    </button>
  );
};

export default CheckoutSubmitButton;
