"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
export default function AdminLayout({ children }) {
  return (
 
      <ProtectedRoute adminOnly>{children}</ProtectedRoute>
    
  );
}
