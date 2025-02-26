"use client"

import { ImageProvider } from "../../src/context/ImageContext"
import ImageUploader from "../../src/components/ImageUploader"
import ImageProcessor from "../../src/components/ImageProcessor"
import { ImageGrid } from "../../src/components/ImageGrid"

export default function TilerPage() {
  return (
    <ImageProvider>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Image Tiler</h1>
        <div className="space-y-8">
          <ImageUploader />
          <ImageProcessor />
          <ImageGrid />
        </div>
      </div>
    </ImageProvider>
  )
}