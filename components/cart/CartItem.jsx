"use client";
import { useState, useEffect } from "react";
import { useCartContext } from "@/context/cartContext";
import Counter from "../product/Counter";
import Image from "next/image";
import styles from "../../styles/components/Cart.module.css";

const CartItem = ({ product }) => {
  const { product_id, quantity, image_urls, title, price, color, size } =
    product; // دریافت ویژگی‌های محصول
  const { updateCartProductCount, removeFromCart } = useCartContext();
  const formatPrice = (price) => {
    if (typeof price !== "number" || isNaN(price)) {
      return "نامعتبر";
    }
    return `${price.toLocaleString("fa-IR")} تومان`;
  };
  const displayColor =
    typeof color === "object" && color !== null ? color.name : color;

  const [localQty, setLocalQty] = useState(quantity);
  useEffect(() => {
    setLocalQty(quantity); // برای همگام‌سازی در صورت تغییر از بیرون
  }, [quantity]);

  return (
    <tr>
      {/* تصویر و نام محصول */}
      <td>
        <div className="row">
          <div className="col-4">
            <Image
              className={styles.cartImage}
              src={image_urls?.[0]}
              width="150"
              height="137"
              alt={title || "Product Image"}
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="col-8 d-flex align-items-center">
            <div>
              <span className={styles.cartTitle}>{title || "بدون عنوان"}</span>
              {displayColor && (
                <p className={styles.cartTitle}>رنگ: {displayColor}</p>
              )}

              {size && <p className={styles.cartTitle}>سایز: {size}</p>}
            </div>
          </div>
        </div>
      </td>

      {/* قیمت محصول */}
      <td className={`${styles.cartTitle} align-middle`}>
        {formatPrice(price * localQty)}
      </td>

      {/* مدیریت تعداد محصول */}
      <td className="align-middle">
        <div className={styles.productDetailShopQuantity}>
          <Counter
            initialCount={localQty || 1}
            onAddToCart={() => {
              const newQty = localQty + 1;
              setLocalQty(newQty);
              updateCartProductCount(product_id, newQty, color, size);
            }}
            onRemoveFromCart={() => {
              const newQty = localQty - 1;
              setLocalQty(newQty);
              updateCartProductCount(product_id, newQty, color, size);
            }}
            // کاهش تعداد
          />
        </div>
      </td>

      {/* حذف محصول */}
      <td className="align-middle">
        <button
          className="btn"
          onClick={() => removeFromCart(product_id, color, size)}
        >
          <i className="bi bi-x text-danger"></i>
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
