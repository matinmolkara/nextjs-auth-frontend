"use client";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "next/navigation";
import { getOrderById } from "@/app/api/api"; // فرض وجود این تابع API
import { ProductContext } from "@/context/ProductContext";
const OrderDetailPage = () => {
  const { id } = useParams(); // دریافت id سفارش از URL
  const [orderDetail, setOrderDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const { getProductById } = useContext(ProductContext);





  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        setLoading(true);
        const data = await getOrderById(id);
        setOrderDetail(data.data);
        
        setLoading(false);
      } catch (err) {
        setError(err.message || "خطا در دریافت جزئیات سفارش");
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="alert alert-info text-center">
        در حال بارگیری جزئیات سفارش...
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger text-center">خطا: {error}</div>;
  }

  if (!orderDetail) {
    return (
      <div className="alert alert-warning text-center">سفارش یافت نشد.</div>
    );
  }


  const shippingAddress = orderDetail.shipping_address
    ? JSON.parse(orderDetail.shipping_address)
    : null;




 




  return (
    <div className="container py-4">
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white fw-bold">
          سفارش #{orderDetail.order_id}
        </div>
        <div className="card-body">
          <p>
            <strong>تاریخ سفارش:</strong>{" "}
            {new Date(orderDetail.created_at).toLocaleString()}
          </p>
          <p>
            <strong>نحوه پرداخت:</strong> {orderDetail.payment_method}
          </p>
          <p>
            <strong>وضعیت:</strong> {orderDetail.payment_status}
          </p>
          <p>
            <strong>مبلغ کل:</strong>{" "}
            {orderDetail.total_amount.toLocaleString()} تومان
          </p>
        </div>
      </div>

      {shippingAddress && (
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-secondary text-white fw-bold">
            آدرس ارسال
          </div>
          <div className="card-body">
            <p className="mb-0">
              گیرنده: {shippingAddress.reciever} <br />
              استان: {shippingAddress.province_name}، شهر:{" "}
              {shippingAddress.city_name} <br />
              آدرس کامل: {shippingAddress.full_address} <br />
              پلاک: {shippingAddress.building_num}، واحد:{" "}
              {shippingAddress.unit_num} <br />
              کد پستی: {shippingAddress.zip_code} <br />
              تلفن: {shippingAddress.tel}
            </p>
          </div>
        </div>
      )}

      {orderDetail.items && orderDetail.items.length > 0 && (
        <div className="card shadow-sm">
          <div className="card-header bg-dark text-white fw-bold">
            محصولات سفارش داده شده
          </div>
          <div className="card-body p-0">
            <table className="table mb-0">
              <thead className="table-light">
                <tr>
                  <th>محصول</th>
                  <th>تعداد</th>
                  <th>قیمت واحد</th>
                  <th>مجموع</th>
                </tr>
              </thead>
              <tbody>
                {/* {orderDetail.items.map((item,index) => (
                  <tr key={index}>
                    <td>{item.product_id}</td>
                    <td>{item.quantity}</td>
                    <td>{item.unit_price.toLocaleString()} تومان</td>
                    <td>
                      {(item.unit_price * item.quantity).toLocaleString()} تومان
                    </td>
                  </tr>
                ))} */}
                {orderDetail.items.map((item, index) => {
                
                  const product = getProductById(item.product_id);

                  return (
                    <tr key={index}>
                               
                      <td>
                        {product
                          ? product.title
                          : `محصول نامشخص (ID: ${item.product_id})`}
                      </td>
                      <td>{item.quantity}</td>     
                        
                      <td>{item.unit_price.toLocaleString()} تومان</td>    
                        
                      <td>      
                        {(item.unit_price * item.quantity).toLocaleString()}
                        تومان        
                      </td>
                     
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailPage;
