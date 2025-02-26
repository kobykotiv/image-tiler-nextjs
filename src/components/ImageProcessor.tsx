'use client'

import { useState } from "react"
import { useImageContext } from "../context/ImageContext"

export default function ImageProcessor() {
  const [progress, setProgress] = useState(0)
  const { files, setProcessedImages } = useImageContext()

  const createThumbnail = (originalImage: HTMLImageElement, maxSize: number = 200): string => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    if (!ctx) {
      throw new Error("Unable to create canvas context")
    }

    const ratio = Math.min(maxSize / originalImage.width, maxSize / originalImage.height)
    canvas.width = originalImage.width * ratio
    canvas.height = originalImage.height * ratio

    ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height)

    return canvas.toDataURL("image/jpeg", 0.7) // Using JPEG with 70% quality for thumbnails
  }

  const createTiledImage = (originalImage: HTMLImageElement, scale: number, isThumbnail: boolean = false): string => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    if (!ctx) {
      throw new Error("Unable to create canvas context")
    }

    // For thumbnails, scale down the base size
    const baseWidth = isThumbnail ? Math.min(originalImage.width, 100) : originalImage.width
    const baseHeight = isThumbnail ? Math.min(originalImage.height, 100) : originalImage.height
    
    canvas.width = baseWidth * scale
    canvas.height = baseHeight * scale

    if (isThumbnail) {
      // Scale down the original image first
      const tempCanvas = document.createElement("canvas")
      const tempCtx = tempCanvas.getContext("2d")
      if (tempCtx) {
        tempCanvas.width = baseWidth
        tempCanvas.height = baseHeight
        tempCtx.drawImage(originalImage, 0, 0, baseWidth, baseHeight)
        
        for (let y = 0; y < canvas.height; y += baseHeight) {
          for (let x = 0; x < canvas.width; x += baseWidth) {
            ctx.drawImage(tempCanvas, x, y)
          }
        }
      }
    } else {
      for (let y = 0; y < canvas.height; y += originalImage.height) {
        for (let x = 0; x < canvas.width; x += originalImage.width) {
          ctx.drawImage(originalImage, x, y)
        }
      }
    }

    return canvas.toDataURL(isThumbnail ? "image/jpeg" : "image/png", isThumbnail ? 0.7 : 1)
  }

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src
    })
  }

  const processImages = async () => {
    const processedImages = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      try {
        const originalUrl = URL.createObjectURL(file)
        const img = await loadImage(originalUrl)

        // Create thumbnail for original image
        const thumbnail = createThumbnail(img)

        // Create tiles with their thumbnails
        const tiles = await Promise.all(
          [2, 4, 6, 8, 16].map(async (scale) => ({
            scale,
            url: createTiledImage(img, scale, false),
            thumbnail: createTiledImage(img, scale, true)
          }))
        )

        processedImages.push({
          original: originalUrl,
          thumbnail,
          tiles
        })
        setProgress(((i + 1) / files.length) * 100)
      } catch (error) {
        console.error(`Error processing image ${file.name}:`, error)
        // Handle error (e.g., display error message to user)
      }
    }

    setProcessedImages(processedImages)
  }

  return (
    <div className="mb-8">
      <button
        onClick={processImages}
        disabled={files.length === 0}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Process Images
      </button>
      {progress > 0 && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-sm text-gray-500 mt-1">{progress.toFixed(0)}% processed</p>
        </div>
      )}
    </div>
  )
}

