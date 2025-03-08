"use client"
import React, { useState } from "react";
import Link from "next/link";
const LastOrders = () => {


  // لیست آخرین سفارشات کاربر (مثال)
  const [orders, setOrders] = useState([
    { id: 1, title: "گوشی آیفون 13", date: "1402/12/10" },
    { id: 2, title: "لپ‌تاپ ایسوس", date: "1402/11/25" },
  ]);

  // سبد خرید (مثال)

  return (
    <div>
      {/* آخرین سفارشات */}
      <div className="mb-4">
        <div className="row">
          <div className="col-10">
            <h6 className="bg-head border">آخرین سفارشات</h6>
            <ul className="list-unstyled">
              {orders.map((order) => (
                <li key={order.id} className="pb-2 mb-2">
                  {order.title} - <small>{order.date}</small>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-2">
            <i className="bi bi-eye"></i>
            <Link href="/profile/orders">
              <span className="head-size">جزییات سفارش ها</span>
            </Link>
          </div>
        </div>
      </div>

      {/* سبد خرید */}
    </div>
  );
};

export default LastOrders;
