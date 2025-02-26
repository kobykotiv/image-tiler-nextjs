"use client"

import type React from "react"
import { createContext, useState, useContext } from "react"

interface ProcessedImage {
  original: string
  thumbnail: string
  tiles: {
    scale: number
    url: string
    thumbnail: string
  }[]
}

interface GridConfig {
  columns: number
  gap: number
  maxWidth: string
}

interface ImageContextType {
  files: File[]
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
  processedImages: ProcessedImage[]
  setProcessedImages: React.Dispatch<React.SetStateAction<ProcessedImage[]>>
  gridConfig: GridConfig
  setGridConfig: React.Dispatch<React.SetStateAction<GridConfig>>
}

const ImageContext = createContext<ImageContextType | undefined>(undefined)

export const ImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [files, setFiles] = useState<File[]>([])
  const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([])
  const [gridConfig, setGridConfig] = useState<GridConfig>({
    columns: 2,
    gap: 4,
    maxWidth: "1200px"
  })

  return (
    <ImageContext.Provider
      value={{
        files,
        setFiles,
        processedImages,
        setProcessedImages,
        gridConfig,
        setGridConfig
      }}
    >
      {children}
    </ImageContext.Provider>
  )
}

export const useImageContext = () => {
  const context = useContext(ImageContext)
  if (context === undefined) {
    throw new Error("useImageContext must be used within an ImageProvider")
  }
  return context
}

