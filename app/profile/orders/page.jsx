"use client"
export const dynamic = "force-dynamic";
import React, { useContext, useState, useEffect, Suspense } from "react";
import Dashboard from "@/components/profile/Dashboard";
import styles from "../../../styles/components/profile.module.css";
import OrderNav from "@/components/profile/OrderNav";
import { useSearchParams } from "next/navigation";
import { ProductContext } from "@/context/ProductContext"; // Import ProductContext
import OrderCart from "@/components/profile/OrderCart"; // Import OrderCart component
const Page = () => {
  const { orders, fetchUserOrders } = useContext(ProductContext); // Access orders and fetch function
  
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
 
  const [filteredOrders, setFilteredOrders] = useState([]);
  useEffect(() => {
    fetchUserOrders(); // برای گرفتن داده به‌روز

    // وقتی orders یا status تغییر کنه، لیست فیلتر شده رو تنظیم کن
  }, [status]); // یا اگر بخوای realtime باشه [orders, status]

  useEffect(() => {
    if (orders) {
     
      if (status) {
        const filtered = orders.filter(
          (order) =>
            typeof order.order_status === "string" &&
            order.order_status.toLowerCase() === status.toLowerCase()
        );
        setFilteredOrders(filtered);
      } else {
        setFilteredOrders(orders); // Show all orders if no status filter
      }
    }
  }, [orders, status]);

  if (!orders) {
    return <div>در حال بارگیری سفارشات...</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container">
        <div className={styles.profileContainer}>
          <div className="col-12 col-lg-3">
            <div className={styles.dashboardSection}>
              <Dashboard />
            </div>
          </div>
          <div className="col-12 col-lg-9">
            <div className={styles.contentArea}>
              <div className="w-100">
                <h5 className="bg-head border-bottom ">سفارشات</h5>
                <OrderNav />
              </div>
              <div className="w-100">
                {filteredOrders.length > 0 ? (
                  <div>
                    {filteredOrders.map((order) => (
                      <OrderCart key={order.order_id} order={order} />
                    ))}
                  </div>
                ) : (
                  <div>هیچ سفارشی با این وضعیت یافت نشد.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Page;
