"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation"; // استفاده از usePathname به جای useRouter

const BreadCrumb = () => {
  const pathname = usePathname(); // گرفتن مسیر فعلی
  const pathnames = pathname ? pathname.split("/").filter((x) => x) : [];

 const breadcrumbNames = {
   productlist: "لیست محصولات",
   about: "درباره ما",
   contact: "تماس با ما",
   blog: "بلاگ",
   profile: "پروفایل",
   checkout: "تسویه‌حساب", // اضافه کردن checkout بدون لینک
   cart: "سبد خرید",
   shipping: "آدرس",
 };

  return (
    <nav aria-label="breadcrumb">
      <ul className="breadcrumb">
        <li className="breadcrumb-item">
          <Link href="/">خانه</Link>
        </li>
        {pathnames.map((value, index) => {
          const href = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const displayName = breadcrumbNames[value] || value; // استفاده از نام فارسی یا مسیر اصلی


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
