"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useCartContext } from "@/context/cartContext";

const CartPreview = () => {
  const { cartItems } = useCartContext();

  if (!cartItems || cartItems.length === 0) {
    return <p className="text-center mt-3">سبد خرید شما خالی است.</p>;
  }

  return (
    <div>
      <div className="row">
        <div className="col-10">
          <h6 className="bg-head border">سبد خرید</h6>
          <ul className="list-unstyled">
            {cartItems.slice(0, 3).map((item) => (
              <li
                key={`${item.product_id}-${item.color?.name}-${item.size}`}
                className="d-flex align-items-center mb-2"
              >
                <Image
                  src={item.image_urls?.[0]}
                  alt={item.title}
                  width="40"
                  height="40"
                  className="rounded me-2"
                />
                <div>
                  <p className="mb-0">{item.title}</p>
                  <small>تعداد: {item.quantity}</small>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-2 d-flex flex-column align-items-center justify-content-center">
          <i className="bi bi-bag"></i>
          <Link href="/checkout/cart">
            <span className="head-size">رفتن به سبد خرید</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPreview;
