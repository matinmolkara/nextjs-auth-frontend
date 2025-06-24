"use client";
import { useAuth } from "@/context/authContext";
import { useRouter, usePathname } from "next/navigation";
import React ,{useEffect,useState} from "react";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user === null) return;

    // کاربر غیر لاگین → بره لاگین
    if (!user) {
      router.replace("/users/login");
    }

    // کاربر یوزر ولی مسیر ادمین اومده → بره profile
    else if (user.role === "user" && pathname.startsWith("/admin-panel")) {
      router.replace("/profile");
    }

    // کاربر ادمین ولی مسیر profile اومده → بره داشبورد
    else if (user.role === "admin" && pathname.startsWith("/profile")) {
      router.replace("/admin-panel/dashboard");
    }

    setLoading(false);
  }, [user, pathname]);

  if (loading || !user) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        در حال بررسی سطح دسترسی...
      </div>
    );
  }

  return children;
};

export default ProtectedRoute