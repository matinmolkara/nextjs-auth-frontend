import React from 'react'
import Image from 'next/image';
import styles from "../../styles/components/Cart.module.css";
const CartItemPreview = ({product,onRemove}) => {
   const { id, imgSrc, title, price ,count} = product;
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
              src={imgSrc}
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
      <td className={`${styles.cartTitle} align-middle`}>{formatPrice(price * count)}</td>

      <td className="align-middle">
        <button className="btn" onClick={() => onRemove(id)}>
          <i className="bi bi-x text-danger"></i>
        </button>
      </td>
    </tr>
  );
}

export default CartItemPreview