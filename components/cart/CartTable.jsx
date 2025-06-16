"use client";

import { useCartContext } from "@/context/cartContext";
import CartItem from "./CartItem";
import styles from "../../styles/components/Cart.module.css";

const CartTable = () => {
  const { cartItems } = useCartContext(); // دریافت محصولات سبد خرید از Context

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
                {cartItems.map((item) => (
                  <CartItem key={item.id} product={item} />
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
