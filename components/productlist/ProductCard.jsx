"use client";
import React, { useContext } from "react";
import { ProductContext } from "@/context/ProductContext";
import Image from "next/image";
import styles from "../../styles/components/ProductGrid.module.css";
import "../../styles/product.css";
import Link from "next/link";
const ProductCard = ({ product }) => {
  const { id, imgSrc, title, price, realPrice, discount, specialOffer } =
    product;

  return (
    <>
      <div className="col-12 col-lg-6 col-xl-4 d-flex justify-content-center">
        <div className={styles.brandCart}>
          <div className={styles.brandCartOverlay}>
            <div className={styles.brandCartOverlayIcons}>
              <Link href="#">
                <i className="bi bi-heart"></i>
              </Link>
              <Link href="#">
                <i className="bi biCart3"></i>
              </Link>
            </div>
          </div>
          {specialOffer && (
            <div className={styles.brandCartOffSign}>
              <span>فروش ویژه</span>
            </div>
          )}
          <Image src={imgSrc} alt={title} width={301} height={261} />
          <div className={styles.brandCartDetail}>
            <div className={styles.brandCartFirstTitle}>
              <h4 className={styles.brandCartTitle}>{title}</h4>
            </div>
            <div className={styles.brandCartRankingStar}>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star"></i>
            </div>
            <div className={styles.brandCartFirstOffPercent}>
              <span className={styles.brandCartPrice}>{price}</span>
              {realPrice && (
                <span className={styles.brandCartRealPrice}>{realPrice}</span>
              )}
              {discount && (
                <span className={styles.brandCartOffPercent}>{discount}</span>
              )}
            </div>
            <button className="btn btn-dark">
              <Link href={`/productlist/${id}`}>
                <i className="bi bi-arrow-left-short text-white"></i>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
