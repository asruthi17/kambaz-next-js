import type { NextConfig } from "next";

const nextConfig: NextConfig & {
  eslint?: {
    ignoreDuringBuilds?: boolean;
  };
} = {
  reactStrictMode: true,
  images: {
    domains: ["www.staradvertiser.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
