"use client"; // این کامپوننت باید کلاینتی باشد

import { usePathname } from "next/navigation";
import SidebarMenu from "@/components/SidebarMenu";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ProductProvider } from "@/context/ProductContext";


export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const noLayoutRoutes = [
    "/users/login",
    "/users/register",
    "/users/changepassword",
    "/users/newpassword",
    "/users/checkmail",
  ]; // مسیرهایی که نباید لایوت داشته باشند

  if (noLayoutRoutes.includes(pathname)) {
    return <>{children}</>; // حذف هدر، فوتر و سایدبار برای صفحات خاص
  }

  return (
    <>
      
        <ProductProvider>
          <SidebarMenu />
          <Header />
          {children}
        </ProductProvider>
     
      <Footer />
    </>
  );
}
