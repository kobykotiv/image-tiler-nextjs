"use client"

import type React from "react"
import { createContext, useState, useContext } from "react"

interface ProcessedImage {
  original: string
  tiles: { scale: number; url: string }[]
}

interface ImageContextType {
  files: File[]
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
  processedImages: ProcessedImage[]
  setProcessedImages: React.Dispatch<React.SetStateAction<ProcessedImage[]>>
}

const ImageContext = createContext<ImageContextType | undefined>(undefined)

export const ImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [files, setFiles] = useState<File[]>([])
  const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([])

  return (
    <ImageContext.Provider value={{ files, setFiles, processedImages, setProcessedImages }}>
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

