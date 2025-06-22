import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation"; // Import useSearchParams

const OrderNav = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="middle-list-holder">
        <div className="middle-second-list-holder">
          <ul className="nav">
            <li className={`nav-item ${status === null ? "active" : ""}`}>
              <Link className="nav-link" href="/profile/orders">
                <Image
                  src="/images/order/all-orders.svg"
                  alt="img"
                  width="50"
                  height="50"
                />
                همه سفارش ها
              </Link>
            </li>
            <li
              className={`nav-item ${status === "delivered" ? "active" : ""}`}
            >
              <Link
                className="nav-link"
                href="/profile/orders?status=delivered"
              >
                <Image
                  alt="img"
                  width="50"
                  height="50"
                  src="/images/order/delivered.svg"
                />
                تحویل داده شده
              </Link>
            </li>
            <li className={`nav-item ${status === "canceled" ? "active" : ""}`}>
              <Link className="nav-link" href="/profile/orders?status=canceled">
                <Image
                  alt="img"
                  width="50"
                  height="50"
                  src="/images/order/canceled.svg"
                />
                لغو شده
              </Link>
            </li>
            <li className={`nav-item ${status === "shipped" ? "active" : ""}`}>
              <Link className="nav-link" href="/profile/orders?status=shipped">
                <Image
                  alt="img"
                  width="50"
                  height="50"
                  src="/images/order/all-orders.svg"
                />
                ارسال شده
              </Link>
            </li>
            <li
              className={`nav-item ${status === "processing" ? "active" : ""}`}
            >
              <Link
                className="nav-link"
                href="/profile/orders?status=processing"
              >
                <Image
                  alt="img"
                  width="50"
                  height="50"
                  src="/images/order/inprocess.svg"
                />
                در دست بررسی
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Suspense>
  );
};

export default OrderNav;
