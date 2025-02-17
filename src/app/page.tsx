import { ImageProvider } from "../context/ImageContext"
import ImageUploader from "../components/ImageUploader"
import ImageProcessor from "../components/ImageProcessor"
import ImageDisplay from "../components/ImageDisplay"

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

