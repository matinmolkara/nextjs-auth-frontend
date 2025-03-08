
import CartPreview from '@/components/profile/CartPreview';
import Dashboard from '@/components/profile/Dashboard'
import LastOrders from '@/components/profile/LastOrders';
import UserInfo from '@/components/profile/UserInfo';
import React from "react";
import styles from '../../styles/components/profile.module.css'
const page = () => {
  
  return (
    <div>
      <div className="container">
        <div className={styles.profileContainer}>
          <div className="col-12 col-lg-3">
            <div className={styles.dashboardSection}>
              <Dashboard />
            </div>
          </div>
          <div className="col-12 col-lg-9">
            <div className={styles.contentArea}>
              <UserInfo />
              <LastOrders />
              <CartPreview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page