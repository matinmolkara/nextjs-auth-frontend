// app/layout.js
"use client";

import { usePathname } from "next/navigation";
import SidebarMenu from "@/components/SidebarMenu";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ProductProvider } from "@/context/ProductContext";
import { CartProvider } from "@/context/cartContext";
import { AuthProvider } from "@/context/authContext";
import { useEffect } from "react";
import FetchCartOnAuth from "@/components/FetchCartOnAuth";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const noLayoutRoutes = [
    "/users/login",
    "/users/register",
    "/users/changepassword",
    "/users/newpassword",
    "/users/checkmail",
  ]; // مسیرهایی که نباید لایوت داشته باشند

  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          {noLayoutRoutes.includes(pathname) ? (
            <>{children}</> // حذف هدر، فوتر و سایدبار برای صفحات خاص
          ) : (
            <>
              <SidebarMenu />
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
