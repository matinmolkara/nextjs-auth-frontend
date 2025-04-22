"use client"
import React, { useContext, useState, useEffect } from "react";
import Dashboard from "@/components/profile/Dashboard";
import styles from "../../../styles/components/profile.module.css";
import OrderNav from "@/components/profile/OrderNav";
import { useSearchParams } from "next/navigation";
import { ProductContext } from "@/context/ProductContext"; // Import ProductContext
import OrderCart from "@/components/profile/OrderCart"; // Import OrderCart component
const Page = () => {
  const { orders, fetchUserOrders } = useContext(ProductContext); // Access orders and fetch function
  const searchParams = useSearchParams();
  const statusFilter = searchParams.get("status");
  const [filteredOrders, setFilteredOrders] = useState([]);
  

useEffect(() => {
  // Fetch orders if they are not already loaded
  if (!orders.length) {
    fetchUserOrders();
  }
}, [orders.length, fetchUserOrders]);

useEffect(() => {
  if (orders) {
    if (statusFilter) {
      const filtered = orders.filter(
        (order) =>
          order.order_status.toLowerCase() === statusFilter.toLowerCase()
      );
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders); // Show all orders if no status filter
    }
  }
}, [orders, statusFilter]);

if (!orders) {
  return <div>در حال بارگیری سفارشات...</div>;
}




  return (
    <div>
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
    </div>
  );
};

export default Page;
