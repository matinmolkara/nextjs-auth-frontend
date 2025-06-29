"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { mergeGuestCart } from "@/app/api/api";
import { useError } from "@/context/ErrorContext";
import { handleApiError } from "../utils/errorHandler"

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addError } = useError(); // استفاده از error context

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${BASE_URL}/api/auth/me`, {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (error) {
      console.log("User not authenticated");
      setUser(null);
    } finally {
      setIsLoading(false);
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

      await fetchUser();
      return user;
    } catch (error) {
      console.error("Login failed:", error);
      const processedError = handleApiError(error);
      addError(processedError); // نمایش خطا به جای alert
      throw processedError;
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      setUser(null);
      await axios.post(
        `${BASE_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
      const processedError = handleApiError(error);
      addError(processedError);
      // حتی اگر خطا داشت، user را null کن
      setUser(null);
      router.push("/");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email, password, name) => {
    try {
      await axios.post(`${BASE_URL}/api/auth/register`, {
        email,
        password,
        name,
      });
      router.push(`/users/checkmail?email=${email}`);
    } catch (error) {
      console.error("Registration failed:", error);
      const processedError = handleApiError(error);
      addError(processedError); // نمایش خطا به جای alert
      throw processedError; // خطا را throw کن تا component بتواند handle کند
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        fetchUser,
        isLoading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
