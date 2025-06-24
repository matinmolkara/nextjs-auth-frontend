"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <ProtectedRoute adminOnly>{children}</ProtectedRoute>
    </div>
  );
}
