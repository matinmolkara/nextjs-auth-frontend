// api.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/api"; // URL بک‌اند خود را وارد کنید

export const getProducts = async (filters = {}) => {
  let url = `${BASE_URL}/products`;
  const params = new URLSearchParams();
  if (filters.categoryId) {
    params.append("categoryId", filters.categoryId);
  }
   if (params.toString()) {
     url += "?" + params.toString();
   }
   try {
     console.log("Fetching products from URL:", url); // لاگ کردن آدرس برای اطمینان
     const response = await axios.get(url);
     return response.data;
   } catch (error) {
     console.error("Error fetching products:", error);
     // بهتر است خطا را پرتاب کنید تا بتوانید در ProductContext آن را مدیریت کنید
     // اما طبق کد قبلی شما، خالی برگرداندن هم یک گزینه است.
     // برای عیب یابی، پرتاب کردن خطا اطلاعات بیشتری می دهد.
     throw error;
     // return [];
   }
};

export const getBrands = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/brands`);
    return response.data;
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const getColors = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/colors`);
    return response.data;
  } catch (error) {
    console.error("Error fetching colors:", error);
    return [];
  }
};
export const getProductColors = async (productId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/products/${productId}/colors`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching product colors:", error);
    return [];
  }
};
export const getProductSizes = async (productId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/products/${productId}/sizes`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching product sizes:", error);
    return [];
  }
};
export const getSizes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/sizes`);
    return response.data;
  } catch (error) {
    console.error("Error fetching sizes:", error);
    return [];
  }
};
//توابع api را به همین شکل برای دریافت سایر داده ها اضافه کنید.
export const getAddresses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/addresses`);
    return response.data;
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return [];
  }
};
export const getProvinces = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/provinces`);
    return response.data;
  } catch (error) {
    console.error("Error fetching provinces:", error);
    return [];
  }
};
export const getCities = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/cities`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
};
export const getUserOrders = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/orders/me`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error; // بهتر است خطا را پرتاب کنید تا در کامپوننت مدیریت شود
  }
};

export const getOrderById = async (orderId) => {
  try {
    const response = await axios.get(`${BASE_URL}/orders/${orderId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching order with ID ${orderId}:`, error);
    throw error;
  }
};


// توابع مربوط به سبد خرید (بدون withCredentials)
export const getCart = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/cart`, {
          withCredentials: true, // ⬅️ حتماً اضافه شود
        });
        return response.data;
    } catch (error) {
        console.error("خطا در دریافت سبد خرید:", error);
        throw error;
    }
};

export const addToCart = async (productId, quantity = 1, color = null, size = null) => {
    try {
        const colorValueToSend = typeof color === 'object' && color !== null ? color.name : color;
        const payload = { productId, quantity };
        if (colorValueToSend) payload.color = colorValueToSend;
        if (size) payload.size = size;
        await axios.post(
          `${BASE_URL}/cart/add`,
          {
            withCredentials: true, // ⬅️ حتماً اضافه شود
          },
          payload
        );
        return { success: true }; // بازگرداندن یک مقدار برای اطلاع از موفقیت
    } catch (error) {
        console.error("خطا در افزودن محصول:", error);
        throw error;
    }
};

export const removeFromCart = async (productId, color, size) => {
    try {
        const payload = { productId };
        const colorValue = typeof color === "object" && color !== null ? color.name : color;
        if (colorValue) payload.color = colorValue;
        if (size) payload.size = size;
        await axios.post(
          `${BASE_URL}/cart/remove`,
          {
            withCredentials: true, // ⬅️ حتماً اضافه شود
          },
          payload
        );
        return { success: true };
    } catch (error) {
        console.error("خطا در حذف محصول:", error);
        throw error;
    }
};

export const updateCartProductCount = async (productId, quantity, color, size) => {
    try {
        const payload = { productId, quantity };
        const colorValue = typeof color === "object" && color !== null ? color.name : color;
        if (colorValue) payload.color = colorValue;
        if (size) payload.size = size;
        await axios.post(
          `${BASE_URL}/cart/update`,
          {
            withCredentials: true, // ⬅️ حتماً اضافه شود
          },
          payload
        );
        return { success: true };
    } catch (error) {
        console.error("خطا در بروزرسانی تعداد:", error);
        throw error;
    }
};

export const clearCart = async () => {
    try {
        await axios.post(`${BASE_URL}/cart/clear`, {
          withCredentials: true, // ⬅️ حتماً اضافه شود
        });
        return { success: true };
    } catch (error) {
        console.error("خطا در پاکسازی سبد:", error);
        throw error;
    }
};
export const getProductById = async (productId) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
};
export const getOrCreateGuestCart = async () => {
  const res = await axios.get("http://localhost:5000/api/cart", {
    withCredentials: true,
  });
  return res.data;
};

