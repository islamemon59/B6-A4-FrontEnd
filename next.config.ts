import type { NextConfig } from "next";

const backendApi =
  process.env.NODE_ENV === "production"
    ? process.env.BACKEND_API
    : process.env.LOCAL_BACKEND_API || "http://localhost:5000";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${backendApi}/api/auth/:path*`,
      },
      {
        source: "/api/v1/:path*",
        destination: `${backendApi}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
