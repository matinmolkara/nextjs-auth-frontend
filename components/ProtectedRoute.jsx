"use client";
import { useAuth } from "@/context/authContext";
import { useRouter, usePathname } from "next/navigation";
import React ,{useEffect,useState} from "react";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    // کاربر غیر لاگین → بره لاگین
    if (!user) {
      router.replace("/users/login");
      return;
    }

    // ✅ کاربر عادی به صفحه ادمین دسترسی داره → برو profile
    if (adminOnly && user.role !== "admin") {
      router.replace("/profile");
      return;
    }

    // ✅ کاربر عادی به مسیر ادمین دسترسی داره → برو profile
    if (user.role === "user" && pathname.startsWith("/admin-panel")) {
      router.replace("/profile");
      return;
    }

    // ✅ کاربر ادمین به profile رفته → برو dashboard
    if (user.role === "admin" && pathname.startsWith("/profile")) {
      router.replace("/admin-panel/dashboard");
      return;
    }

    // ✅ همه چیز درسته، صفحه رو نمایش بده
    setShouldRender(true);
  }, [user, isLoading, pathname, adminOnly, router]);

  // ✅ تا زمانی که user load نشده یا redirect در حال انجامه، loading نشان بده
  if (isLoading || !shouldRender) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        در حال بررسی سطح دسترسی...
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;