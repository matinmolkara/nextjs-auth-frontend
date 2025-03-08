import React from 'react'
import styles from "../styles/components/Hero.module.css";
const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.heroDetail}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>فروش ویژه پاییزه</h1>
              <h2>تا 50% تخفیف!</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero