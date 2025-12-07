import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.staradvertiser.com"], 
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;