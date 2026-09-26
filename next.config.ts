import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow phone/LAN access to dev resources (HMR, fonts, JS chunks) during local testing
  allowedDevOrigins: ["192.168.1.9"],
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
