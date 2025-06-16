"use client"
import React from 'react'
import Link from 'next/link';
import { usePathname } from "next/navigation";
import styles from '../../styles/components/Dashboard.module.css'
import { useAuth } from "@/context/authContext";
const Dashboard = () => {


 const { logout } = useAuth();



  const currentPath = usePathname();
    const links = [
      {
        id: "dashboard", 
        href: "/profile",
        label: "داشبورد",
        icon: <i className="bi bi-columns-gap"></i>,
      },
      {
        id: "orders", 
        href: "/profile/orders",
        label: "سفارشات",
        icon: <i className="bi bi-box-seam"></i>,
      },
      {
        id: "addresses", 
        href: "/profile/addresses",
        label: "آدرس‌ها",
        icon: <i className="bi bi-geo-alt"></i>,
      },
      {
        id: "userinfo", 
        href: "/profile/userinfo",
        label: "اطلاعات کاربری",
        icon: <i className="bi bi-person"></i>,
      },
      {
        id: "shoppingcart", 
        label: "سبد خرید",
        icon: <i className="bi bi-bag-check"></i>,
      },
      {
        id: "logout", 
      
        label: "خروج",
        icon: <i className="bi bi-box-arrow-right"></i>,
        isLogout: true, // ✅ اضافه کردن یک ویژگی برای شناسایی لینک خروج
      },
    ];
  return (
    <div className={`${styles.holder} d-flex flex-column gap-2 w-100 mx-auto"`}>
      {links.map((link) => {
        const commonClasses = `${styles.dashboardLink} d-flex align-items-center justify-content-between border-bottom pb-2 px-4 w-100 text-decoration-none`;

        const content = (
          <>
            <span
              className={`${styles.dashboardItem}d-flex align-items-center gap-2 flex-grow-1`}
            >
              {link.icon}
              {link.label}
            </span>
            <i
              className={`${styles.chevronIcon}icon-color bi bi-chevron-left`}
            ></i>
          </>
        );

        // ✅ منطق جدید: اگر لینک href داشت، Link رندر کن؛ در غیر این صورت، div رندر کن.
        if (link.href) {
          return (
            <Link
              key={link.id} // استفاده از id به عنوان key
              href={link.href} // ✅ مطمئن هستیم که href وجود دارد
              className={`${commonClasses} ${
                currentPath === link.href ? styles.activeLink : ""
              }`}
            >
              {content}
            </Link>
          );
        } else {
          // فرض می‌کنیم اگر href وجود نداشت، این یک آیتم اکشن (مثل خروج) است
          return (
            <div
              key={link.id} // استفاده از id به عنوان key
              onClick={logout} // ✅ مطمئن هستیم که action وجود دارد (در مورد خروج)
              className={`${commonClasses}`}
              style={{ cursor: "pointer" }}
            >
              {content}
            </div>
          );
        }
      })}
    </div>
  );
}

export default Dashboard