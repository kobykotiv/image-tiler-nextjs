"use client"

import { useState } from "react"
import { useImageContext } from "../context/ImageContext"
import { Download } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ImageDisplay() {
  const { processedImages } = useImageContext()
  const [selectedScale, setSelectedScale] = useState<string>("")

  const downloadAll = () => {
    if (!selectedScale) return

    const scale = Number.parseInt(selectedScale)
    processedImages.forEach((image, imageIndex) => {
      const tile = image.tiles.find((t) => t.scale === scale)
      if (tile) {
        const link = document.createElement("a")
        link.href = tile.url
        link.download = `image_${imageIndex + 1}_tiled_${scale}x.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    })
  }

  return (
    <div className="relative pb-16">
      {processedImages.map((image, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Original Image</h2>
          <img
            src={image.original || "/placeholder.svg"}
            alt={`Original image ${index + 1}`}
            className="mb-4 max-w-full h-auto"
          />
          <h3 className="text-lg font-semibold mb-2">Tiled Versions</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {image.tiles.map((tile, tileIndex) => (
              <div key={tileIndex}>
                <img
                  src={tile.url || "/placeholder.svg"}
                  alt={`${tile.scale}x tiled version of image ${index + 1}`}
                  className="mb-2 max-w-full h-auto"
                />
                <a href={tile.url} download={`tiled_${tile.scale}x.png`} className="text-blue-500 hover:text-blue-700">
                  Download {tile.scale}x
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
      {processedImages.length > 0 && (
        <div className="fixed bottom-4 right-4 flex items-center space-x-2">
          <Select value={selectedScale} onValueChange={setSelectedScale}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select scale" />
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
      )}
    </div>
  )
}

