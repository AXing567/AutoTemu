import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // API 代理配置（解决 CORS）
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "http://localhost:8000/api/v1/:path*",
      },
    ];
  },

  // 环境变量
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  },

  // 实验性功能
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;
