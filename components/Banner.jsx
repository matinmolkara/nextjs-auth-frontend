import React from 'react'
import styles from "../styles/components/Banner.module.css";
import Image from "next/image";
// import Offer3 from "../public/images/hero/bestoffer3.png";
// import Offer2 from "../public/images/hero/bestoffer2.png";
// import Offer1 from "../public/images/hero/bestoffer1.png";
import Link from "next/link";
const Banner = ({ items }) => {
  const fullImageUrl = `${process.env.NEXT_PUBLIC_IMAGE_BASE}`;
  return (
    <div className={styles.banner}>
      <div
        className={`${styles.bannerCartHolder} d-lg-flex justify-content-center`}
      >
        {items.map((item, index) => (
          <Link key={index} href={item.href} className={styles.bannerCart}>
            <Image
              src={`${fullImageUrl}${item.imgSrc}`}
              alt={item.imgAlt || "تصویر"}
              width={418}
              height={418}
            />
            <div
              className={
                index === 0
                  ? styles.bannerCartFirstTitle
                  : index === 1
                  ? styles.bannerCartSecondTitle
                  : styles.bannerCartThirdTitle
              }
            >
              <h4 className={styles.bannerCartTitle}>{item.title}</h4>
            </div>
            <div
              className={
                index === 0
                  ? styles.bannerCartFirstOffPercent
                  : index === 1
                  ? styles.bannerCartSecondOffPercent
                  : styles.bannerCartThirdOffPercent
              }
            >
              <span className={styles.bannerCartRealPrice}>
                {item.realPrice}
              </span>
              <span className={styles.bannerCartOffPercent}>
                {item.offPercent}
              </span>
            </div>
            <div
              className={
                index === 0
                  ? styles.bannerCartFirstPrice
                  : index === 1
                  ? styles.bannerCartSecondPrice
                  : styles.bannerCartThirdPrice
              }
            >
              <h4 className={styles.bannerCartPrice}>{item.finalPrice}</h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Banner