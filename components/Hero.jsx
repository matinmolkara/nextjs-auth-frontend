import React from 'react'
import styles from "../styles/components/Hero.module.css";
import Image from 'next/image';
import heroImg from '../public/images/hero/background-hero.png';

const Hero = ({ title, subtitle, image }) => {
  const fullImageUrl = `${process.env.NEXT_PUBLIC_IMAGE_BASE}${image}`;

  return (
    <div className={styles.hero}>
      <Image src={fullImageUrl} alt="hero" fill />
      <div className={styles.heroDetail}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              {title && <h1>{title}</h1>}
              {subtitle && <h2>{subtitle}</h2>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero