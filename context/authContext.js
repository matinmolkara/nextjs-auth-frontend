"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  
  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/me", {
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
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      localStorage.removeItem("guestCart"); // پاکسازی سبد خرید مهمان بعد از ورود
      await fetchUser();

      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error, e.g., set an error state
      alert("ورود ناموفق. لطفاً ایمیل و رمز عبور را بررسی کنید.");
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
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
      await axios.post("http://localhost:5000/api/auth/register", {
        // Corrected registration route
        email,
        password,
        name,
      });
      await login(email, password);
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
      value={{ user, login, logout, register, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
