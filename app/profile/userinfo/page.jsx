"use client"
import React from "react";
import { useAuth } from "@/context/authContext";
import Dashboard from "@/components/profile/Dashboard";
import styles from "../../../styles/components/profile.module.css";
import AddressTable from "@/components/shipping/AddressTable";
import Link from "next/link";
import EditInfo from "@/components/profile/EditInfo";

const Page = () => {
  const { user } = useAuth();
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
                  <h5 className="bg-head border-bottom ">اطلاعات کاربری</h5>
                  <EditInfo user={user}/>
                </div>
              </div>
            </div>
            <Link href="/checkout/shipping">go to address</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
