import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/rose", destination: "/fiori/rose", permanent: true }];
  },
};

export default nextConfig;
