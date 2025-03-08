"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
const CartPreview = () => {
  const [cart, setCart] = useState([
    { id: 101, title: "هدفون بی‌سیم", thumbnail: "/images/brands/1.png" },
  ]);
  return (
    <div>
      {cart.length > 0 && (
        <div className="row">
          <div className="col-10">
            <h6 className="bg-head border">سبد خرید</h6>
            <ul className="list-unstyled">
              {cart.map((item) => (
                <li key={item.id} className="d-flex align-items-center mb-2">
                  <Image
                    src="/images/brands/1.png"
                    alt={item.title}
                    width="40"
                    height="40"
                    className="rounded me-2"
                  />
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-2">
            <i className="bi bi-bag"></i>
            <Link href="/checkout/cart">
              <span className="head-size">رفتن به سبد خرید</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPreview;
