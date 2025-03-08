import React from 'react'
import styles from "../styles/components/Banner.module.css";
import Image from "next/image";
// import Offer3 from "../public/images/hero/bestoffer3.png";
// import Offer2 from "../public/images/hero/bestoffer2.png";
// import Offer1 from "../public/images/hero/bestoffer1.png";
import Link from "next/link";
const Banner = () => {
    const bannerData = [
      {
        href: "#",
        imgSrc: "/images/hero/bestoffer3.png", 
        imgAlt: "offer three",
        title: "کفش فوتسال مردانه تن زیب مدل TID9602",
        realPrice: "1800,000 تومن",
        offPercent: "24% تخفیف",
        finalPrice: "1,386,000 تومان",
        titleClass: styles.bannerCartFirstTitle,
        offPercentClass: styles.bannerCartFirstOffPercent,
        priceClass: styles.bannerCartFirstPrice,
      },
      {
        href: "#",
        imgSrc: "/images/hero/bestoffer2.png", 
        imgAlt: "offer two",
        title: "کفش پیاده روی مدل J.O.R.D.N_S.e.f",
        realPrice: "1800,000 تومن",
        offPercent: "24% تخفیف",
        finalPrice: "1,386,000 تومان",
        titleClass: styles.bannerCartSecondTitle,
        offPercentClass: styles.bannerCartSecondOffPercent,
        priceClass: styles.bannerCartSecondPrice,
      },
      {
        href: "#",
        imgSrc: "/images/hero/bestoffer1.png", 
        imgAlt: "offer one",
        title: "کیف دوشی زنانه - مدل مینی 2023",
        realPrice: "1800,000 تومن",
        offPercent: "24% تخفیف",
        finalPrice: "1,386,000 تومان",
        titleClass: styles.bannerCartThirdTitle,
        offPercentClass: styles.bannerCartThirdOffPercent,
        priceClass: styles.bannerCartThirdPrice,
      },
    ];
  return (
    <div className={styles.banner}>
      <div
        className={`${styles.bannerCartHolder} d-lg-flex justify-content-center`}
      >
        {bannerData.map((item, index) => (
          <Link key={index} href={item.href} className={styles.bannerCart}>
            <Image src={item.imgSrc} alt={item.imgAlt} width={418} height={318}/>
            <div className={item.titleClass}>
              <h4 className={styles.bannerCartTitle}>{item.title}</h4>
            </div>
            <div className={item.offPercentClass}>
              <span className={styles.bannerCartRealPrice}>
                {item.realPrice}
              </span>
              <span className={styles.bannerCartOffPercent}>
                {item.offPercent}
              </span>
            </div>
            <div className={item.priceClass}>
              <h4 className={styles.bannerCartPrice}>{item.finalPrice}</h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Banner