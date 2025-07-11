export const dynamic = "force-dynamic";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import Script from "next/script";
import ClientLayout from "@/components/ClientLayout";
import { ErrorProvider } from "@/context/ErrorContext";
import ErrorToast from "@/components/ErrorToast";

export const metadata = {
  title: "فروشگاه آنلاین",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <body>
      <ErrorProvider> <ClientLayout>{children}</ClientLayout></ErrorProvider>
      
        <Script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"></Script>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"></Script>
      </body>
    </html>
  );
}
