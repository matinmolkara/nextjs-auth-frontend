"use client";
import React, { useContext, useState } from "react";
import { ProductContext } from "@/context/ProductContext";
import AddressItem from "./AddressItem";
import AddressModal from "./AddressModal";
import styles from "../../styles/components/Address.module.css";

const AddressTable = ({ onAddressSelect, isShippingPage }) => {
  console.log("AddressTable: Received onSelectAddress prop:", onAddressSelect); // آیا تابع از والد آمده؟
  const {
    addresses,
    setAddressess,
    selectedAddress,
    setSelectedAddress,
    isEditMode,
    setIsEditMode,
  } = useContext(ProductContext); // دریافت آدرس ها از Context

  const handleAddAddress = (newAddress) => {
    if (isEditMode) {
      // ویرایش آدرس
      setAddressess((prev) =>
        prev.map((address) =>
          address.id === selectedAddress.id
            ? { ...newAddress, id: address.id }
            : address
        )
      );
    } else {
      // افزودن آدرس جدید
      setAddressess((prevAddresses) => [
        ...prevAddresses,
        { ...newAddress, id: Date.now() },
      ]);
    }
    resetModalState();
  };

  const handleDeleteAddress = (id) => {
    setAddressess((prev) => prev.filter((address) => address.id !== id)); // حذف آدرس
  };

  const resetModalState = () => {
    setSelectedAddress(null);
    setIsEditMode(false);
  };

  return (
    <div className="container">
      <div className={styles.eventTable}>
        {isShippingPage && (
          <p>
            <i className="bi bi-truck"></i>
            برای ارسال مرسوله آدرس مورد نظر را انتخاب کنید و یا یک آدرس جدید از
            قسمت تغییر آدرس انتخاب فرمایید.
          </p>
        )}
        <div className={styles.inviteContentTable}>
          <div className={`${styles.inviteContentTable0} table-responsive`}>
            <table className="table">
              <thead>
                <tr>
                  {isShippingPage && <th></th>}
                  <th>گیرنده</th>
                  <th>آدرس</th>
                  <th>شماره تماس</th>
                  <th>تغییر آدرس</th>
                </tr>
              </thead>
              <tbody>
                {addresses.map((address) => (
                  <AddressItem
                    key={address.id}
                    address={address}
                    onSelectAddress={onAddressSelect}
                    onDeleteAddress={handleDeleteAddress}
                    onEditAddress={(addr) => {
                      setSelectedAddress(addr); // تنظیم آدرس برای ویرایش
                      setIsEditMode(true);
                    }}
                    isShippingPage={isShippingPage}
                  />
                ))}
              </tbody>
            </table>
            <button
              className="btn btn-primary mt-3"
              data-bs-toggle="modal"
              data-bs-target="#addressModal"
              onClick={() => {
                resetModalState();
                setIsEditMode(false); // تنظیم حالت برای افزودن
              }}
            >
              افزودن آدرس جدید
            </button>
          </div>
        </div>
      </div>

      <AddressModal
        onSave={handleAddAddress}
        initialData={selectedAddress}
        // initialData={isEditMode ? selectedAddress : null}
      />
    </div>
  );
};

export default AddressTable;
