"use client"
import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SummaryBox from '@/components/checkout/SummaryBox';
import AddressTable from '@/components/shipping/AddressTable';
import CartItemPreview from '@/components/shipping/CartItemPreview';
import styles from "../../../../styles/components/Address.module.css";
import { ProductContext } from "@/context/ProductContext";
import Link from "next/link";

const Address = () => {
  const router = useRouter();
   const {
     cartProducts,
     removeFromCart,
     calculateShippingPrice,
     discountValue,
   } = useContext(ProductContext);

    useEffect(() => {
      if (cartProducts.length === 0) {
        router.push("/checkout/cart");
      }
    }, [cartProducts, router]);
   const [selectedShippingPrice, setSelectedShippingPrice] = useState(0);


   const handleSelectAddress = (province) => {
     const shippingPrice = calculateShippingPrice(province);
     setSelectedShippingPrice(shippingPrice);
   };
  return (
    <div>
      <AddressTable onAddressSelect={handleSelectAddress} isShippingPage={true} />
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
                      {cartProducts.map((product) => (
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
            />
          </div>
          <Link href="/profile/addresses">go to profile</Link>
        </div>
      </div>
    </div>
  );
}

export default Address