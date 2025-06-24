"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import "../../styles/profile.css";
export default function ProfileLayout({children}) {
  return (
    <ProtectedRoute>{children}</ProtectedRoute>
  );
}
