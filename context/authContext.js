"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      fetch("http://localhost:5000/api/auth/profile", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => setUser(data.user));
    }
  }, []);

  async function login(email, password) {
     try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (data.user) {
      Cookies.set("token", data.token, { expires: 7 });
      setUser(data.user);
      console.log(user);
    } else {
      // مدیریت خطا در صورت عدم وجود کاربر
      console.error("Login failed:", data.message);
    }
     } catch (error) {
      // مدیریت خطاهای شبکه یا سایر خطاها
      console.error("Error during login:", error);
    }
  }
  async function register(email, password, name) {
     try {
       const res = await fetch("http://localhost:5000/api/auth/register", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         credentials: "include",
         body: JSON.stringify({ email, password, name }),
       });

       const data = await res.json();
       if (data.user) {
         Cookies.set("token", data.token, { expires: 7 });
         setUser(data.user);
       } else {
         // مدیریت خطا در صورت عدم وجود کاربر
         console.error("Registration failed:", data.message);
       }
     } catch (error) {
       // مدیریت خطاهای شبکه یا سایر خطاها
       console.error("Error during registration:", error);
     }
  }

  function logout() {
    fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => {
      Cookies.remove("token");
      setUser(null);
    });
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
