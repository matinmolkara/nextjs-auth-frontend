// context/ProductContext.js
"use client";
import { useRouter } from "next/router";
import React, { createContext, useState } from "react";

// ایجاد context
export const ProductContext = createContext();

// کامپوننت provider
export const ProductProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [products, setProducts] = useState([
    {
      id: 1,
      imgSrc: "/images/hero/bestoffer3.png",
      title: "کفش فوتسال مردانه تن زیب مدل TID9602",
      price: "1386000",
      realPrice: "1800000",
      discount: "24%",
      specialOffer: true,
    },
    {
      id: 2,
      imgSrc: "/images/brands/1.png",
      title: "کفش فوتسال مردانه تن زیب مدل TID9602",
      price: "1386000",
      realPrice: "1800000",
      discount: "24%",
      specialOffer: false,
    },
    {
      id: 3,
      imgSrc: "/images/brands/2.png",
      title: "کفش فوتسال مردانه تن زیب مدل TID9602",
      price: "1386000",
      realPrice: "1800000",
      discount: "24%",
      specialOffer: true,
    },
  ]);
  const productColors = [
    { name: "آبی", code: "#006cff" },
    { name: "قرمز", code: "#fc3e39" },
    { name: "مشکی", code: "#171717" },
    { name: "زرد", code: "#fff600" },
    { name: "صورتی", code: "#ff00b4" },
  ];
  const shoeSizes = [
    { size: "36", available: true },
    { size: "37", available: false },
    { size: "38", available: true },
    { size: "39", available: true },
  ];

  const shirtSizes = [
    { size: "S", available: true },
    { size: "M", available: true },
    { size: "L", available: false },
    { size: "XL", available: true },
    { size: "XXL", available: false },
  ];
  // پیدا کردن محصول انتخاب‌شده بر اساس شناسه
  const getProductById = (id) => {
    return products.find((product) => product.id === parseInt(id, 10));
  };

  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleFilterChange = (sortOption) => {
    let sortedProducts = [...products];
    if (sortOption === "price") {
      sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortOption === "newest") {
      sortedProducts.sort((a, b) => b.dateAdded - a.dateAdded); // فرض تاریخ اضافه‌شدن
    } else if (sortOption === "bestseller") {
      sortedProducts.sort((a, b) => b.sales - a.sales); // فرض تعداد فروش
    }
    setFilteredProducts(sortedProducts);
  };
  const [brands, setBrands] = useState([
    "نایک",
    "پوما",
    "آدیداس",
    "اسکیچرز",
    "نیوبالانس",
    "ریباک",
  ]);
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

  const [productImages, setProductImages] = useState([
    "/images/brands/1.png",
    "/images/brands/2.png",
    "/images/brands/3.png",
    "/images/brands/4.png",
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

  const addToCart = (product, selectedColor, selectedSize) => {
    setCartProducts((prevProducts) => {
      const existingProduct = prevProducts.find(
        (p) =>
          p.id === product.id &&
          p.color === selectedColor &&
          p.size === selectedSize
      );

      if (existingProduct) {
        return prevProducts.map((p) =>
          p.id === product.id &&
          p.color === selectedColor &&
          p.size === selectedSize
            ? { ...p, count: p.count + 1 }
            : p
        );
      } else {
        return [
          ...prevProducts,
          { ...product, count: 1, color: selectedColor, size: selectedSize },
        ];
      }
    });
    console.log("محصول به سبد خرید اضافه شد", {
      ...product,
      color: selectedColor,
      size: selectedSize,
    });
    console.log(cartProducts);
    console.log("محصول به تابع ارسال شده:", product);
  };

  const removeFromCart = (id) => {
    setCartProducts((prevProducts) => {
      const productExists = prevProducts.some((product) => product.id === id);

      if (!productExists) {
        console.warn(`محصول با شناسه ${id} یافت نشد!`);
        return prevProducts; // بازگشت سبد خرید بدون تغییر
      }

      return prevProducts.filter((product) => product.id !== id);
    });
  };

  const updateCartProductCount = (id, count) => {
    if (count < 0) {
      console.warn("تعداد محصول نمی‌تواند منفی باشد!");
      return;
    }

    setCartProducts((prevProducts) => {
      const productExists = prevProducts.some((product) => product.id === id);

      if (!productExists) {
        console.warn(`محصول با شناسه ${id} یافت نشد!`);
        return prevProducts;
      }

      if (count === 0) {
        // حذف محصول اگر تعداد آن 0 شود
        return prevProducts.filter((product) => product.id !== id);
      }

      // به‌روزرسانی تعداد محصول
      return prevProducts.map((product) =>
        product.id === id ? { ...product, count } : product
      );
    });
  };

  const [addresses, setAddressess] = useState([
    {
      id: 1,
      reciever: "زهرا ملک آرا",
      province: "مازندران",
      city: "شهرستان بهشهر",
      fullAddress: "خیابان امام خمینی جنب کوچه شهید رضیعی",

      buildingNum: 2,
      unitNum: 3,
      zipCode: 4851889156,
      tel: +989365251806,
    },
    {
      id: 2,
      reciever: "زهرا ملک آرا",
      province: "مازندران",
      city: "شهرستان بهشهر",
      fullAddress: "خیابان امام خمینی جنب کوچه شهید رضیعی",

      buildingNum: 2,
      unitNum: 3,
      zipCode: 4851889156,
      tel: +989365251806,
    },
  ]);

  const [provinces] = useState([
    { id: 1, name: "مازندران" },
    { id: 2, name: "تهران" },
  ]);

  const [cities] = useState([
    { id: 1, name: "ساری", provinceId: 1 },
    { id: 2, name: "بابل", provinceId: 1 },
    { id: 3, name: "بهشهر", provinceId: 1 },
    { id: 4, name: "قائمشهر", provinceId: 1 },
    { id: 5, name: "تنکابن", provinceId: 1 },
    { id: 6, name: "آمل", provinceId: 1 },
    { id: 7, name: "تهران", provinceId: 2 },
    { id: 8, name: "کرج", provinceId: 2 },
    { id: 9, name: "اسلام‌شهر", provinceId: 2 },
    { id: 10, name: "بهارستان", provinceId: 2 },
  ]);

  const [shippingRates] = useState({
    مازندران: 500000,
    تهران: 700000,
  });
  const calculateShippingPrice = (province) => {
    return shippingRates[province] || 0; // بازگشت مقدار پیش‌فرض در صورت عدم تطابق
  };

  const [discountValue, setDiscountValue] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(null); // آدرس انتخاب‌شده برای ویرایش
  const [isEditMode, setIsEditMode] = useState(false); // حالت افزودن یا ویرایش

  return (
    <ProductContext.Provider
      value={{
        products,
        getProductById,
        setProducts,
        cartProducts,
        productImages,
        setProductImages,
        addToCart,
        removeFromCart,
        updateCartProductCount,
        filteredProducts,
        handleFilterChange,
        relatedProducts,
        setRelatedProducts,
        comments,
        setComments,
        brands,
        setBrands,
        productColors,
        shoeSizes,
        shirtSizes,
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
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
