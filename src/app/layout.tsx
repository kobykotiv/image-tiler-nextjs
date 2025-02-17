import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Image Tiler - Generate Tiled Versions of Your Images",
  description:
    "Upload and process images to create tiled versions at various scales. Perfect for game development, web design, and more.",
  keywords: "image tiler, image processing, tiled images, web app",
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Image Tiler - Generate Tiled Versions of Your Images",
    description:
      "Upload and process images to create tiled versions at various scales. Perfect for game development, web design, and more.",
    url: "https://tiles.printvision.cloud",
    siteName: "Image Tiler",
    images: [
      {
        url: "https://tiles.printvision.cloud/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Image Tiler Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Tiler - Generate Tiled Versions of Your Images",
    description:
      "Upload and process images to create tiled versions at various scales. Perfect for game development, web design, and more.",
    images: ["https://tiles.printvision.cloud/og-image.jpg"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

