import React from 'react'
import styles from "../../styles/components/Cart.module.css";
import Link from 'next/link';
const CheckoutButton = () => {
  return (
    <div className="">
      <button className={styles.btnPayment}>
        <Link href="/checkout/shipping"> پرداخت</Link>
      </button>
    </div>
  );
}

export default CheckoutButton