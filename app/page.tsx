import { ImageProvider } from "../src/context/ImageContext"
import ImageUploader from "../src/components/ImageUploader"
import ImageProcessor from "../src/components/ImageProcessor"
import ImageDisplay from "../src/components/ImageDisplay"

export default function Home() {
  return (
    <ImageProvider>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Image Tiler</h1>
        <ImageUploader />
        <ImageProcessor />
        <ImageDisplay />
      </main>
    </ImageProvider>
  )
}

