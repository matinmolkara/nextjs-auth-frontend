import React from "react";
import styles from "../styles/components/Featured.module.css";
import Image from "next/image";
import Link from "next/link";
const Featured = () => {
     const featureItems = [
       {
         link: "#",
         imgSrc: "/images/featured/featured.png",
         alt: "کفش فوتسال",
         title: "  کفش فوتسال  مردانه تن زیب مدل TID9602",
         price: "1,386,000 تومان",
         realPrice: "1800,000 تومان",
       },
       {
         link: "#",
         imgSrc: "/images/featured/featured.png",
         alt: "کفش فوتسال",
         title: "کفش فوتسال مردانه تن زیب مدل TID9602",
         price: "1,386,000 تومان",
         realPrice: "1800,000 تومان",
       },
       {
         link: "#",
         imgSrc: "/images/featured/featured.png",
         title: "کفش فوتسال مردانه تن زیب مدل TID9602",
         alt: "کفش فوتسال",
         price: "1,386,000 تومان",
         realPrice: "1800,000 تومان",
       },
     ];
      
  return (
    <div className={styles.featured}>
      <div className="container">
        <div className="row">
          {featureItems.map((feature, index) => (
            <div key={index} className="col-12 col-lg-6 col-xl-4">
              <Link href={feature.link} className={styles.featuredCardLink}>
                <div className={styles.featuredCard}>
                  <div className={styles.featuredCardImage}>
                    <Image
                      src={feature.imgSrc}
                      alt={feature.alt}
                      width={155}
                      height={155}
                    />
                  </div>
                  <div className={styles.featuredCardDetial}>
                    <div className="">
                      <h6>
                        {feature.title}
                      </h6>
                      <div className={styles.brandCartRankingStar}>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star"></i>
                      </div>
                      <div className={styles.brandCartFirstOffPercent}>
                        <span className={styles.brandCartOffPercent}>
                         {feature.price}
                        </span>
                        <span className={styles.brandCartRealPrice}>
                          {feature.realPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Featured;
