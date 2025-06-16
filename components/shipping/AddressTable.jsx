"use client";
import React, { useContext, useState,useCallback } from "react";
import { ProductContext } from "@/context/ProductContext";
import AddressItem from "./AddressItem";
import AddressModal from "./AddressModal";
import styles from "../../styles/components/Address.module.css";

const AddressTable = ({ onAddressSelect, isShippingPage }) => {
  
  const {
    addresses,

    selectedAddress,
    setSelectedAddress,
    isEditMode,
    setIsEditMode,
    addOrUpdateAddress,
    deleteAddress,
  } = useContext(ProductContext); // دریافت آدرس ها از Context

  

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
                  <th>پیش فرض</th>
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
                    onDeleteAddress={deleteAddress}
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
              }}
            >
              افزودن آدرس جدید
            </button>
          </div>
        </div>
      </div>

      <AddressModal
        onSave={(address) => addOrUpdateAddress(address, isEditMode)}
        initialData={selectedAddress}
      />
    </div>
  );
};

export default AddressTable;
