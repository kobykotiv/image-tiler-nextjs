import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Image Tiler API',
  description: 'Image tiling and transformation API documentation',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  )
}
