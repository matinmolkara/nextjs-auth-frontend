"use client"
import React from 'react';
import { useAuth } from "@/context/authContext";
import { useCartContext } from "@/context/cartContext";
import styles from '../styles/components/Header.module.css'
import Image from 'next/image';
import Searchz from '../public/images/icon/searchz.png'
import Link from 'next/link';
import Logo from './Logo';
import Navbar from './Navbar';
const Header = () => {
    const { cartItems } = useCartContext();
      const { user,logout } = useAuth(); 
  return (
    <div>
      <div className="container" id="header">
        <div className="row">
          <div className="col-6">
            <div className="d-flex">
              <div className={styles.login}>
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
              <div className={styles.cart}>
                <Link href="/checkout/cart">
                  <i className="bi bi-cart">
                    <span className="">{cartItems?.length || 0}</span>
                  </i>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className={styles.wrap}>
              <div className={styles.search}>
                <input
                  type="text"
                  className={`p-3 ${styles.searchTerm}`}
                  placeholder="جستجوی محصول..."
                />
                <button type="submit" className={styles.searchButton}>
                  <Image src={Searchz} alt="search icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <Navbar />
          </div>
          <div className="col-4">
            <Logo />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header