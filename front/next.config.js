/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "**", // Permite qualquer domínio HTTPS (ajuste conforme necessário)
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store" },
          { key: "Pragma", value: "no-cache" },
          { key: "Expires", value: "0" },
        ],
      },
      {
        source: "/videos/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store" },
          { key: "Pragma", value: "no-cache" },
          { key: "Expires", value: "0" },
        ],
      },
    ]
  },
  webpack: (config) => {
    const path = require("path")
    config.resolve = config.resolve || {}
    config.resolve.alias = config.resolve.alias || {}
    config.resolve.alias["@medusajs/ui"] = path.join(__dirname, "src/lib/shims/medusa-ui.js")
    config.resolve.alias["@medusajs/icons"] = path.join(__dirname, "src/lib/shims/medusa-icons.js")
    config.resolve.alias["@modules/common/components/divider"] = path.join(__dirname, "src/lib/shims/common-divider.js")
    config.resolve.alias["@modules/common/icons/chevron-down"] = path.join(__dirname, "src/lib/shims/icons/chevron-down.js")
    config.resolve.alias["@modules/common/icons/x"] = path.join(__dirname, "src/lib/shims/icons/x.js")
    config.resolve.alias["@modules/common/icons/back"] = path.join(__dirname, "src/lib/shims/icons/back.js")
    config.resolve.alias["@modules/common/icons/fast-delivery"] = path.join(__dirname, "src/lib/shims/icons/fast-delivery.js")
    config.resolve.alias["@modules/common/icons/refresh"] = path.join(__dirname, "src/lib/shims/icons/refresh.js")
    return config
  },
}

module.exports = nextConfig
