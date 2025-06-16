import React from "react";
import styles from "../styles/components/Services.module.css";
import Image from "next/image";


const Services = ({ items }) => {

const fullImageUrl = `${process.env.NEXT_PUBLIC_IMAGE_BASE}`;
  return (
    <>
      <div className={styles.services}>
        <div className="container">
          <div className="row">
            {items.map((service, index) => (
              <div key={index} className="col-12 col-lg-6 col-xl-4">
                <div className={styles.servicesCard}>
                  <div className={styles.servicesCardDetail}>
                    <div className={styles.servicesCardDetailImage}>
                      <Image
                        src={`${fullImageUrl}${service.image}`}
                        alt={service.alt || "تصویر"}
                        width={89}
                        height={89}
                      />
                    </div>
                    <h4>{service.title}</h4>
                    <p>{service.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
