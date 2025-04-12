"use client"
import React from 'react'
import Link from 'next/link';
import { usePathname } from "next/navigation";
import styles from '../../styles/components/Dashboard.module.css'

const Dashboard = () => {
  const currentPath = usePathname();
    const links = [
      {
        href: "/profile",
        label: "داشبورد",
        icon: <i className="bi bi-columns-gap"></i>,
      },
      {
        href: "/profile/orders",
        label: "سفارشات",
        icon: <i className="bi bi-box-seam"></i>,
      },
      {
        href: "/profile/addresses",
        label: "آدرس‌ها",
        icon: <i className="bi bi-geo-alt"></i>,
      },
      {
        href: "/profile/userinfo",
        label: "اطلاعات کاربری",
        icon: <i className="bi bi-person"></i>,
      },
      {
        href: "/profile/shoppingcart",
        label: "سبد خرید",
        icon: <i className="bi bi-bag-check"></i>,
      },
      {
        href: "/exit",
        label: "خروج",
        icon: <i className="bi bi-box-arrow-right"></i>,
      },
    ];
  return (
    <div className={`${styles.holder} d-flex flex-column gap-2 w-100 mx-auto"`}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`${styles.dashboardLink} 
          ${currentPath === link.href ? styles.activeLink : ""}
            d-flex align-items-center justify-content-between border-bottom pb-2 px-4 w-100 text-decoration-none`}
        >
          <span
            className={`${styles.dashboardItem}d-flex align-items-center gap-2 flex-grow-1`}
          >
            {link.icon}
            {link.label}
          </span>
          <i
            className={`${styles.chevronIcon}icon-color bi bi-chevron-left`}
          ></i>
        </Link>
      ))}
    </div>
  );
}

export default Dashboard