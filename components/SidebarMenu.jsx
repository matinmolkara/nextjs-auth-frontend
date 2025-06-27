// components/MobileMenu.tsx
"use client";
import React, { useEffect, useRef, useState, useContext } from "react";
import { useCartContext } from "@/context/cartContext";
import { useAuth } from "@/context/authContext";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/components/MobileMenu.module.css";
import stylesHeader from "../styles/components/Header.module.css";
import Icon from "../public/images/Icon.png";
import Searchz from "../public/images/icon/searchz.png";
const MobileMenu = ({ categories }) => {
  const { user,logout } = useAuth(); 
  const { cartItems } = useCartContext();
  const [isActive, setIsActive] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const menuRef = useRef(null);

  const toggleMenu = () => setIsActive(!isActive);

  const toggleSubmenu = (id) => {
    setOpenSubmenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 992) {
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  

  const renderMenu = (items, level = 0) => (
    <ul className={`${styles.menuList} level-${level}`}>
      {items.map((item) => (
        <li key={item.id} className={styles.menuItem}>
          <div
            className={styles.menuLabel}
            onClick={() => toggleSubmenu(item.id)}
          >
            {item.children ? (
              <>
                <i
                  className={`bi ${
                    openSubmenus[item.id] ? "bi-dash" : "bi-plus"
                  }`}
                ></i>
                {item.name} {/* بدون لینک چون parent هست */}
              </>
            ) : (
              <Link href={`/productlist?categoryId=${item.id}`}>
                {item.name} {/* فقط برای سطح آخر لینک بشه */}
              </Link>
            )}
          </div>

          {item.children &&
            openSubmenus[item.id] &&
            renderMenu(item.children, level + 1)}
        </li>
      ))}
    </ul>
  );
  

  return (
    <>
      <div className="mobile-header" id="mobileHeader">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <div className={stylesHeader.logo}>
                <div className="d-flex align-content-center justify-content-end">
                  <Link href="/">
                    <Image className={styles.logoImage} src={Icon} alt="logo" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="d-flex justify-content-end">
                <div className={stylesHeader.login}>
                  <i className="bi bi-person"></i>
                  {user ? (
                    <form
                      className="d-flex"
                      onSubmit={async (e) => {
                        e.preventDefault();
                        await logout();
                      }}
                    >
                      <Link href="/profile/userinfo"></Link>
                      <Link
                        href={
                          user?.role === "admin"
                            ? "/admin-panel/dashboard"
                            : "/profile/userinfo"
                        }
                      >
                        {user.name || user.email}
                      </Link>
                      <button>خروج</button>
                    </form>
                  ) : (
                    <Link href="/users/login">ورود به پنل کاربری</Link>
                  )}
                  
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

      <div
        ref={menuRef}
        className={`${styles.mobileMenu} ${isActive ? styles.active : ""}`}
      >
        <div className={styles.menuContent}>
          <Link href="/">
            <i className="bi bi-house"></i>
            خانه
          </Link>
          <Link href="/contactus">
            <i className="bi bi-telephone"></i>
            تماس با ما
          </Link>
          {renderMenu(categories)}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
