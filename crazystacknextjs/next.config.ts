import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname:
          "crazystack.571527a8590aad1eb25dc5b3338c4271.r2.cloudflarestorage.com",
      },
    ],
  },
};

export default nextConfig;
