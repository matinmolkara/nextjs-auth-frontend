"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { mergeGuestCart } from "@/app/api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();
  const [user, setUser] = useState(null);
  
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/auth/me`, {
        withCredentials: true,
      });
      setUser(res.data);
 
    } catch {
      setUser(null);
    }
  };

  const login = async (email, password) => {
    try {
      await axios.post(
        `${BASE_URL}/api/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      const guestCart = localStorage.getItem("guestCart");
      if (guestCart) {
        const parsed = JSON.parse(guestCart);
        if (parsed.length > 0) {
          await mergeGuestCart(parsed);
        }
        localStorage.removeItem("guestCart");
      }

      const userData = await fetchUser(); // 👈 نتیجه fetchUser را برگردان
      return userData; // ✅ کاربر برگشت داده میشه
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };
  
  
  const logout = async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle logout error, e.g., set an error state
      alert("خطا در خروج از حساب کاربری.");
    }
  };

  const register = async (email, password, name) => {
    try {
      await axios.post(`${BASE_URL}/api/auth/register`, {
        // Corrected registration route
        email,
        password,
        name,
      });
      // await login(email, password);
      router.push(`/users/checkmail?email=${email}`);
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle registration error, e.g., set an error state
      alert("ثبت‌نام ناموفق. لطفاً اطلاعات را بررسی کنید.");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register,fetchUser , isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
