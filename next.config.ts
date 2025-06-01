import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client"],
  },
  images: {
    domains: ["oaidalleapiprodscus.blob.core.windows.net"],
  },
};

export default nextConfig;
