import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // Tambahkan baris ini
  allowedDevOrigins: ["192.168.0.101"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.simpleicons.org" }],
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;