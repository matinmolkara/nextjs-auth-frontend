import React from 'react'
import styles from "../../styles/components/ProductGrid.module.css";
import Link from 'next/link';
const ProductDetails = ({comments}) => {
  return (
    <div>
      <div className="product-detail-shop">
        <h4>کفش نایک مدل AIR Jordan مردانه</h4>
        <div className="product-detail-shop-reviews">
          <span>
            <Link href="#"> ثبت نظر </Link>
          </span>
          <span>
            <span>{comments}</span>
            <span>نظر</span>
          </span>
          <span>
            <div className="brand-cart-ranking-star">
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star"></i>
            </div>
          </span>
        </div>
      </div>
      <div className="product-detail-shop">
        <div className={styles.brandCartFirstOffPercent}>
          <span className={styles.brandCartPrice}>1,386,000 تومان</span>
          <span className={styles.brandCartRealPrice}> 1800,000 تومان </span>
          <span className={styles.brandCartOffPercent}> 24% </span>
        </div>
        <div className="product-detail-shop-property">
          <ul>
            <li>
              <span> موجودی: </span>
              <span> موجود </span>
            </li>
            <li>
              <span> جنس: </span>
              <span> پارچه ای </span>
            </li>
            <li>
              <span> مناسب برای: </span>
              <span> پیاده روی </span>
            </li>
          </ul>
        </div>
      </div>
      
      
    </div>
  );
}

export default ProductDetails