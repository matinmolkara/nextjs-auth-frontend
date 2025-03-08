import React from 'react'
import Dashboard from '@/components/profile/Dashboard';
import styles from '../../../styles/components/profile.module.css';
import AddressTable from '@/components/shipping/AddressTable';
import Link from 'next/link';
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
              <div className="row">
                <div className="col-12">
                  <h5 className="bg-head border-bottom ">آدرس ها</h5>
                  <AddressTable isShippingPage={false} />
                </div>
              </div>
            </div>
            <Link href="/checkout/shipping">go to profile</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page