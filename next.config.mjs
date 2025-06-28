/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    remotePatterns: [
      // برای حالت توسعه
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },
      // فایل‌های آپلود شده روی بک‌اند
      {
        protocol: "https",
        hostname: "nextjs-auth-backend.onrender.com",
        pathname: "/uploads/**",
      },
      // 👇 اضافه شده برای فایل‌های Supabase
      {
        protocol: "https",
        hostname: "kazcgjoncnemsnizbmfg.supabase.co",
        pathname: "/storage/v1/object/public/product-images/**",
      },
    ],
  },
};

export default nextConfig;
