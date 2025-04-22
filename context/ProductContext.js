// context/ProductContext.js
"use client";

import { usePathname, useSearchParams } from "next/navigation";
import React, { createContext, useState, useEffect, useCallback } from "react";
import {
  getProducts,
  getBrands,
  getCategories,
  getColors,
  getSizes,
  getProductColors,
  getProductSizes,
  getAddresses,
  getCities,
  getProvinces,
  getUserOrders,
} from "../app/api/api"; // ایجاد api.js
// ایجاد context
export const ProductContext = createContext();

// کامپوننت provider
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

  const [productImages, setProductImages] = useState([]);
  const [productColors, setProductColors] = useState([]);
  const [productSizes, setProductSizes] = useState([]);

  const [addresses, setAddressess] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [shippingRates, setShippingRates] = useState({});

  const [orders, setOrders] = useState([]); // State for orders

  const pathname = usePathname();
  const searchParams = useSearchParams(); // استفاده از useSearchParams در Provider

  // تعریف تابع fetchProducts که می‌تواند فیلترها را بپذیرد
  // از useCallback استفاده می‌کنیم تا از بازآفرینی غیرضروری تابع جلوگیری شود
  const fetchProducts = useCallback(async (filters = {}) => {
    try {
      console.log("CONTEXT: Fetching products with filters:", filters);
      // فرض می‌کنیم تابع getProducts در api.js می‌تواند یک آبجکت فیلتر بپذیرد
      // شما نیاز دارید این تابع را در api.js به‌روزرسانی کنید تا پارامتر filters را مدیریت کند
      const productsData = ((await getProducts(filters)) || []).map((p) => ({
        ...p,
        // تبدیل قیمت به عدد، در صورت ناموفق بودن 0 در نظر بگیر
        price: parseFloat(p.price) || 0,
      }));

      console.log("CONTEXT: Fetched productsData:", productsData);
      setProducts(productsData);
      setFilteredProducts(productsData); // مقداردهی اولیه filteredProducts با داده‌های فیلتر شده
    } catch (error) {
      console.error("CONTEXT: Error fetching products:", error);
      setProducts([]); // در صورت خطا لیست محصولات را خالی کن
      setFilteredProducts([]);
    }
  }, []); // آرایه وابستگی خالی به معنای اینکه تابع یک بار تعریف می‌شود

  useEffect(() => {
    async function fetchInitialData() {
      // دریافت محصولات بدون فیلتر در بارگذاری اولیه Context
      // اگر می‌خواهید در بارگذاری اولیه هم بر اساس URL فیلتر شود،
      // می‌توانید categoryId را اینجا از searchParams بگیرید و به fetchProducts بفرستید.
      // اما معمولاً فیلترینگ URL در صفحه خاص (ProductList) انجام می‌شود.
      fetchProducts({}); // دریافت همه محصولات در بارگذاری اولیه Context

      // دریافت سایر داده‌ها که به فیلتر محصولات بستگی ندارند
      try {
        const brandsData = await getBrands();
        setBrands(brandsData);
        const categoriesData = await getCategories();
        setCategories(categoriesData);
        const colorsData = await getColors();
        setColors(colorsData);
        const sizesData = await getSizes();
        setSizes(sizesData);
      } catch (error) {
        console.error(
          "CONTEXT: Error fetching initial supporting data:",
          error
        );
      }
    }
    fetchInitialData();
    // fetchProducts را به عنوان dependency اضافه نمی‌کنیم چون از useCallback استفاده شده با آرایه خالی
  }, [fetchProducts]); // fetchProducts به عنوان dependency اضافه می‌شود چون useCallback استفاده شده.

  // useEffect برای دریافت رنگ‌های محصول (فرض می‌شود برای صفحه جزئیات محصول استفاده می‌شود)
  useEffect(() => {
    const pathParts = pathname.split("/");
    const productId = pathParts[pathParts.length - 1];
    console.log(`📦 دریافت رنگ‌های محصول برای ID: ${productId}`);
    if (!productId || isNaN(Number(productId))) {
      setProductColors([]); // اگر ID نامعتبر است، رنگ‌ها را خالی کن
      return; // جلوگیری از ارسال درخواست نامعتبر
    }
    async function fetchColors() {
      try {
        const productColorsData = await getProductColors(productId);
        console.log(
          `🎨 رنگ‌های دریافت‌شده برای محصول ${productId}:`,
          productColorsData
        );
        setProductColors(productColorsData);
      } catch (error) {
        console.error("❌ خطا در دریافت رنگ‌های محصول:", error);
        setProductColors([]);
      }
    }
    fetchColors();
  }, [pathname]); // وابسته به pathname

  // useEffect برای دریافت سایزهای محصول (فرض می‌شود برای صفحه جزئیات محصول استفاده می‌شود)
  useEffect(() => {
    const pathParts = pathname.split("/");
    const productId = pathParts[pathParts.length - 1];
    console.log(`📦 دریافت سایزهای محصول برای ID: ${productId}`);
    if (!productId || isNaN(Number(productId))) {
      setProductSizes([]); // اگر ID نامعتبر است، سایزها را خالی کن
      return; // جلوگیری از ارسال درخواست نامعتبر
    }
    async function fetchSizes() {
      try {
        const productSizesData = await getProductSizes(productId);
        console.log(
          `🎨 سایزهای دریافت‌شده برای محصول ${productId}:`,
          productSizesData
        );
        setProductSizes(productSizesData);
      } catch (error) {
        console.error("❌ خطا در دریافت سایزهای محصول:", error);
        setProductSizes([]);
      }
    }
    fetchSizes();
  }, [pathname]); // وابسته به pathname
  useEffect(() => {
    const fetchData = async () => {
      const [addrRes, provRes, cityRes] = await Promise.all([
        getAddresses(),
        getProvinces(),
        getCities(),
      ]);
      setAddressess(addrRes);
      setProvinces(provRes);
      setCities(cityRes);

      // ساخت map از هزینه‌های ارسال
      const rates = {};
      for (const province of provRes) {
        rates[province.name] = province.shipping_price;
      }
      setShippingRates(rates);
    };
    fetchData();
  }, []);

  // پیدا کردن محصول انتخاب‌شده بر اساس شناسه
  const getProductById = useCallback(
    (id) => {
      if (!products.length) return null;
      // از find استفاده می‌کنیم و id را به عدد تبدیل می‌کنیم
      return (
        products.find((product) => product.id === parseInt(id, 10)) || null
      );
    },
    [products]
  ); // وابسته به products

  const handleFilterChange = useCallback(
    (sortOption) => {
      let sortedProducts = [...products]; // مرتب‌سازی همیشه بر اساس لیست کامل products انجام شود
      if (sortOption === "price") {
        sortedProducts.sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
      } else if (sortOption === "newest") {
        // فرض تاریخ اضافه‌شدن: نیاز به فیلد dateAdded در داده محصولات
        sortedProducts.sort(
          (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)
        );
      } else if (sortOption === "bestseller") {
        // فرض تعداد فروش: نیاز به فیلد sales در داده محصولات
        sortedProducts.sort((a, b) => b.sales - a.sales);
      }
      setFilteredProducts(sortedProducts);
    },
    [products] // وابسته به products تا زمانی که لیست محصولات تغییر کند تابع به‌روز شود
  );

  const [comments, setComments] = useState([
    {
      user: "زهرا ملک آرا",
      date: "14 آبان 1403",
      rating: 3,
      text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ.",
      response: null,
    },
    {
      user: "زهرا ملک آرا",
      date: "14 آبان 1403",
      rating: 4,
      text: "لورم ایپسوم متن ساختگی با تولید سادگی.",
      response: "با تشکر از ثبت نظر بله این کالا موجود هست.",
    },
  ]);

  const [relatedProducts, setRelatedProducts] = useState([
    {
      id: 1,
      imgSrc: "/images/hero/bestoffer3.png",
      title: "کفش فوتسال مردانه تن زیب مدل TID9602",
      price: "1,386,000 تومان",
      realPrice: "1800,000 تومان",
      discount: "24%",
      specialOffer: true,
    },
    {
      id: 2,
      imgSrc: "/images/brands/1.png",
      title: "کفش فوتسال مردانه تن زیب مدل TID9602",
      price: "1,386,000 تومان",
      realPrice: "1800,000 تومان",
      discount: "24%",
      specialOffer: false,
    },
    {
      id: 3,
      imgSrc: "/images/brands/2.png",
      title: "کفش فوتسال مردانه تن زیب مدل TID9602",
      price: "1,386,000 تومان",
      realPrice: "1800,000 تومان",
      discount: "24%",
      specialOffer: true,
    },
  ]);

  const calculateShippingPrice = useCallback(
    (province) => {
      return shippingRates[province] || 0; // بازگشت مقدار پیش‌فرض در صورت عدم تطابق
    },
    [shippingRates]
  ); // وابسته به shippingRates

  const [discountValue, setDiscountValue] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(null); // آدرس انتخاب‌شده برای ویرایش
  const [isEditMode, setIsEditMode] = useState(false); // حالت افزودن یا ویرایش

  const fetchUserOrders = useCallback(async () => {
    try {
      const ordersData = await getUserOrders();
      setOrders(ordersData.data); // Assuming your backend returns data in a 'data' field
    } catch (error) {
      console.error("CONTEXT: Error fetching user orders:", error);
      setOrders([]);
    }
  }, []);

  // useEffect(() => {
  //   // async function fetchInitialData() {
 
  //   //   fetchUserOrders();
  //   // }
  //   fetchInitialData();
  //   // ... سایر وابستگی ها ...
  // }, [fetchProducts, fetchUserOrders]); // Add fetchUserOrders as a dependency

  return (
    <ProductContext.Provider
      value={{
        products,
        getProducts, // <--- Optional: If you need the raw fetch function outside
        fetchProducts,
        getProductById,
        setProducts,
        productImages,
        setProductImages,
        filteredProducts,
        handleFilterChange,
        relatedProducts,
        setRelatedProducts,
        comments,
        setComments,
        brands,
        setBrands,
        categories,
        sizes,
        colors,
        addresses,
        setAddressess,
        provinces,
        cities,
        calculateShippingPrice,
        discountValue,
        setDiscountValue,
        selectedAddress,
        setSelectedAddress,
        isEditMode,
        setIsEditMode,
        productColors,
        setProductColors,
        productSizes,
        setProductSizes,
        orders,
        fetchUserOrders,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
