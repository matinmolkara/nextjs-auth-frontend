"use client";
export default function AdminLayout({ children }) {
  return (

      <div className="admin-layout">
        {/* اگر بخواهی سایدبار/ناوبری اضافه کنی، اینجاست */}
        {children}
      </div>
 
  );
}
