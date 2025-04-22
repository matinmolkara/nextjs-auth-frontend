"use client";
import Link from "next/link";
import React, { useState } from "react";

const UserInfo = ({user}) => {
      
  return (
    <div className="mb-4">
      <div className="row">
        <div className="col-10">
          <h5 className="bg-head border-bottom ">پروفایل کاربر</h5>
          {/* اضافه کردن شرط برای نمایش اطلاعات کاربر */}
          {user ? (
            <>
              <p className="mb-1">
                <strong>نام:</strong> {user.name}
              </p>
              <p className="mb-0">
                <strong>شماره تماس:</strong> {user.phone}
              </p>
            </>
          ) : (
            // می‌توانید در اینجا یک پیام "در حال بارگذاری..." یا "اطلاعات کاربر در دسترس نیست" نمایش دهید
            <p>در حال بارگذاری اطلاعات کاربر...</p>
          )}
        </div>
        <div className="col-2">
          <i className="bi bi-pen"></i>
          <Link href="/profile/userinfo">
            <span className="head-size">ویرایش پروفایل</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
