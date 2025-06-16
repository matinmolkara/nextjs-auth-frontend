// components/checkout/CheckoutRedirectButton.jsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { useCartContext } from "@/context/cartContext";

const CheckoutRedirectButton = ({ nextStep = "/checkout/payment" }) => {
  const router = useRouter();
  const { user } = useAuth();
  const { cartItems } = useCartContext();

  const handleClick = () => {
    if (!user) return router.push("/users/login");
    if (!cartItems?.length) return alert("سبد خرید شما خالی است.");
    router.push(nextStep);
  };

  return (
    <button onClick={handleClick} className="btn btn-success w-100">
      ادامه فرایند خرید
    </button>
  );
};

export default CheckoutRedirectButton;
