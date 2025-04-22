import React from "react";
import Link from "next/link";
const OrderCart = ({ order }) => {
  // تابع ساده برای فرمت کردن تاریخ (می‌توانید از کتابخانه moment.js یا date-fns برای فرمت‌های پیچیده‌تر استفاده کنید)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // ماه از 0 شروع می‌شود
    const day = date.getDate();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="container list-detail-holder-body">
      <div className="row">
        <div className="col-12 message-detail-holder mb-3">
          <div className="message-title ">
            <span className="message-subject">
              <em>شماره سفارش:</em>
              <strong className="order-review-item-bold">
                {order.order_id}
              </strong>
            </span>

            <span>
              <i className="fa fa-clock-o"></i>
              تاریخ سفارش:
              <em className="order-review-item-bold">
                {formatDate(order.created_at)}
              </em>
            </span>

            <span>
              <Link
                className="btn-details"
                href={`/profile/orders/${order.order_id}`}
              >
                جزئیات
              </Link>
              <i className="fa fa-angle-left"></i>
            </span>
          </div>
          <div className="message-review mt-3 mb-3">
            <div className="message-review-holder d-flex flex-wrap">
              <div className="order-review-item ps-3">
                <span>
                  <i className="fa fa-money"></i>
                  مبلغ کل سفارش:
                  <span className="numbers order-review-item-bold">
                    {order.total_amount}
                  </span>
                  <em>تومان</em>
                </span>
              </div>
              <div className="order-review-item ps-3">
                <span>
                  <i className="fa fa-spinner"></i>
                  وضعیت:
                  <em className="order-review-item-status-bold">
                    {order.order_status}
                  </em>
                </span>
              </div>
              {/* بسته به منطق پرداخت شما می‌توانید وضعیت پرداخت را نمایش دهید */}
              <div className="order-review-item ps-3">
                {order.payment_status &&
                order.payment_status.toLowerCase() === "پرداخت شده" ? (
                  <span className="text-green">پرداخت شده</span>
                ) : (
                  <span className="text-danger">پرداخت نشده</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCart;
