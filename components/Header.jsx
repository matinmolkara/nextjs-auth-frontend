"use client"
import React, {useContext} from 'react'
import { ProductContext } from "@/context/ProductContext";
import styles from '../styles/components/Header.module.css'
import Image from 'next/image';
import Searchz from '../public/images/icon/searchz.png'
import Link from 'next/link';
import Logo from './Logo';
import Navbar from './Navbar';
const Header = () => {
   const { cartProducts } = useContext(ProductContext);
  return (
    <div>
      <div className="container" id="header">
        <div className="row">
          <div className="col-6">
            <div className="d-flex">
              <div className={styles.login}>
                <i className="bi bi-person"></i>
                <Link href="/users/login"> ورود به پنل کاربری </Link>
              </div>
              <div className={styles.cart}>
                <Link href="/checkout/cart">
                  <i className="bi bi-cart">
                    <span className="">{cartProducts.length} </span>
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