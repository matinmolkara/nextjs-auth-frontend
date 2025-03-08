import React from "react";
import styles from "../styles/components/Services.module.css";
import Image from "next/image";


const Services = () => {
    const serviceItems = [
      {
        imgSrc: "/images/services/shipping.png",
        alt: "Shipping",
        title: "ارسال رایگان",
        desc: "ارسال رایگان برای خرید بالای 500 هزار تومن"
      },
      {
        imgSrc: "/images/services/refund.png",
        alt: "Refund",
        title: "ضمانت بازگشت وجه",
        desc:"ضمانت بازگشت وجه در صورت مرجوعی کالا"
      },
      {
        imgSrc: "/images/services/support.png",
        alt: "Support",
        title: "پشتیبانی آنلاین",
        desc:"پشتیبانی همه روزه 7 روز در هفته 24 ساعته"
      },
    ];
  return (
    <>
      <div className={styles.services}>
        <div className="container">
          <div className="row">
            {serviceItems.map((service, index) => (
              <div key={index}  className="col-12 col-lg-6 col-xl-4">
                <div className={styles.servicesCard}>
                  <div className={styles.servicesCardDetail}>
                    <div className={styles.servicesCardDetailImage}>
                      <Image src={service.imgSrc} alt={service.alt} width={89} height={89}/>
                    </div>
                    <h4>{service.title}</h4>
                    <p>{service.desc}
                    </p>
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
