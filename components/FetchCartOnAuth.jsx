// components/FetchCartOnAuth.tsx
"use client";

import { useEffect } from "react";
import { useCartContext } from "@/context/cartContext";
import { useAuth } from "@/context/authContext";

export default function FetchCartOnAuth() {
  const { fetchCart } = useCartContext();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user, fetchCart]);

  return null;
}
