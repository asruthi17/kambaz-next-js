import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.staradvertiser.com"], // add external image hostname here
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;