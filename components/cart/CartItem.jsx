"use client";
import React, { useContext } from "react";
import { ProductContext } from "@/context/ProductContext";
import Counter from "../product/Counter";
import Image from "next/image";
import styles from "../../styles/components/Cart.module.css";

const CartItem = ({ product }) => {
  const { id, imgSrc, title, price, count, color, size } = product; // دریافت ویژگی‌های محصول
  const { updateCartProductCount, removeFromCart } = useContext(ProductContext);

  const formatPrice = (price) => {
    return `${price.toLocaleString("fa-IR")} تومان`;
  };

  return (
    <tr>
      {/* تصویر و نام محصول */}
      <td>
        <div className="row">
          <div className="col-4">
            <Image
              className={styles.cartImage}
              src={imgSrc}
              width="150"
              height="137"
              alt={title}
            />
          </div>
          <div className="col-8 d-flex align-items-center">
            <div>
              <span className={styles.cartTitle}>{title}</span>
              <p className={styles.cartTitle}>
                رنگ: {color ? color.name : "نامشخص"}
              </p>
              <p className={styles.cartTitle}>سایز: {size || "نامشخص"}</p>
            </div>
          </div>
        </div>
      </td>

      {/* قیمت محصول */}
      <td className={`${styles.cartTitle} align-middle`}>
        {formatPrice(price * count)} {/* محاسبه قیمت بر اساس تعداد */}
      </td>

      {/* مدیریت تعداد محصول */}
      <td className="align-middle">
        <div className={styles.productDetailShopQuantity}>
          <Counter
            initialCount={count}
            onAddToCart={() => updateCartProductCount(id, count + 1)} // افزایش تعداد
            onRemoveFromCart={() => updateCartProductCount(id, count - 1)} // کاهش تعداد
          />
        </div>
      </td>

      {/* حذف محصول */}
      <td className="align-middle">
        <button className="btn" onClick={() => removeFromCart(id)}>
          <i className="bi bi-x text-danger"></i>
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
