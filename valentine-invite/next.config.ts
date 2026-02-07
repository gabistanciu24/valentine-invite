import type { NextConfig } from "next";

const repo =
  process.env.NEXT_PUBLIC_REPO_NAME || process.env.GITHUB_REPO_NAME || "";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd && repo ? `/${repo}` : "",
  assetPrefix: isProd && repo ? `/${repo}/` : "",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
