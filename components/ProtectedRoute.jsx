"use client";
import { useAuth } from "@/context/authContext";
import { useRouter, usePathname } from "next/navigation";
import React ,{useEffect} from "react";

const ProtectedRoute = () => {
    const { user } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      // تا وقتی user لود نشده هیچ کاری نکن
      if (user === null) return;

      // کاربر لاگین نیست
      if (!user) {
        router.push("/users/login");
      }

      // اگر adminOnly هست و نقش کاربر admin نیست
      else if (adminOnly && user.role !== "admin") {
        router.push("/profile");
      }

      // اگر admin هست و داره مسیر اشتباه می‌ره (مثلاً به /profile)
      else if (user.role === "admin" && pathname.startsWith("/profile")) {
        router.push("/admin-panel/dashboard");
      }

      // اگر user هست و داره می‌ره تو مسیر admin-panel
      else if (user.role === "user" && pathname.startsWith("/admin-panel")) {
        router.push("/profile");
      }
    }, [user, pathname]);

    if (!user) return null;

    return children;
}

export default ProtectedRoute