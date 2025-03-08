import React from 'react'
import Image from "next/image";
import Icon from "../../public/images/Icon.png";
import Link from "next/link";
import styles from "../../styles/components/Login.module.css";
const LoginHeader = ({title}) => {
  return (
    <div className="col-12 mb-5">
      <div className="d-flex align-content-center justify-content-center">
        <Link href="#">
          <Image
            alt="logo"
            width="44"
            height="44"
            className={styles.logoImage}
            src={Icon}
          />
        </Link>
      </div>
      <h3 className="text-center">
        {title}
        </h3>
    </div>
  );
}

export default LoginHeader