import React, {useState, useContext} from 'react'
import { ProductContext } from "@/context/ProductContext";
import styles from "../../styles/components/Cart.module.css";
const DiscountSection = () => {
  const { setDiscountValue } = useContext(ProductContext);
  const [voucher, setVoucher] = useState("");
  const [message, setMessage] = useState(""); // پیام برای کاربر
  const applyDiscount = () => {
    if (voucher === "DISCOUNT10") {
      setDiscountValue(10000); // اعمال مقدار تخفیف برای کد مشخص
      setMessage("کد تخفیف با موفقیت اعمال شد!"); // پیام موفقیت
    } else if (voucher.trim() === "") {
      setMessage("لطفاً کد تخفیف را وارد کنید."); // پیام خطا برای کد خالی
    } else {
      setDiscountValue(0); // اگر کد معتبر نباشد
      setMessage("کد تخفیف وارد شده نامعتبر است."); // پیام خطا برای کد نامعتبر
    }
  };
  return (
    <div>
      <div className={styles.voucher}>
        <div className={styles.voucherGroup}>
          <input
            type="text"
            className=""
            placeholder="کد تخفیف"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            value={voucher}
            onChange={(e) => setVoucher(e.target.value)}
          />
          <button
            className="btn"
            type="button"
            id="button-addon2"
            onClick={applyDiscount}
          >
            اعمال کد تخفیف
          </button>
        </div>
        {message && <p className={styles.message}>{message}</p>}{" "}
        {/* نمایش پیام */}
      </div>
    </div>
  );
};

export default DiscountSection