"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/authContext";
import React, { createContext, useState, useEffect, useCallback, Suspense } from "react";
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
  createAddressApi,
  updateAddressApi,
  deleteAddressApi,
  setDefaultAddressApi,
  getProductGeneralDescriptions,
  getProductAttributes,
  getCategoryAttributes,
} from "../app/api/api";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    categoryId: null,
    brand: null,
    available: false, // یعنی inventory > 0
    specialOffer: false, // به جای discount
    bestSeller: false,
  });
  

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [productColors, setProductColors] = useState([]);
  const [productSizes, setProductSizes] = useState([]);
  const [productAttributes, setProductAttributes] = useState([]);
  const [productDescriptions, setProductDescriptions] = useState([]);

  const [addresses, setAddressess] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [shippingRates, setShippingRates] = useState({});
  const [orders, setOrders] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [discountValue, setDiscountValue] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [comments, setComments] = useState([]);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fetchProducts = useCallback(async (filters = {}) => {
    try {
      const response = await getProducts(filters);
      const productsData = (response.products || []).map((p) => ({
        ...p,
        price: parseFloat(p.price) || 0,
      }));
      setProducts(productsData);
      setFilteredProducts(productsData);
     

    } catch (error) {
      setProducts([]);
      setFilteredProducts([]);
    }
  }, []);

  useEffect(() => {
    const categoryId = searchParams.get("categoryId");
    const brand = searchParams.get("brand");
    const inventory = searchParams.get("inventory"); // جدید
    const specialOffer = searchParams.get("special_offer"); // جدید
    const bestSeller = searchParams.get("bestSeller");

    const urlFilters = {
      categoryId: categoryId || null,
      brand: brand || null,
      available: inventory === "1", // یعنی فقط محصولاتی که inventory > 0
      specialOffer: specialOffer === "true", // یعنی فقط special_offer=true
      bestSeller: bestSeller === "true",
    };

    setFilters(urlFilters);
    fetchProducts(urlFilters);
  }, [searchParams, fetchProducts]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const brandsData = await getBrands({ pageSize: 1000 });
        setBrands(brandsData.brands || []);

        const categoriesResponse = await getCategories({ pageSize: 1000 });
        setCategories(categoriesResponse.categories || []);

        const colorsData = await getColors();
        setColors(colorsData);
        const sizesData = await getSizes();
        setSizes(sizesData);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };
    fetchInitialData();
  }, []);

  
  const handleFilterChange = useCallback(
    (filterName, value) => {
      setFilters((prev) => {
        const newFilters = { ...prev, [filterName]: value };
        const queryParams = new URLSearchParams();

        if (newFilters.categoryId)
          queryParams.append("categoryId", newFilters.categoryId);
        if (newFilters.brand) queryParams.append("brand", newFilters.brand);
        if (newFilters.available) queryParams.append("inventory", "1"); // به جای available
        if (newFilters.specialOffer)
          queryParams.append("special_offer", "true"); // به جای discount
        if (newFilters.bestSeller) queryParams.append("bestSeller", "true");

        const url = `/products?${queryParams.toString()}`;
        window.history.replaceState(null, "", url);
      

        fetchProducts(newFilters);
        return newFilters;
      });
    },
    [fetchProducts]
  );
  // مدیریت رنگ و سایز محصول
  useEffect(() => {
    const pathParts = pathname.split("/");
    const productId = pathParts[pathParts.length - 1];
    if (!productId || isNaN(Number(productId))) {
      setProductColors([]);
      setProductSizes([]);
      return;
    }
    async function fetchColorsAndSizes() {
      try {
        const [colors, sizes] = await Promise.all([
          getProductColors(productId),
          getProductSizes(productId),
        ]);
        setProductColors(colors);
        setProductSizes(sizes);
      } catch (error) {
        console.error("Error fetching colors/sizes:", error);
        setProductColors([]);
        setProductSizes([]);
      }
    }
    fetchColorsAndSizes();
  }, [pathname]);

  // مدیریت ویژگی‌ها و توضیحات
  useEffect(() => {
    const pathParts = pathname.split("/");
    const productId = pathParts[pathParts.length - 1];
    if (!productId || isNaN(Number(productId))) return;

    async function fetchProductDetails() {
      try {
        const [attributes, descriptions] = await Promise.all([
          getProductAttributes(productId),
          getProductGeneralDescriptions(productId),
        ]);
        setProductAttributes(attributes);
        setProductDescriptions(descriptions);
      } catch (error) {
        console.error("Error fetching attributes/descriptions:", error);
      }
    }
    fetchProductDetails();
  }, [pathname]);

  // مدیریت آدرس، استان، شهر
  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setAddressess([]);
        setProvinces([]);
        setCities([]);
        return;
      }
      const [addrRes, provRes, cityRes] = await Promise.all([
        getAddresses(),
        getProvinces(),
        getCities(),
      ]);
      setAddressess(addrRes);
      setProvinces(provRes);
      setCities(cityRes);

      const rates = {};
      for (const province of provRes) {
        rates[province.name] = province.shipping_price;
      }
      setShippingRates(rates);
    };
    fetchData();
  }, [user]);

  const setDefaultAddress = async (addressId) => {
    try {
      await setDefaultAddressApi(addressId);
      setAddressess((prev) =>
        prev.map((addr) =>
          addr.id === addressId
            ? { ...addr, is_default: true }
            : { ...addr, is_default: false }
        )
      );
    } catch (error) {
      console.error("Error setting default address:", error);
    }
  };

  const addOrUpdateAddress = async (address, isEdit = false) => {
    try {
      const response = isEdit
        ? await updateAddressApi(address.id, address)
        : await createAddressApi(address);
      setAddressess((prev) =>
        isEdit
          ? prev.map((addr) => (addr.id === address.id ? response : addr))
          : [...prev, response]
      );
      return response;
    } catch (error) {
      console.error("Error adding/updating address:", error);
    }
  };

  const deleteAddress = async (addressId) => {
    try {
      await deleteAddressApi(addressId);
      setAddressess((prev) => prev.filter((addr) => addr.id !== addressId));
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  // مدیریت سفارشات
  const fetchUserOrders = useCallback(async () => {
    try {
      const ordersData = await getUserOrders();
      setOrders(ordersData.data);
    } catch (error) {
      console.error("Error fetching user orders:", error);
      setOrders([]);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      setOrders([]);
      return;
    }
    fetchUserOrders();
  }, [user, fetchUserOrders]);

  const calculateShippingPrice = useCallback(
    (province) => {
      return shippingRates[province] || 0;
    },
    [shippingRates]
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductContext.Provider
        value={{
          products,
          filteredProducts,
          filters,
          fetchProducts,
          handleFilterChange,
          getProductById: (id) =>
            products.find((p) => p.id === parseInt(id, 10)) || null,
          setProducts,
          productImages: [],
          setProductImages: () => {},
          brands,
          setBrands,
          categories,
          setCategories,
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
          deleteAddress,
          setDefaultAddress,
          addOrUpdateAddress,
          paymentMethod,
          setPaymentMethod,
          productAttributes,
          setProductAttributes,
          productDescriptions,
          setProductDescriptions,
          comments,
          setComments,
          relatedProducts,
          setRelatedProducts,
        }}
      >
        {children}
      </ProductContext.Provider>
    </Suspense>
  );
};
