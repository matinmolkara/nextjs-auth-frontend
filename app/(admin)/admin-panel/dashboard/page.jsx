"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  getColors,
  getSizes,
  getProducts,
  getCategories,
  getBrands,
  getUserCount,
  getAdminOrders,
  getAllAttributes,
  getContactMessages,
} from "@/app/api/api";
import PageContentManager from "@/components/admin/dashboard/PageContentManager";
const DashboardTile = ({ title, description, icon, href, count }) => (
  <Link href={href} className="text-decoration-none text-dark">
    <div className="card rounded-4 shadow-sm h-100 border-0 hover-shadow transition">
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <div className="fs-1 mb-3">{icon}</div>
          <h5 className="fw-semibold">{title}</h5>
          <p className="text-muted small">{description}</p>
        </div>
        {typeof count === "number" && (
          <div className="mt-3">
            <span className="badge bg-primary-subtle text-primary fw-medium">
              {count} مورد
            </span>
          </div>
        )}
      </div>
    </div>
  </Link>
);

const AdminDashboardPage = () => {
  const [counts, setCounts] = useState({
    products: 0,
    categories: 0,
    colors: 0,
    sizes: 0,
    brands: 0,
    orders: 0,
    users: 0,
    attributes: 0,
    messages: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchCounts = async () => {
    const results = await Promise.allSettled([
      getProducts({ pageSize: 1000 }),
      getCategories({ pageSize: 1000 }),
      getColors(),
      getSizes(),
      getBrands(),
      getAdminOrders(),
      getUserCount(),
      getAllAttributes(),
      getContactMessages({ pageSize: 1000 }),
    ]);

    setCounts({
      products:
        results[0].status === "fulfilled"
          ? results[0].value.products.length
          : 0,
      categories:
        results[1].status === "fulfilled" &&
        Array.isArray(results[1].value.categories)
          ? results[1].value.categories.length
          : 0,
      colors: results[2].status === "fulfilled" ? results[2].value.length : 0,
      sizes: results[3].status === "fulfilled" ? results[3].value.length : 0,
      brands:
        results[4].status === "fulfilled" ? results[4].value.brands.length : 0,
      orders:
        results[5].status === "fulfilled" ? results[5].value.orders.length : 0,
      users: results[6].status === "fulfilled" ? results[6].value.total : 0,
      attributes:
        results[7].status === "fulfilled" ? results[7].value.length : 0,
      messages:
        results[8].status === "fulfilled"
          ? results[8].value.length
          : 0,
    });

    setLoading(false);
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <div className="container py-5">
      <div className="mb-4">
        <h2 className="fw-bold">مرکز کنترل فروشگاه</h2>
        <p className="text-muted">در یک نگاه، ابزارهای مدیریت را بررسی کنید.</p>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-md-3 col-sm-6">
            <DashboardTile
              title="لیست ویژگی‌ها"
              description="افزودن ویژگی جدید"
              icon="🧬"
              href="/admin-panel/attributes/attribute-keys-page"
              count={counts.attributes}
            />
          </div>
          <div className="col-md-3 col-sm-6">
            <DashboardTile
              title="مدیریت ویژگی‌ها"
              description="افزودن ویژگی به دسته‌بندی‌ها"
              icon="🎲"
              href="/admin-panel/attributes/category-attributes-page"
            />
          </div>
          <div className="col-md-3 col-sm-6">
            <DashboardTile
              title="محصولات"
              description="مدیریت و افزودن محصولات"
              icon="📦"
              href="/admin-panel/products"
              count={counts.products}
            />
          </div>
          <div className="col-md-3 col-sm-6">
            <DashboardTile
              title="دسته‌بندی‌ها"
              description="لیست و تنظیم دسته‌ها"
              icon="📁"
              href="/admin-panel/category"
              count={counts.categories}
            />
          </div>
          <div className="col-md-3 col-sm-6">
            <DashboardTile
              title="رنگ‌ها"
              description="مدیریت رنگ‌های موجود"
              icon="🎨"
              href="/admin-panel/color"
              count={counts.colors}
            />
          </div>
          <div className="col-md-3 col-sm-6">
            <DashboardTile
              title="سایزها"
              description="تنظیم سایزها برای محصولات"
              icon="📏"
              href="/admin-panel/size"
              count={counts.sizes}
            />
          </div>
          <div className="col-md-3 col-sm-6">
            <DashboardTile
              title="برندها"
              description="مدیریت برندهای محصولات"
              icon="🏷️"
              href="/admin-panel/brand"
              count={counts.brands}
            />
          </div>
          <div className="col-md-3 col-sm-6">
            <DashboardTile
              title="سفارشات"
              description="لیست و مدیریت سفارشات"
              icon="📦"
              href="/admin-panel/orders"
              count={counts.orders}
            />
          </div>
          <div className="col-md-3 col-sm-6">
            <DashboardTile
              title="کاربران"
              description="لیست و مدیریت کاربران"
              icon="👤"
              href="/admin-panel/usermanagement"
              count={counts.users}
            />
          </div>
          <div className="col-md-3 col-sm-6">
            <DashboardTile
              title="پیام‌های تماس"
              description="مدیریت پیام‌های دریافتی از صفحه تماس با ما"
              icon="📬"
              href="/admin-panel/site-management/contactpage"
              count={counts.messages}
            />
          </div>
        </div>
      )}

      <div className="row">
        <PageContentManager />
      </div>
    </div>
  );

  
};



export default AdminDashboardPage;
