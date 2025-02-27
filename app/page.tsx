import { ImageProvider } from "../src/context/ImageContext"
import ImageUploader from "../src/components/ImageUploader"
import ImageProcessor from "../src/components/ImageProcessor"
import ImageDisplay from "../src/components/ImageDisplay"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 prose prose-slate max-w-4xl">
      <h1>Image Tiler</h1>
      
      <section className="mb-8">
        <h2>Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <a
            href="/tiler"
            className="block p-6 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-xl font-semibold mb-2">Image Tiler Tool</h3>
            <p className="text-gray-600">Create dynamic grid layouts of your images with our interactive tool.</p>
          </a>
          {/* <a
            href="/docs"
            className="block p-6 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-xl font-semibold mb-2">API Documentation</h3>
            <p className="text-gray-600">Integrate image tiling into your own applications.</p>
          </a> */}
        </div>
      </section>

      <section className="mb-8">
        <h2>Other Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <a
            href="https://kobykotiv.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-xl font-semibold mb-2">Merch Store</h3>
            <p className="text-gray-600">Check out our merchandise at kobykotiv.com</p>
          </a>
          <a
            href="https://github.com/kobykotiv"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-xl font-semibold mb-2">GitHub Projects</h3>
            <p className="text-gray-600">Explore our open source projects on GitHub</p>
          </a>
        </div>
      </section>

      <section className="mb-8">
        <h2>Quick Start</h2>
        <p>Transform images using our simple REST API. Rate limited to 1 request per second.</p>
      </section>

      <section className="mb-8">
        <h2>API Endpoint</h2>
        <code className="block bg-gray-100 p-2 rounded">POST /api/transform</code>
      </section>

      <section className="mb-8">
        <h2>Example Requests</h2>
        
        <h3>cURL</h3>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
{`curl -X POST \\
  http://localhost:3000/api/transform \\
  -F "image=@/path/to/image.jpg" \\
  -F "type=mirror"`}
        </pre>

        <h3>JavaScript</h3>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
{`const formData = new FormData();
formData.append('image', imageFile);
formData.append('type', 'mirror');

const response = await fetch('/api/transform', {
  method: 'POST',
  body: formData
});

const result = await response.json();`}
        </pre>

        <h3>Python</h3>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
{`import requests

files = {'image': open('image.jpg', 'rb')}
data = {'type': 'mirror'}

response = requests.post(
    'http://localhost:3000/api/transform',
    files=files,
    data=data
)`}
        </pre>
      </section>

      <section className="mb-8">
        <h2>Response Format</h2>
        <div className="space-y-4">
          <div>
            <h4>Success (200)</h4>
            <pre className="bg-gray-100 p-2 rounded">{"{ \"success\": true }"}</pre>
          </div>
          
          <div>
            <h4>Rate Limit Exceeded (429)</h4>
            <pre className="bg-gray-100 p-2 rounded">{"{ \"error\": \"Rate limit exceeded. Please wait 1 second.\" }"}</pre>
          </div>
          
          <div>
            <h4>Bad Request (400)</h4>
            <pre className="bg-gray-100 p-2 rounded">{"{ \"error\": \"Missing image or transformation type\" }"}</pre>
          </div>
        </div>
      </section>

      <section>
        <h2>Try it out</h2>
        <div className="bg-gray-100 p-4 rounded">
          <p>For full API documentation, visit the <a href="/docs">documentation page</a>.</p>
        </div>
      </section>
    </div>
  )
}

