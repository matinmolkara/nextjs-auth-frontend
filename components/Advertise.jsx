import React from "react";
import styles from "../styles/components/Advertise.module.css";
import Image from "next/image";
import Link from "next/link";

const Advertise = ({ banners = [] }) => {
  if (!banners.length) return null;

  const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE;

  return (
    <div className={styles.advertise}>
      {banners.map((item, i) => {
        const imageUrl = item.img.startsWith("http")
          ? item.img
          : `${BASE_URL}${item.img}`; // ترکیب دامنه و مسیر

        return (
          <div key={i} className={styles.advertiseImage}>
            <Link href={item.href || "#"} passHref>
              <Image
                src={imageUrl}
                alt={`advertise-${i}`}
                width={800}
                height={200}
                unoptimized
                style={{ width: "100%", height: "auto" }}
                quality={100}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Advertise;
