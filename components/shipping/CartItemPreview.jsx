import React from 'react'
import Image from 'next/image';
import styles from "../../styles/components/Cart.module.css";
import { useCartContext } from "@/context/cartContext";
const CartItemPreview = ({product,onRemove}) => {
  const { product_id,quantity, image_urls, title, price, color, size } = product; // دریافت ویژگی‌های محصول
    const {  removeFromCart } = useCartContext()
    const formatPrice = (price) => {
      return `${price.toLocaleString("fa-IR")} تومان`;
    };
  return (
    <tr>
      <td>
        <div className="row">
          <div className="col-4">
            <Image
              className={styles.cartImage}
              src={image_urls[0]}
              width="150"
              height="137"
              alt={title}
            />
          </div>
          <div className="col-8 d-flex align-items-center">
            <span className={styles.cartTitle}>{title}</span>
          </div>
        </div>
      </td>
      <td className={`${styles.cartTitle} align-middle`}>
        {formatPrice(price * quantity)}
      </td>

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
}

export default CartItemPreview