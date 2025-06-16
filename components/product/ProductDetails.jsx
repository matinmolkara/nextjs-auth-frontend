import React from 'react'
import styles from "../../styles/components/ProductGrid.module.css";
import Link from 'next/link';

const ProductDetails = ({comments,product,productAttributes}) => {
 
  // اضافه کردن مقدار پیش‌فرض برای جلوگیری از خطا هنگام دسترسی به پراپرتی‌های product اگر null باشد
  const safeProduct = product || {};

  const { title, price, real_price } = safeProduct; // price اینجا number است, real_price رشته است



  const formatPrice = (priceInput) => {
    // تبدیل ورودی به عدد قبل از بررسی نوع (برای مدیریت رشته‌های عددی مثل real_price)
    const numericValue = parseFloat(priceInput);

    if (typeof numericValue !== "number" || isNaN(numericValue)) {
      console.warn(
        "DETAILS: formatPrice received invalid input or failed parse:",
        priceInput
      );
      return "نامعتبر";
    }
    return `${numericValue.toLocaleString("fa-IR")} تومان`;
  };

  // محاسبه درصد تخفیف (اختیاری)
  const calculateDiscount = () => {
    const numericPrice = parseFloat(price);
    const numericRealPrice = parseFloat(real_price);
    if (
      numericRealPrice &&
      numericPrice < numericRealPrice &&
      numericRealPrice > 0
    ) {
      return Math.round(
        ((numericRealPrice - numericPrice) / numericRealPrice) * 100
      );
    }
    return null; // یا 0 اگر تخفیفی نیست
  };
  const discountPercent = calculateDiscount();

  return (
    <div>
      <div className="product-detail-shop">
        <h4>{title}</h4>
        <div className="product-detail-shop-reviews">
          <span>
            <Link href="#"> ثبت نظر </Link>
          </span>
          <span>
            <span>{comments}</span>
            <span>نظر</span>
          </span>
          <span>
            <div className="brand-cart-ranking-star">
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star"></i>
            </div>
          </span>
        </div>
      </div>
      <div className="product-detail-shop">
        <div className={styles.brandCartFirstOffPercent}>
          {/* نمایش قیمت اصلی (باید درست کار کند) */}
          <span className={styles.brandCartPrice}>{formatPrice(price)}</span>

          {/* نمایش قیمت قبلی (خط خورده) - با استفاده از real_price */}
          {/* فقط اگر قیمت قبلی با قیمت فعلی متفاوت است نمایش بده */}
          {real_price && parseFloat(real_price) !== price && (
            <span className={styles.brandCartRealPrice}>
              {formatPrice(real_price)}{" "}
              {/* formatPrice الان رشته را هم مدیریت می‌کند */}
            </span>
          )}

          {/* نمایش درصد تخفیف محاسبه شده */}
          {discountPercent && discountPercent > 0 && (
            <span className={styles.brandCartOffPercent}>
              {" "}
              {discountPercent}%{" "}
            </span>
          )}
        </div>
        <div className="product-detail-shop-property">
          <ul>
            {productAttributes?.slice(0, 3).map((attr) => (
              <li key={attr.id}>
                <span>{attr.name}:</span>
                <span>{attr.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails