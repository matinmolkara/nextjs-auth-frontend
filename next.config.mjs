/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    remotePatterns: [
      process.env.NODE_ENV === "development"
        ? {
            protocol: "http",
            hostname: "localhost",
            port: "5000",
            pathname: "/uploads/**",
          }
        : {
            protocol: "https",
            hostname: "nextjs-auth-backend.onrender.com",
            pathname: "/uploads/**",
          },
    ],
  },
};

export default nextConfig;
