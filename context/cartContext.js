"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  getCart,
  addToCart as apiAddToCart,
  removeFromCart as apiRemoveFromCart,
  updateCartProductCount as apiUpdateCartProductCount,
  clearCart as apiClearCart,
  getOrCreateGuestCart,
  mergeGuestCart,
  getProductById,
} from "@/app/api/api";
import { useAuth } from "@/context/authContext";

const CartContext = createContext(undefined);

const generateCartItemId = (productId, color, size) => {
   const colorKey = color
     ? typeof color === "object"
       ? color.name
       : color
     : "noColor";
   const sizeKey = size || "noSize";
   return `${productId}-${colorKey}-${sizeKey}`;
};

export const CartProvider = ({ children }) => {
  const [isCartLoading, setIsCartLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  // *** اضافه شده: وضعیت برای نگهداری شناسه سبد خرید
  const [cartId, setCartId] = useState(null);
  const [isCartLoadedFromServer, setIsCartLoadedFromServer] = useState(false);
  const { user } = useAuth();

  const loadLocalCart = useCallback(() => {
    try {
      const localCart = localStorage.getItem("guestCart");
      return localCart ? JSON.parse(localCart) : [];
    } catch (error) {
      console.error("Error loading local cart:", error);
      return [];
    }
  }, []);

  const saveLocalCart = (items) => {
    try {
      localStorage.setItem("guestCart", JSON.stringify(items));
    } catch (error) {
      console.error("Error saving local cart:", error);
    }
  };

  const updateCartInContext = (newItems) => {
    setCartItems(newItems);
    saveLocalCart(newItems);
  };

const fetchCartFromServer = useCallback(async () => {
  setIsCartLoading(true);
  if (!user) {
    const localItems = loadLocalCart();
    setCartItems(localItems);
    // *** در حالت مهمان، cartId را null قرار می‌دهیم
    setCartId(null);
    setIsCartLoading(false);
    return;
  }
  try {
    // *** اصلاح شده: انتظار داریم getCart شیئی شامل cartId و items برگرداند
    const res = await getCart();
    // *** استخراج cartId و items از پاسخ
    const serverCartId = res.cartId;
    const serverItems = res.items || [];

    const itemsWithIds = serverItems.map((item) => ({
      ...item,
      id: generateCartItemId(item.product_id, item.color, item.size),
    }));
    itemsWithIds.sort((a, b) => a.id.localeCompare(b.id));

    // *** به‌روزرسانی وضعیت‌ها
    setCartItems(itemsWithIds);
    // *** به‌روزرسانی وضعیت cartId
    setCartId(serverCartId);
    setIsCartLoadedFromServer(true);
    setIsCartLoading(false);
  } catch (error) {
    console.error("خطا در دریافت سبد خرید از سرور:", error);
    const localItems = loadLocalCart();
    setCartItems(localItems);
    // *** در صورت خطا نیز cartId را null قرار می‌دهیم (یا وضعیت قبلی را نگه می‌داریم، اما null منطقی‌تر است)
    setCartId(null);
    setIsCartLoading(false);
  }
}, [user, loadLocalCart]);


  const addToCart = async (
    productId,
    quantity = 1,
    color = null,
    size = null
  ) => {
    const colorValueToSend =
      typeof color === "object" && color !== null ? color.name : color;
    const itemId = generateCartItemId(productId, colorValueToSend, size);

    if (user) {
      try {
        await getOrCreateGuestCart();
        await apiAddToCart(productId, quantity, colorValueToSend, size);
        await fetchCartFromServer();
      } catch (error) {
        console.error("خطا در افزودن به سبد سرور:", error);
      }
    } else {
      const existingItemIndex = cartItems.findIndex(
        (item) => item.id === itemId
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
            id: itemId,
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
    const itemId = generateCartItemId(productId, color, size);
    if (user) {
      try {
        await apiRemoveFromCart(productId, color, size);
        await fetchCartFromServer();
      } catch (error) {
        console.error("خطا در حذف از سبد سرور:", error);
      }
    } else {
      const newCartItems = cartItems.filter((item) => item.id !== itemId);
      updateCartInContext(newCartItems);
    }
  };

  const updateCartProductCount = async (productId, quantity, color, size) => {
    const itemId = generateCartItemId(productId, color, size);
    if (user) {
      try {
        await apiUpdateCartProductCount(productId, quantity, color, size);
        await fetchCartFromServer();
      } catch (error) {
        console.error("خطا در بروزرسانی سبد سرور:", error);
        const newCartItems = cartItems.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        );
        updateCartInContext(newCartItems);
      }
    } else {
      const newCartItems = cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
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
      }
    } else {
      updateCartInContext([]);
      setCartId(null);
    }
  };

  useEffect(() => {
    const handleCartMergeOnLogin = async () => {
      if (user && !isCartLoadedFromServer) {
        const guestCart = loadLocalCart();
        if (guestCart.length > 0) {
          try {
            await mergeGuestCart(guestCart);
            localStorage.removeItem("guestCart");
          } catch (error) {
            console.error("خطا در ادغام سبد مهمان:", error);
          }
        }
        await fetchCartFromServer();
      } else if (!user) {
        const localItems = loadLocalCart();
        localItems.sort((a, b) => a.id.localeCompare(b.id)); // Sort local cart too
        setCartItems(localItems);
        setCartId(null);
      }
    };
    handleCartMergeOnLogin();
  }, [user, isCartLoadedFromServer, fetchCartFromServer]);



 useEffect(() => {
   fetchCartFromServer();
 
 }, [fetchCartFromServer]);



  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartProductCount,
        clearCart,
        fetchCart: fetchCartFromServer,
        isCartLoading,
        cartId,
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
