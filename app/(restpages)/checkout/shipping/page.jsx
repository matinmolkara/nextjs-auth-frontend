"use client"
import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SummaryBox from '@/components/checkout/SummaryBox';
import AddressTable from '@/components/shipping/AddressTable';
import CartItemPreview from '@/components/shipping/CartItemPreview';
import styles from "../../../../styles/components/Address.module.css";
import { ProductContext } from "@/context/ProductContext";
import { useCartContext } from "@/context/cartContext";
import Link from "next/link";

const Address = () => {
  const router = useRouter();
   const {
     addresses,
     calculateShippingPrice,
     discountValue,
   } = useContext(ProductContext);

const {cartItems, removeFromCart, isCartLoading} = useCartContext();

const [selectedShippingPrice, setSelectedShippingPrice] = useState(0);
    // useEffect(() => {
    //   if (cartItems.length === 0) {
    //     router.push("/checkout/cart");
    //   }
    // }, [cartItems, router]);
   useEffect(() => {

    if (isCartLoading) return;

     if (Array.isArray(cartItems) && cartItems.length === 0) {
       router.push("/checkout/cart");
     }
   }, [cartItems,isCartLoading, router]);



   const handleSelectAddress = (province) => {
   
     const shippingPrice = calculateShippingPrice(province);

     setSelectedShippingPrice(shippingPrice);
   };
  return (
    <div>
      <AddressTable
        onAddressSelect={handleSelectAddress}
        isShippingPage={true}
      />
      <div className="container">
        <div className="row">
          <div className="col-12 col-xl-6">
            <div className={styles.eventTable}>
              <p>
                <i className="bi bi-cart3"></i>
                سبد خرید شما
              </p>
              <div className={styles.inviteContentTable}>
                <div
                  className={`${styles.inviteContentTable0} table-responsive`}
                >
                  <table className="table">
                    <thead>
                      <tr>
                        <th>محصول</th>
                        <th>قیمت</th>

                        <th>حذف</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((product) => (
                        <CartItemPreview
                          key={product.id}
                          product={product}
                          onRemove={() => removeFromCart(product.id)}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-xl-6 d-flex justify-content-center justify-content-xl-end mt-5">
            <SummaryBox
              shippingPrice={selectedShippingPrice}
              discountValue={discountValue}
              nextStep="/checkout/payment"
              step="redirect"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Address