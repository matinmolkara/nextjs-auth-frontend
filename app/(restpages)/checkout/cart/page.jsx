"use client"
import CartTable from '@/components/cart/CartTable'
import DiscountSection from '@/components/cart/DiscountSection'
import SummaryBox from '@/components/checkout/SummaryBox'
import React, { useContext } from "react";
import { ProductContext } from "@/context/ProductContext";
import Image from "next/image";


const Cart = () => {

  const { cartProducts, discountValue } = useContext(ProductContext);
  if (cartProducts.length === 0) {
    return (
      <div className="text-center py-5">
        <Image
          src="/empty-cart.png"
          width={200}
          height={200}
          alt="سبد خرید خالی است"
        />
        <h4 className="text-canter mt-3">سبد خرید شما خالی است</h4>
      </div>
    );
  }
  return (
    <div>
      <CartTable />
      <div className="container">
        <div className="row">
          <div className="col-6">
            <DiscountSection />
          </div>
          <div className="col-6 d-flex justify-content-end">
            <SummaryBox shippingPrice={0}  discountValue={discountValue} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart