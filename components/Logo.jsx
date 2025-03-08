import React from 'react'
import styles from "../styles/components/Logo.module.css";
import Image from "next/image";
import Icon from "../public/images/Icon.png";
import Link from "next/link";
const Logo = () => {
  return (
    <>
      <div className={styles.logo}>
        <div className="d-flex align-content-center justify-content-end">
          <Image className={styles.logoImage} alt="site logo" src={Icon} />
          <h6 className={styles.logoTitle}>
            <Link href="#">والمارت</Link>
          </h6>
        </div>
      </div>
    </>
  );
}

export default Logo