import React, { useContext } from "react";
import styles from "../../styles/components/Cart.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Using next/navigation for app router
import { AuthContext } from "@/context/authContext"; // Assuming you have an AuthContext

const CheckoutButton = () => {
  const router = useRouter();
  const { isAuthenticated } = useContext(AuthContext); // Assuming isAuthenticated state in AuthContext

  const handleCheckoutClick = () => {
    if (isAuthenticated) {
      router.push("/checkout/shipping");
    } else {
      // نمایش پیغام به کاربر (می‌توانید از یک modal یا state محلی برای نمایش پیغام استفاده کنید)
      alert("برای ادامه فرآیند پرداخت، لطفاً وارد حساب کاربری خود شوید.");
      // هدایت کاربر به صفحه ورود
      router.push("/users/login"); // مسیر صفحه ورود شما
    }
  };

  return (
    <div className="">
      <button className={styles.btnPayment} onClick={handleCheckoutClick}>
        پرداخت
      </button>
    </div>
  );
};

export default CheckoutButton;
