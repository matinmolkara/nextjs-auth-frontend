// api.js
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
 // URL بک‌اند خود را وارد کنید

// api.js
export const getProducts = async (filters = {}) => {
  let url = `${BASE_URL}/products`;
  const params = new URLSearchParams();

  if (filters.search) params.append("search", filters.search);
  if (filters.categoryId) params.append("categoryId", filters.categoryId);
  if (filters.page) params.append("page", filters.page);
  if (filters.pageSize) params.append("pageSize", filters.pageSize);
  if (filters.brand) params.append("brand", filters.brand);

  if (filters.available) params.append("inventory", "1"); // فقط وقتی کاربر فیلتر فعال کرده

  if (filters.specialOffer !== undefined)
    params.append("special_offer", filters.specialOffer ? "true" : "false"); // جدید
  if (filters.bestSeller !== undefined)
    params.append("bestSeller", filters.bestSeller ? "true" : "false");

  if (params.toString()) {
    url += "?" + params.toString();
  }


  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};



export const getBrands = async (filters = {}) => {
  let url = `${BASE_URL}/brands`;
  const params = new URLSearchParams();

  if (filters.search) params.append("search", filters.search);
  if (filters.page) params.append("page", filters.page);
  if (filters.pageSize) params.append("pageSize", filters.pageSize);

  if (params.toString()) {
    url += "?" + params.toString();
  }

  const response = await axios.get(url);
  return response.data; // { brands, totalCount }
};

export const createBrand = async (brandName) => {
  try {
    const response = await axios.post(`${BASE_URL}/brands`, {
      name: brandName,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating brand:", error);
    return [];
  }
}
export const getBrandById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/brands/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching brand by ID:", error);
    throw error;
  }
};

// api.js
export const updateBrand = async (id, brandName) => {
  try {
    const response = await axios.put(`${BASE_URL}/brands/${id}`, {
      name: brandName,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating brand:", error);
    throw error;
  }
};

export const deleteBrand = async (brandId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/brands/${brandId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting brand:", error);
    return [];
  }
}
export const getProductsByBrandId = async (brandId) => {
  try {
    const res = await axios.get(`${BASE_URL}/products/brand/${brandId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching products for brand", error);
    return [];
  }
};


export const getCategories = async (filters = {}) => {
  let url = `${BASE_URL}/categories`;
  const params = new URLSearchParams();

  if (filters.search) params.append("search", filters.search);
  if (filters.level1_id) params.append("level1_id", filters.level1_id);
  if (filters.level2_id) params.append("level2_id", filters.level2_id);
  if (filters.level3_id) params.append("level3_id", filters.level3_id);
  if (filters.page) params.append("page", filters.page);
  if (filters.pageSize) params.append("pageSize", filters.pageSize);

  if (params.toString()) {
    url += "?" + params.toString();
  }

  try {
    const response = await axios.get(url);
    return response.data;
     // خروجی باید شامل { categories, totalCount } باشد
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};


export const getCategoryById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching category by ID:", error);
    throw error;
  }
}
export const createCategory = async (categoryName,parent_id) => {
  try {
    const response = await axios.post(`${BASE_URL}/categories`, {
      name: categoryName,
      parent_id:parent_id,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    return [];
  }
}
export const updateCategory = async (categoryId, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/categories/${categoryId}`, {
      name: data.name,
      parent_id: data.parent_id,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
}
export const deleteCategory = async (categoryId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    return [];
  }
}
export const getProductCategoriesByCategoryId = async (categoryId) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/productcategories/category/${categoryId}`
    );
    return res.data;
  } catch (err) {
    console.error("Error fetching products for category", err);
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

export const createColor = async (colorName, colorCode) => {
  try {
    const response = await axios.post(`${BASE_URL}/colors`, {
      name: colorName,
      code: colorCode,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating color:", error);
  }
}

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

export const createSize = async (sizeName ,typeName) => {
  try {
    const response = await axios.post(`${BASE_URL}/sizes`, {
      size: sizeName,
      type:typeName,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating size:", error);
  }
}

export const deleteSize = async (sizeId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/sizes/${sizeId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting size:", error);
    return [];
  }
}

//توابع api را به همین شکل برای دریافت سایر داده ها اضافه کنید.
export const getAddresses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/addresses`, {
      withCredentials: true,
    });
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
export const getAdminOrders = async (params = { page: 1, limit: 10 }) => {
  try {
    const response = await axios.get(`${BASE_URL}/orders/admin/orders`, {
      params,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching admin orders:", error);
    throw error;
  }
};



export const updateOrderStatus = async (orderId, { orderStatus, paymentStatus, notes }) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/orders/${orderId}/status`,
      {
        orderStatus,
        paymentStatus,
        notes,
      },
      {
        withCredentials: true,
      }
    );
    return response.data; // یا response.data.data اگر نیاز بود
  } catch (error) {
    console.error(`خطا در به‌روزرسانی سفارش ${orderId}:`, error);
    throw error;
  }
};


export const deleteOrder = async (orderId) => {
  try {
    const res = await axios.delete(`${BASE_URL}/orders/${orderId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("خطا در حذف سفارش:", err);
    throw err;
  }
};





// توابع مربوط به سبد خرید (بدون withCredentials)
export const getCart = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/cart`, {
      withCredentials: true,
    });
    // *** اصلاح شده: انتظار داریم پاسخ شامل data.cartId و data.items باشد
    if (response.data && response.data.data) {
      // فرض می‌کنیم بک‌اند شیء `{ success: true, data: { cartId: '...', items: [...] } }` برمی‌گرداند
      return {
        cartId: response.data.data.cartId,
        items: response.data.data.items || [],
      };
    } else {
      // اگر ساختار پاسخ متفاوت است، این قسمت را تنظیم کنید
      console.warn("ساختار پاسخ API /api/cart غیرمنتظره است:", response.data);
      return { cartId: null, items: [] }; // یا یک خطا پرتاب کنید
    }
  } catch (error) {
    console.error("خطا در دریافت سبد خرید از سرور:", error);
    if (error.response?.status === 401) {
      return { cartId: null, items: [] }; // سبد خالی برای مهمان یا کاربر احراز هویت نشده
    }
    throw error; // پرتاب خطا برای مدیریت در Context
  }
};

export const addToCart = async (productId, quantity, color , size ) => {
    try {
        // const colorValueToSend = typeof color === 'object' && color !== null ? color.name : color;
        const payload = { productId, quantity, color, size };
        // if (colorValueToSend) payload.color = colorValueToSend;
        // if (size) payload.size = size;
        await axios.post(
          `${BASE_URL}/cart/add`,

          payload,
          {
            withCredentials: true,
          }
        );
        return { success: true };
    } catch (error) {
        console.error("خطا در افزودن به سبد خرید:", error);
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
          
          payload,
          {
            withCredentials: true, 
          },
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
          
          payload,{
            withCredentials: true, 
          },
        );
        return { success: true };
    } catch (error) {
        console.error("خطا در بروزرسانی تعداد:", error);
        throw error;
    }
};

export const clearCart = async () => {
    try {
        await axios.post(`${BASE_URL}/cart/clear`,
          {},
          { withCredentials: true, }
        );
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
  const res = await axios.get(`${BASE_URL}/cart`, {
    withCredentials: true,
  });
  return res.data;
};
export const mergeGuestCart = async (items) => {
  try {
    await axios.post(
      `${BASE_URL}/cart/merge`,
      { items },
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.error("خطا در ادغام سبد مهمان:", error);
    throw error;
  }
};

export const createAddressApi = async (address) => {
  try {
    const response = await axios.post(`${BASE_URL}/addresses`, address, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("خطا در ایجاد آدرس:", error);
    throw error;
  }
};

export const updateAddressApi = async (addressId, address) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/addresses/${addressId}`,
      address,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("خطا در ویرایش آدرس:", error);
    throw error;
  }
};

export const deleteAddressApi = async (addressId) => {
  try {
    await axios.delete(`${BASE_URL}/addresses/${addressId}`, {
      withCredentials: true,
    });
  } catch (error) {
    console.error("خطا در حذف آدرس:", error);
    throw error;
  }
};

export const setDefaultAddressApi = async (addressId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/addresses/set-default`,
      { addressId },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("خطا در تنظیم آدرس پیش‌فرض:", error);
    throw error;
  }
};

// دریافت توضیحات کلی برای یک محصول
export const getProductGeneralDescriptions = async (productId) => {
  try {
    const res = await axios.get(`${BASE_URL}/products/${productId}/descriptions`);
    return res.data;
  } catch (error) {
    console.error("Error fetching general descriptions:", error);
    return [];
  }
};
// دریافت ویژگی‌های فنی محصول (attribute values)
export const getProductAttributes = async (productId) => {
  try {
    const res = await axios.get(`${BASE_URL}/products/${productId}/attributes`);
    return res.data;
  } catch (error) {
    console.error("Error fetching product attributes:", error);
    return [];
  }
};

// دریافت ویژگی‌های مورد نیاز دسته خاص (برای فرم ساخت محصول)
export const getCategoryAttributes = async (categoryId) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/attributes/categories/${categoryId}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching category attributes:", error);
    return [];
  }
};
export const getAllAttributes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/attributes`);
    return response.data;
  } catch (error) {
    console.error("Error fetching attributes:", error);
    return [];
  }
};
export const saveCategoryAttributes = async ({ category_id, attributes }) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/attributes/categories/${category_id}/attributes`,
      {
        attributes,
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error saving category attributes:",
      err.response?.data || err.message
    );
    throw error;
  }
};
export const createAttributeKey = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/attributes`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating attribute:", error);
    throw error;
  }
};

export const deleteAttributeKey = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/attributes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting attribute:", error);
    throw error;
  }
};
// api.js
export const addProduct = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/products`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const updateProduct = async (id, formData) => {
  try {
    const response = await axios.put(`${BASE_URL}/products/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

export const getUsers = async (params) => {
  try {
    const response = await axios.get(`${BASE_URL}/users`, {
      params,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export const getUserById = async (id) => {
  const response = await axios.get(`${BASE_URL}/users/${id}`, {
    withCredentials: true,
  });
  return response.data;
}

export const updateUser = async (id, data) => {
  const response = await axios.put(`${BASE_URL}/users/${id}`, data, {
    withCredentials: true,
  });
  return response.data; 
}

export const createUser = async (data) => {
  const response = await axios.post(`${BASE_URL}/users`, data, {
    withCredentials: true,
  });
  return response.data;
}

export const getUserCount = async () => {
  const response = await axios.get(`${BASE_URL}/users/count`, {
    withCredentials: true,
  });
  return response.data;
}

 
export const getPages = async (params) => {
  try {
    const response = await axios.get(`${BASE_URL}/pages`, {
      params,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching pages:", error);
    throw error;
  }
}
export const getPageBySlug = async (slug) => {
  try {
    const response = await axios.get(`${BASE_URL}/pages/${slug}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching page:", error);
    throw error;
  }
}

export const createPage = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/pages`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating page:", error);
    throw error;
  }
}

export const updatePage = async (id, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/pages/${id}`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating page:", error);
    throw error;
  }
}

export const deletePage = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/pages/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting page:", error);
    throw error;
  }
}


export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file); // 'file' با upload.single("file") هم‌خوانی داره

  const response = await axios.post(`${BASE_URL}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const data = response.data;
  if (!data.success) throw new Error("آپلود تصویر ناموفق بود");
  return data.path;
};

export const sendContactMessage = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/contact`, data);

    return res.data;
  } catch (err) {
    console.error("❌ خطا در ارسال پیام تماس:", err);
    throw err;
  }
};
export const getContactMessages = async () => {
  const res = await axios.get(`${BASE_URL}/contact`);
  return res.data.data;
};

export const getContactMessageById = async (id) => {
  const res = await axios.get(`${BASE_URL}/contact/${id}`);

  return res.data.data;
};

export const deleteContactMessage = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/contact/${id}`);
    return res.data;
  } catch (err) {
    console.error("خطا در حذف پیام تماس:", err);
    throw err;
  }
};

export const resendVerificationEmail = async (email) => {

  const response = await axios.post(
    `${BASE_URL}/auth/resend-verification`,
    { email },
    {
      withCredentials: true,
    }
  );
  return response.data;
};
export const verifyEmail = async (token) => {
  const response = await axios.get(`${BASE_URL}/auth/verify-email`, {
    params: { token },
    withCredentials: true,
  });
  return response.data;
};