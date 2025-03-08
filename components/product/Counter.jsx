"use client";
import React, { useState, useEffect } from "react";
import styles from "../../styles/components/Cart.module.css";

const Counter = ({ initialCount, onAddToCart, onRemoveFromCart }) => {
  const [count, setCount] = useState(initialCount || 1);

  useEffect(() => {
    setCount(initialCount); // مقدار اولیه را هنگام تغییر prop به‌روز می‌کند
  }, [initialCount]);

  // افزایش تعداد محصول
  const increment = () => {
    setCount((prevCount) => prevCount + 1);
    if (onAddToCart) {
      onAddToCart();
    }
  };

  // کاهش تعداد محصول
  const decrement = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
      if (onRemoveFromCart) {
        onRemoveFromCart();
      }
    }
  };

  return (
    <div>
      <div className={styles.counter}>
        <button id={styles.incrementBtn} onClick={increment}>
          +
        </button>
        <div id={styles.counterValue}>{count}</div>
        <button
          id={styles.decrementBtn}
          onClick={decrement}
          disabled={count === 1}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default Counter;
