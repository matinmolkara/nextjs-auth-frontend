// app/layout.js
"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import SidebarMenu from "@/components/SidebarMenu";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ProductProvider } from "@/context/ProductContext";
import { CartProvider } from "@/context/cartContext";
import { AuthProvider } from "@/context/authContext";
import { useEffect } from "react";
import FetchCartOnAuth from "@/components/FetchCartOnAuth";
import { getCategories } from "@/app/api/api";
export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const noLayoutRoutes = [
    "/users/login",
    "/users/register",
    "/users/changepassword",
    "/users/newpassword",
    "/users/checkmail",
  ]; // مسیرهایی که نباید لایوت داشته باشند
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const allDataResponse = await getCategories({ pageSize: 1000 });
      setCategories(allDataResponse.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const buildCategoryTree = (categories, parentId = null) => {
    const tree = [];
    for (const category of categories) {
      if (category.parent_id === parentId) {
        const children = buildCategoryTree(categories, category.id);
        if (children.length > 0) {
          category.children = children;
        } else {
          delete category.children;
        }
        tree.push(category);
      }
    }
    return tree;
  };

  const nestedCategories = buildCategoryTree(categories);
  useEffect(() => {
    fetchCategories();
  },[])


  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          {noLayoutRoutes.includes(pathname) ? (
            <>{children}</> // حذف هدر، فوتر و سایدبار برای صفحات خاص
          ) : (
            <>
              <SidebarMenu categories={nestedCategories} />
              <Header />
              {children}
              <Footer />
            </>
          )}
          <FetchCartOnAuth /> {/* فراخوانی fetchCart در کامپوننت فرزند */}
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
}
