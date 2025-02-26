# Image Tiler API Documentation

_Because apparently, one image isn't complicated enough._

## Rate Limiting
All API endpoints are rate-limited to 1 request per second per IP address. Yes, that means you'll have to wait a whole second between requests. We know, the horror.

## Endpoints

### POST /api/transform
Transform an image using specified tiling parameters. It's like playing with digital Legos, except less fun and more HTTP requests.

**Request Format**: `multipart/form-data` (because JSON wasn't complicated enough)

**Parameters**:
- `image`: Image file (required) - Yes, you actually need an image for the image processor. Shocking.
- `rows`: Number of rows (optional, default: 2) - For when you can't decide how many pieces to break your image into
- `cols`: Number of columns (optional, default: 2) - Same as rows, but horizontal. Mind-blowing, right?

**Response**:
- Success (200): 
```json
{ 
    "success": true,
    "result": {
        "tiles": ["base64_string_because_why_not", "..."],
        "dimensions": {
            "width": "number",
            "height": "number",
            "tileWidth": "math_is_hard",
            "tileHeight": "also_math"
        }
    }
}
```
- Rate Limit (429): `{ "error": "Whoa there, speedster! Wait a second." }`
- Bad Request (400): `{ "error": "You forgot the image. You had ONE job." }`
- Server Error (500): `{ "error": "Something broke. Have you tried turning it off and on again?" }`

## Example Usage

### cURL
```bash
# For those who hate GUIs
curl -X POST \
  http://localhost:3000/api/transform \
  -F "image=@/path/to/your/precious/image.jpg" \
  -F "rows=2" \
  -F "cols=2"
```

### JavaScript (Browser)
```javascript
// For when you want to make simple things complicated
async function transformImage(imageFile, rows = 2, cols = 2) {
  const formData = new FormData(); // Because raw JSON would be too easy
  formData.append('image', imageFile);
  formData.append('rows', rows);
  formData.append('cols', cols);

  try {
    const response = await fetch('/api/transform', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Everything is fine. Nothing is broken:', error);
    throw error;
  }
}
```

### Python (requests)
```python
# For people who like significant whitespace
import requests  # Yes, you need to install this first

def transform_image(image_path, rows=2, cols=2):
    url = 'http://localhost:3000/api/transform'
    
    with open(image_path, 'rb') as image_file:
        files = {
            'image': image_file  # Magic happening here
        }
        data = {
            'rows': rows,
            'cols': cols
        }
        
        response = requests.post(url, files=files, data=data)
        
        if response.status_code == 429:
            print("Too fast! Are you a robot?")
            return None
            
        response.raise_for_status()  # Let it crash and burn
        return response.json()
```

## Error Handling
Because things will go wrong. They always do.

## Tips & Tricks
1. Make sure your image is actually an image
2. Yes, the rate limit is real
3. No, we won't increase it
4. Have you tried turning it off and on again?

## Support
If you need help, try Stack Overflow first. They love these kinds of questions.

_Note: This API is built with love, caffeine, and a slight sense of existential dread._
