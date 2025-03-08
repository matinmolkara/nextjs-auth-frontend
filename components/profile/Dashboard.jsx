"use client"
import React from 'react'
import Link from 'next/link';
import { usePathname } from "next/navigation";
import styles from '../../styles/components/Dashboard.module.css'
import {
  ChevronLeft,
  ShoppingCart,
  LogOut,
  User,
  MapPin,
  Package,
  LayoutDashboard,
  
} from "lucide-react";
const Dashboard = () => {
  const currentPath = usePathname();
    const links = [
      {
        href: "/profile",
        label: "داشبورد",
        icon: <LayoutDashboard className="icon-color w-5 h-5" />,
      },
      {
        href: "/profile/orders",
        label: "سفارشات",
        icon: <Package className="icon-color w-5 h-5" />,
      },
      {
        href: "/profile/addresses",
        label: "آدرس‌ها",
        icon: <MapPin className="icon-color w-5 h-5" />,
      },
      {
        href: "/profile/userinfo",
        label: "اطلاعات کاربری",
        icon: <User className="icon-color w-5 h-5" />,
      },
      {
        href: "/profile/shoppingcart",
        label: "سبد خرید",
        icon: <ShoppingCart className="icon-color w-5 h-5" />,
      },
      { href: "/exit", label: "خروج", icon: <LogOut className="icon-color w-5 h-5" /> },
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
          <ChevronLeft className={`${styles.chevronIcon}icon-color w-5 h-5`} />
        </Link>
      ))}
    </div>
  );
}

export default Dashboard