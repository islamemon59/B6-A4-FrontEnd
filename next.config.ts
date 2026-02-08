import type { NextConfig } from "next";

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
        destination: `${process.env.BACKEND_API}/api/auth/:path*`,
      },
      {
        source: "/api/v1/:path*",
        destination: `${process.env.BACKEND_API}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
