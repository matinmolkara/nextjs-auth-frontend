"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getOrderById } from "@/app/api/api";
import Link from "next/link";
import { format } from "date-fns-jalali";

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(orderId);
        setOrder(data.data);
      } catch (err) {
        console.error("خطا در دریافت سفارش:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) return <p className="text-center mt-5">در حال بارگذاری...</p>;
  if (!order) return <p className="text-center text-danger">سفارش یافت نشد.</p>;

  const shipping =
    typeof order.shipping_address === "string"
      ? JSON.parse(order.shipping_address)
      : order.shipping_address;

  const billing =
    typeof order.billing_address === "string"
      ? JSON.parse(order.billing_address)
      : order.billing_address;

  const formatDate = (date) => {
    if (!date) return "نامشخص";
    return format(new Date(date), "yyyy/MM/dd HH:mm");
  };

  return (
    <div className="bg-light min-vh-100 p-4 p-sm-6 p-lg-8 font-sans" dir="rtl">
      <div className="container">
        <div className="d-flex align-items-center mb-6 gap-3">
          <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-circle">
            <i className="bi bi-bag-check-fill fs-4"></i>
          </div>
          <div>
            <h1 className="h3 fw-bold text-dark">
              جزئیات سفارش #{order.order_id}
            </h1>
            <p className="text-muted">نمایش اطلاعات کامل این سفارش.</p>
          </div>
          <div className="ms-auto">
            <Link href="/admin-panel/orders" className="btn btn-outline-dark">
              <i className="bi bi-card-list"></i> بازگشت به لیست سفارشات
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-4 shadow overflow-hidden">
          <div className="p-4 p-sm-5">
            {/* بخش اول: اطلاعات سفارش */}
            <div className="row row-cols-1 row-cols-md-2 g-4 border-bottom border-muted pb-4 mb-4">
              <InfoItem
                label="تاریخ سفارش"
                icon="calendar-fill"
                value={formatDate(order.order_date)}
              />
              <InfoItem
                label="وضعیت پرداخت"
                icon="credit-card-fill"
                value={order.payment_status}
              />
              <InfoItem
                label="وضعیت سفارش"
                icon="truck"
                value={order.order_status}
              />
              <InfoItem
                label="مبلغ کل"
                icon="cash-stack"
                value={`${order.total_amount.toLocaleString()} تومان`}
              />
              <InfoItem
                label="روش ارسال"
                icon="box-seam"
                value={order.shippingMethod || "نامشخص"}
              />
            </div>

            {/* بخش دوم: آدرس‌ها */}
            <div className="border-bottom border-muted pb-4 mb-4">
              <h3 className="h5 fw-bold text-dark mb-3">آدرس ارسال</h3>
              <p className="lh-lg text-dark">
                {shipping?.province_name}، {shipping?.city_name}،{" "}
                {shipping?.full_address}، پلاک {shipping?.building_num}، واحد{" "}
                {shipping?.unit_num}، کدپستی {shipping?.zip_code}
                <br />
                <strong>گیرنده:</strong> {shipping?.reciever} |{" "}
                <strong>تلفن:</strong> {shipping?.tel}
              </p>

              <h3 className="h5 fw-bold text-dark mt-4 mb-3">آدرس صورتحساب</h3>
              <p className="lh-lg text-dark">
                {billing?.province_name}، {billing?.city_name}،{" "}
                {billing?.full_address}، پلاک {billing?.building_num}، واحد{" "}
                {billing?.unit_num}، کدپستی {billing?.zip_code}
                <br />
                <strong>گیرنده:</strong> {billing?.reciever} |{" "}
                <strong>تلفن:</strong> {billing?.tel}
              </p>
            </div>

            {/* بخش سوم: لیست محصولات */}
            <div>
              <h3 className="h5 fw-bold text-dark mb-3">محصولات سفارش</h3>
              <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>نام محصول</th>
                      <th>تعداد</th>
                      <th>قیمت واحد</th>
                      <th>جمع کل</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, index) => (
                      <tr key={item.order_item_id}>
                        <td>{index + 1}</td>
                        <td>{item.product_name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.unit_price.toLocaleString()} تومان</td>
                        <td>{item.total_price.toLocaleString()} تومان</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, icon, value }) => (
  <div className="d-flex align-items-center">
    <i className={`bi ${icon} text-muted me-3 fs-5`}></i>
    <div>
      <p className="small text-muted mb-1">{label}</p>
      <p className="fw-semibold text-dark h6 mb-0">{value}</p>
    </div>
  </div>
);

export default OrderDetailsPage;
