import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  outputFileTracingRoot: path.join(__dirname),
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
