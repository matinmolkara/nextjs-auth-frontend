// app/(admin)/orders/page.jsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { getAdminOrders, deleteOrder } from "@/app/api/api";
const OrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  useEffect(() => {
    fetchOrders();
  }, [search, paymentFilter, dateFilter, currentPage]);

  const fetchOrders = async () => {
    try {
      const res = await getAdminOrders({
        search,
        paymentStatus: paymentFilter,
        date: dateFilter,
        page: currentPage,
        pageSize,
      });
      
      setOrders(res.orders); // چون پاسخ API از نوع { success: true, orders: [...] } هست
    } catch (err) {
      console.error("خطا در دریافت سفارش‌ها:", err);
    }
  };
  const handleDelete = async (orderId) => {
    const confirmed = window.confirm("آیا از حذف این سفارش مطمئن هستید؟");
    if (!confirmed) return;

    try {
      await deleteOrder(orderId);
      alert("سفارش با موفقیت حذف شد.");
      fetchOrders(); // سفارش‌ها رو دوباره بگیر
    } catch (err) {
      alert("خطا در حذف سفارش.");
    }
  };
  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>مدیریت سفارش ها</h3>
        <Link href="/admin-panel/dashboard" className="btn btn-outline-dark">
          <i className="bi bi-house-door me-1"></i> بازگشت به داشبورد
        </Link>
      </div>

      {/* فیلترها و جستجو */}
      <div className="row g-3 mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="جستجو براساس نام مشتری"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
          >
            <option value="">همه وضعیت‌ها</option>
            <option value="پرداخت شده">پرداخت شده</option>
            <option value="در انتظار پرداخت">در انتظار پرداخت</option>
            <option value="ناموفق">ناموفق</option>
          </select>
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="all">همه تاریخ‌ها</option>
            <option value="today">امروز</option>
            <option value="month">ماه اخیر</option>
            <option value="year">سال اخیر</option>
          </select>
        </div>
      </div>

      {/* جدول */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>شماره سفارش</th>
              <th>تاریخ</th>
              <th>نام مشتری</th>
              <th>مبلغ کل</th>
              <th>وضعیت پرداخت</th>
              <th>وضعیت ارسال</th>
              <th className="text-center">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  سفارشی یافت نشد
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.order_id}>
                  <td>{order.order_id}</td>
                  <td>
                    {new Date(order.order_date).toLocaleDateString("fa-IR")}
                  </td>
                  <td>{order.customer_name}</td>
                  <td>{order.total_amount.toLocaleString()} تومان</td>
                  <td>{order.payment_status}</td>
                  <td>{order.order_status}</td>
                  <td className="d-flex justify-content-center align-items-center">
                    <Link
                      href={`/admin-panel/orders/${order.order_id}`}
                      className="btn btn-sm btn-primary me-1"
                    >
                      مشاهده
                    </Link>
                    <Link
                      href={`/admin-panel/orders/${order.order_id}/edit`}
                      className="btn btn-sm btn-warning me-1"
                    >
                      ویرایش
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(order.order_id)}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* صفحه‌بندی */}
      <nav className="d-flex justify-content-center mt-4">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 && "disabled"}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              قبلی
            </button>
          </li>
          <li className="page-item">
            <span className="page-link">{currentPage}</span>
          </li>
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              بعدی
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default OrderListPage;
