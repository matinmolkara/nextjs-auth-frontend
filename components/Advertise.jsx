import React from "react";
import styles from "../styles/components/Advertise.module.css";
import Image from "next/image";
import Link from "next/link";
import Shoe from "../public/images/advertise/shoes-shoe-png-transparent-shoe-images-pluspng-17 1.png";
const Advertise = () => {
  return (
    <div className={styles.advertise}>
      <div className="container">
        <div className="row">
          <div className="col-12 col-xl-6">
            <div className={styles.advertiseImage}>
              <Image src={Shoe} alt="shoe advertise" />
            </div>
          </div>
          <div className="col-12 col-xl-6">
            <div className={styles.advertiseText}>
              <div className="">
                <h1>انواع کفش های راحتی مردانه</h1>
                <p>بهترین برندهای کفش در حراج پاییزه</p>
                <Link href="#"> خرید کن! </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Advertise