// api.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/api"; // URL بک‌اند خود را وارد کنید

export const getProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
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
