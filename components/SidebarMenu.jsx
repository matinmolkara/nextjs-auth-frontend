"use client"
import React, { useState, useRef, useEffect, useContext } from "react";
import { useCartContext } from "@/context/cartContext";
import styles from "../styles/components/Sidenavigation.module.css";
import stylesHeader from "../styles/components/Header.module.css";
import Image from "next/image";
import Link from "next/link";
import Icon from "../public/images/Icon.png";
import Searchz from "../public/images/icon/searchz.png";

const SidebarMenu = () => {
    const { cartItems } = useCartContext();
  const menuRef = useRef(null); // برای دسترسی به DOM عنصر منو

  const [isActive, setIsActive] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});

  const toggleMenu = () => setIsActive(!isActive);

  const toggleSubmenu = (index) => {
    setOpenSubmenus((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const menuData = [
    {
      label: "خانه",

      href: "#",
    },
    {
      label: "تماس با ما",
      icon: "bi bi-people-fill",
      href: "#",
    },
    {
      label: "کفش",

      submenu: [
        { label: "اسنیکرز", href: "#" },
        { label: "راحتی", href: "#" },
        { label: "مجلسی", href: "#" },
      ],
    },
    {
      label: "کیف",

      submenu: [
        { label: "زنانه", href: "#" },
        { label: "مردانه", href: "#" },
      ],
    },
  ];

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsActive(false); // بستن منو
    }
  };
  useEffect(() => {
    // اضافه‌کردن لیسنر وقتی کامپوننت رندر شد
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      // پاک‌کردن لیسنر وقتی کامپوننت حذف شد
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, []);
  return (
    <div>
      <div
        ref={menuRef}
        className={`${styles.sideNavbar} ${isActive ? styles.isActive : ""}`}
        id="sidebar"
      >
        <div className={styles.sideNavUp}>
          {["facebook", "instagram", "whatsapp", "telegram"].map((platform) => (
            <span key={platform}>
              <Link href="#">
                <i className={`bi bi-${platform}`}></i>
              </Link>
            </span>
          ))}
        </div>
        <div className={styles.sideNavContact}>
          <ul>
            {[
              { class: "phone", text: "021-228804587" },
              { class: "envelope", text: "wallmart@gmail.com" },
              { class: "geo-alt", text: "ایران - تهران" },
            ].map((contact, index) => (
              <li key={index}>
                <div className="">
                  <i className={`bi bi-${contact.class}`}></i>
                  {contact.text}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <ul className="nav flex-column text-white w-100">
          {menuData.map((menuItem, index) => (
            <li
              key={index}
              className={`nav-item ${styles.navItem}`}
              onClick={() => menuItem.submenu && toggleSubmenu(index)} // کنترل باز/بسته شدن زیرمنو
            >
              {menuItem.submenu && (
                <i
                  className={`bi ${
                    openSubmenus[index] ? "bi-dash" : "bi-plus"
                  }`}
                ></i> // آیکون مثبت/منفی برای زیرمنو
              )}

              {menuItem.label}

              {menuItem.submenu && (
                <ul
                  className={`${styles.submenu} ${
                    openSubmenus[index] ? styles.open : ""
                  }`}
                >
                  {menuItem.submenu.map((submenuItem, subIndex) => (
                    <li key={subIndex}>
                      <Link href="#">{submenuItem.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="mobileHeader" id="mobileHeader">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <div className={stylesHeader.logo}>
                <div className="d-flex align-content-center justify-content-end">
                  <Link href="#">
                    <Image className={styles.logoImage} src={Icon} alt="logo" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="d-flex justify-content-end">
                <div className={stylesHeader.login}>
                  <i className="bi bi-person"></i>
                  <Link href="#"> ورود به پنل کاربری </Link>
                </div>
                <div className={stylesHeader.cart}>
                  <Link href="/checkout/cart">
                    <i className="bi bi-cart">
                      <span className="">{cartItems?.length || 0} </span>
                    </i>
                  </Link>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className={stylesHeader.borderLine}></div>
              </div>
            </div>
            <div className="row">
              <div className="col-9">
                <div className={stylesHeader.wrap}>
                  <div className={stylesHeader.search}>
                    <input
                      type="text"
                      className={`${stylesHeader.searchTerm} p-3`}
                      placeholder="جستجوی محصول..."
                    />
                    <button type="submit" className={stylesHeader.searchButton}>
                      <Image src={Searchz} alt="search icon" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-3 d-flex justify-content-end">
                <button
                  className="toggleHamburger menuToggle"
                  onClick={toggleMenu}
                  id="menuToggle"
                >
                  <i className="bi bi-grid-3x3-gap"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarMenu;
