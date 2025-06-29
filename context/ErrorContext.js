// context/ErrorContext.js
"use client";
import { createContext, useContext, useState } from "react";

const ErrorContext = createContext();

export function ErrorProvider({ children }) {
  const [errors, setErrors] = useState([]);

  const addError = (error) => {
    const errorWithId = {
      id: Date.now() + Math.random(), // ID یکتا
      message: error.message || "خطایی رخ داده است",
      code: error.code || "UNKNOWN_ERROR",
      timestamp: new Date().toISOString(),
      ...error,
    };
    setErrors((prev) => [...prev, errorWithId]);

    // خودکار حذف کردن بعد از 5 ثانیه
    setTimeout(() => {
      removeError(errorWithId.id);
    }, 5000);
  };

  const removeError = (id) => {
    setErrors((prev) => prev.filter((error) => error.id !== id));
  };

  const clearAllErrors = () => {
    setErrors([]);
  };

  const value = {
    errors,
    addError,
    removeError,
    clearAllErrors,
  };

  return (
    <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
  );
}

// Custom Hook
export const useError = () => {
  const context = useContext(ErrorContext);

  if (context === undefined) {
    throw new Error("useError must be used within an ErrorProvider");
  }

  return context;
};

// Export default هم اضافه کنیم
export default ErrorProvider;
