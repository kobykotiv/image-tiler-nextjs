"use client"

import { useEffect, useRef, useState } from "react"
import { useImageContext } from "../context/ImageContext"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Download } from "lucide-react"

export function ImageGrid() {
  const { processedImages, gridConfig, setGridConfig } = useImageContext()
  const [selectedScale, setSelectedScale] = useState<string>("")
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)
  const imageRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"))
            if (!isNaN(index)) {
              setLoadedImages((prev) => new Set([...prev, index]))
              observerRef.current?.unobserve(entry.target)
            }
          }
        })
      },
      {
        rootMargin: "50px",
        threshold: 0.1
      }
    )

    return () => {
      observerRef.current?.disconnect()
    }
  }, [])

  useEffect(() => {
    // Reset and observe new image elements when they change
    imageRefs.current = imageRefs.current.slice(0, processedImages.length)
    setLoadedImages(new Set())
    
    imageRefs.current.forEach((ref, index) => {
      if (ref) {
        observerRef.current?.observe(ref)
      }
    })
  }, [processedImages])

  const handleGridChange = (columns: string) => {
    setGridConfig((prev) => ({
      ...prev,
      columns: parseInt(columns, 10)
    }))
  }

  const downloadImage = (url: string, fileName: string) => {
    const link = document.createElement("a")
    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const downloadAll = () => {
    if (!selectedScale) return

    const scale = Number.parseInt(selectedScale)
    processedImages.forEach((image, imageIndex) => {
      const tile = image.tiles.find((t) => t.scale === scale)
      if (tile) {
        downloadImage(tile.url, `image_${imageIndex + 1}_tiled_${scale}x.png`)
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <Select value={gridConfig.columns.toString()} onValueChange={handleGridChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Grid size" />
          </SelectTrigger>
          <SelectContent>
            {[2, 4, 6, 8].map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}x{size} Grid
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center space-x-2">
          <Select value={selectedScale} onValueChange={setSelectedScale}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select scale to download" />
            </SelectTrigger>
            <SelectContent>
              {[2, 4, 6, 8, 16].map((scale) => (
                <SelectItem key={scale} value={scale.toString()}>
                  {scale}x
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <button
            onClick={downloadAll}
            disabled={!selectedScale}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Download all images"
          >
            <Download className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: `repeat(${gridConfig.columns}, minmax(0, 1fr))`,
          maxWidth: gridConfig.maxWidth,
          margin: "0 auto"
        }}
      >
        {processedImages.map((image, index) => (
          <div key={index} className="relative group">
            <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
              {loadedImages.has(index) ? (
                <img
                  ref={(el) => {
                    imageRefs.current[index] = el
                  }}
                  src={image.thumbnail}
                  alt={`Thumbnail ${index + 1}`}
                  className="object-cover w-full h-full transition-all duration-300"
                  data-index={index}
                />
              ) : (
                <div
                  ref={(el) => {
                    imageRefs.current[index] = el
                  }}
                  className="w-full h-full bg-gray-200 animate-pulse"
                  data-index={index}
                />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-200" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {selectedScale && (
                  <button
                    onClick={() => {
                      const tile = image.tiles.find((t) => t.scale === Number(selectedScale))
                      if (tile) {
                        downloadImage(tile.url, `image_${index + 1}_tiled_${selectedScale}x.png`)
                      }
                    }}
                    className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition-colors duration-200"
                  >
                    Download {selectedScale}x
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}