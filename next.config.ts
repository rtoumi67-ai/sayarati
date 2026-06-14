import type { NextConfig } from "next";

const supabaseHostname = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : null;

const nextConfig: NextConfig = {
  experimental: {
    // Disable dev filesystem cache because the project lives in OneDrive on Windows.
    turbopackFileSystemCacheForDev: false,
    optimizePackageImports: ["lucide-react"],
  },
  turbopack: {
    // يزيل تحذير تحديد الجذر عند وجود lockfile آخر خارج المشروع
    root: __dirname,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [72, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "coresg-normal.trae.ai",
        pathname: "/api/ide/v1/text_to_image",
      },
      ...(supabaseHostname
        ? [
            {
              protocol: "https" as const,
              hostname: supabaseHostname,
              pathname: "/storage/v1/object/**",
            },
          ]
        : []),
    ],
  },
};

export default nextConfig;
