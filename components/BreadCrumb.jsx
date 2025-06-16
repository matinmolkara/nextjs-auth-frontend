"use client";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { getProductById } from "@/app/api/api"; // ایمپورت متد API

const BreadCrumb = () => {
  const pathname = usePathname(); // گرفتن مسیر فعلی

  // استفاده از useMemo برای محاسبه بهینه pathnames
  const pathnames = useMemo(
    () => pathname?.split("/").filter((x) => x) || [],
    [pathname]
  );

  const [productName, setProductName] = useState("");

  const breadcrumbNames = {
    productlist: "لیست محصولات",
    about: "درباره ما",
    contact: "تماس با ما",
    blog: "بلاگ",
    profile: "پروفایل",
    checkout: "تسویه‌حساب",
    cart: "سبد خرید",
    shipping: "آدرس",
    products: "محصولات",
    contactus: "تماس با ما",
    payment: "انتخاب روش پرداخت",
    success: "پرداخت موفقیت آمیز",
  };

  useEffect(() => {
    // بررسی آیا مسیر شامل آیدی محصول است
    if (pathnames[0] === "productlist" && pathnames[1]) {
      const productId = pathnames[1];
      // گرفتن نام محصول از سرور
      const fetchProductName = async () => {
        try {
          const product = await getProductById(productId);
          setProductName(product?.title || "محصول نامشخص");
        } catch (error) {
          console.error("خطا در دریافت نام محصول:", error);
          setProductName("محصول نامشخص");
        }
      };
      fetchProductName();
    }
  }, [pathnames]);

  return (
    <nav aria-label="breadcrumb">
      <ul className="breadcrumb">
        <li className="breadcrumb-item">
          <Link href="/">خانه</Link>
        </li>
        {pathnames.map((value, index) => {
          const href = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          // بررسی اینکه آیا مسیر شامل آیدی محصول است
          const displayName =
            value === pathnames[1] && pathnames[0] === "productlist"
              ? productName // نمایش نام محصول
              : breadcrumbNames[value] || value;

          if (value === "checkout") {
            return (
              <li key={index} className="breadcrumb-item">
                {displayName}
              </li>
            );
          }

          return isLast ? (
            <li
              key={index}
              className="breadcrumb-item active"
              aria-current="page"
            >
              {displayName}
            </li>
          ) : (
            <li key={index} className="breadcrumb-item">
              <Link href={href}>{displayName}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BreadCrumb;
