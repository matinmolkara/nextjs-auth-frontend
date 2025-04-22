"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {
  getCart,
  addToCart as apiAddToCart,
  removeFromCart as apiRemoveFromCart,
  updateCartProductCount as apiUpdateCartProductCount,
  clearCart as apiClearCart,
} from "@/app/api/api";
import { getProductById } from "@/app/api/api";

import { useAuth } from "@/context/authContext";
const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
const { user } = useAuth();

  const loadLocalCart = () => {
    try {
      const localCart = localStorage.getItem("guestCart");
      return localCart ? JSON.parse(localCart) : [];
    } catch (error) {
      console.error("Error loading local cart:", error);
      return [];
    }
  };

  const saveLocalCart = (items) => {
    try {
      localStorage.setItem("guestCart", JSON.stringify(items));
    } catch (error) {
      console.error("Error saving local cart:", error);
    }
  };

  const fetchCartFromServer = async () => {
    try {
      const res = await getCart();
      
      const items = res.data?.data?.items || res.data?.items || [];
    
      setCartItems(items);
    } catch (error) {
      console.error("خطا در دریافت سبد خرید از سرور:", error);
      // اگر کاربر وارد نشده و خطایی در دریافت از سرور رخ داد، سبد محلی را بارگیری کنید
      if (!user) {
        setCartItems(loadLocalCart());
      }
    }
  };


const ensureGuestCartOnServer = async () => {
  try {
    const res = await getOrCreateGuestCart(); // ست شدن guestCartId توسط سرور
    // این فقط لازمه یک بار اجرا بشه در شروع اضافه به سبد
  } catch (error) {
    console.error("خطا در ساخت سبد مهمان سمت سرور:", error);
  }
};



  const updateCartInContext = (newItems) => {
    setCartItems(newItems);
    saveLocalCart(newItems);
  };

  const addToCart = async (
    productId,
    quantity = 1,
    color = null,
    size = null,
    
  ) => {
    const colorValueToSend =
      typeof color === "object" && color !== null ? color.name : color;
    const newItem = {
      product_id: productId,
      quantity,
      color: colorValueToSend,
      size,
    };

    if (user) {
      try {
        await ensureGuestCartOnServer();
        await apiAddToCart(productId, quantity, colorValueToSend, size);
        await fetchCartFromServer();
      } catch (error) {
        console.error("خطا در افزودن به سبد سرور:", error);
        // در صورت خطا در سرور، سبد محلی را به‌روزرسانی کنید (به عنوان fallback)
        const existingItemIndex = cartItems.findIndex(
          (item) =>
            item.product_id === productId &&
            (item.color
              ? item.color === colorValueToSend
              : !colorValueToSend) &&
            (item.size ? item.size === size : !size)
        );

        if (existingItemIndex > -1) {
          const newCartItems = [...cartItems];
          newCartItems[existingItemIndex].quantity += quantity;
          updateCartInContext(newCartItems);
        } else {
          updateCartInContext([...cartItems, newItem]);
        }
      }
    } else {
      // کاربر مهمان: به‌روزرسانی سبد محلی
      const existingItemIndex = cartItems.findIndex(
        (item) =>
          item.product_id === productId &&
          (item.color ? item.color === colorValueToSend : !colorValueToSend) &&
          (item.size ? item.size === size : !size)
      );

      if (existingItemIndex > -1) {
        const newCartItems = [...cartItems];
        newCartItems[existingItemIndex].quantity += quantity;
        updateCartInContext(newCartItems);
      } else {
        try {
          const productData = await getProductById(productId);
          if (!productData) throw new Error("محصول یافت نشد");
          const fullItem = {
            product_id: productId,
            quantity,
            color: colorValueToSend,
            size,
            title: productData.title,
            price: productData.price,
            image_urls: productData.image_urls || [],
          };

          updateCartInContext([...cartItems, fullItem]);
        } catch (err) {
          console.error("خطا در واکشی اطلاعات محصول:", err);
        }
      }
    }
  };

  const removeFromCart = async (productId, color, size) => {
    if (user) {
      try {
        await apiRemoveFromCart(productId, color, size);
        await fetchCartFromServer();
      } catch (error) {
        console.error("خطا در حذف از سبد سرور:", error);
        // در صورت خطا در سرور، سبد محلی را به‌روزرسانی کنید (به عنوان fallback)
        const newCartItems = cartItems.filter(
          (item) =>
            !(
              item.product_id === productId &&
              (item.color ? item.color === color : !color) &&
              (item.size ? item.size === size : !size)
            )
        );
        updateCartInContext(newCartItems);
      }
    } else {
      // کاربر مهمان: به‌روزرسانی سبد محلی
      const newCartItems = cartItems.filter(
        (item) =>
          !(
            item.product_id === productId &&
            (item.color ? item.color === color : !color) &&
            (item.size ? item.size === size : !size)
          )
      );
      updateCartInContext(newCartItems);
    }
  };

  const updateCartProductCount = async (productId, quantity, color, size) => {
    if (user) {
      try {
        await apiUpdateCartProductCount(productId, quantity, color, size);
        await fetchCartFromServer();
      } catch (error) {
        console.error("خطا در بروزرسانی سبد سرور:", error);
        // در صورت خطا در سرور، سبد محلی را به‌روزرسانی کنید (به عنوان fallback)
        const newCartItems = cartItems.map((item) =>
          item.product_id === productId &&
          (item.color ? item.color === color : !color) &&
          (item.size ? item.size === size : !size)
            ? { ...item, quantity }
            : item
        );
        updateCartInContext(newCartItems);
      }
    } else {
      // کاربر مهمان: به‌روزرسانی سبد محلی
      const newCartItems = cartItems.map((item) =>
        item.product_id === productId &&
        (item.color ? item.color === color : !color) &&
        (item.size ? item.size === size : !size)
          ? { ...item, quantity }
          : item
      );
      updateCartInContext(newCartItems);
    }
  };

  const clearCart = async () => {
    if (user) {
      try {
        await apiClearCart();
        await fetchCartFromServer();
      } catch (error) {
        console.error("خطا در پاکسازی سبد سرور:", error);
        // در صورت خطا در سرور، سبد محلی را پاک کنید (به عنوان fallback)
        updateCartInContext([]);
      }
    } else {
      // کاربر مهمان: پاکسازی سبد محلی
      updateCartInContext([]);
    }
  };

  useEffect(() => {
    // بارگیری سبد محلی در ابتدا
    const initialLocalCart = loadLocalCart();
    setCartItems(initialLocalCart);

    // اگر کاربر وارد شد، تلاش برای دریافت سبد از سرور
    if (user) {
      fetchCartFromServer();
    }
  }, [user]); // وابستگی به user تا بعد از ورود سبد از سرور fetch شود

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartProductCount,
        clearCart,
        fetchCart: fetchCartFromServer, // نام تابع fetch را واضح تر کردیم
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error(
      "useCartContext باید فقط در داخل CartProvider استفاده شود."
    );
  }
  return context;
};
