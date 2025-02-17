/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["tiles.printvision.cloud"],
  },
  output: "standalone",
}

module.exports = nextConfig

