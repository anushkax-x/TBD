import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  transpilePackages: ["@consultancy/shared"],
  outputFileTracingRoot: path.join(__dirname, "../.."),
};

export default nextConfig;
