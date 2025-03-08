"use client";
import React, { useContext } from "react";
import { ProductContext } from "@/context/ProductContext";
import CartItem from "./CartItem";
import styles from "../../styles/components/Cart.module.css";

const CartTable = () => {
  const { cartProducts } = useContext(ProductContext); // دریافت محصولات سبد خرید از Context

  return (
    <div className="container">
      <div className={styles.eventTable}>
        <div className={styles.inviteContentTable}>
          <div className={`${styles.inviteContentTable0} table-responsive`}>
            <table className="table">
              <thead>
                <tr>
                  <th>محصول</th>
                  <th>قیمت</th>
                  <th>تعداد</th>
                  <th>حذف</th>
                </tr>
              </thead>
              <tbody>
                {cartProducts.map((product) => (
                  <CartItem key={product.id} product={product} />
                ))}
              </tbody>
              
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartTable;
