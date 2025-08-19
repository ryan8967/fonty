from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import cv2
import numpy as np
import base64
import uvicorn
from typing import Optional

app = FastAPI(title="Custom Font Image Processor", version="1.0.0")

# Enable CORS - Update origins for production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production: ["http://localhost:3000", "https://yourdomain.com"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def convert_to_black_and_white(image: np.ndarray) -> np.ndarray:
    """Convert an image to black and white depending on brightness."""
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY) if len(image.shape) == 3 else image.copy()
    normalized = cv2.normalize(gray, None, 0, 255, cv2.NORM_MINMAX)
    average_brightness = np.mean(image)
    
    if average_brightness < 180:  # Dark image
        _, bw = cv2.threshold(normalized, 128, 255, cv2.THRESH_BINARY)
    else:  # Bright image
        _, bw = cv2.threshold(normalized, 150, 255, cv2.THRESH_BINARY)
    
    return bw

def is_background_clean(image, threshold=245, min_clean_percentage=90):
    """Check if background is clean enough."""
    height, width = image.shape
    bw = int(width * 0.1)
    bh = int(height * 0.1)
    
    top = image[0:bh, :]
    bottom = image[-bh:, :]
    left = image[:, 0:bw]
    right = image[:, -bw:]
    
    samples = np.concatenate([top.flatten(), bottom.flatten(), left.flatten(), right.flatten()])
    clean_pixels = np.sum(samples > threshold)
    clean_percentage = (clean_pixels / samples.size) * 100
    
    return clean_percentage >= min_clean_percentage

def process_image(image: np.ndarray) -> np.ndarray:
    """Main image processing function."""
    # Convert to black and white first
    bw = convert_to_black_and_white(image)
    
    # Check background cleanliness
    if is_background_clean(bw):
        result = bw.copy()
    else:
        # Character extraction pipeline
        _, char_mask = cv2.threshold(bw, 100, 255, cv2.THRESH_BINARY_INV)
        kernel = np.ones((3,3), np.uint8)
        char_mask = cv2.dilate(char_mask, kernel, iterations=1)
        char_mask = cv2.erode(char_mask, kernel, iterations=1)
        
        h, w = bw.shape
        separation_line = int(h * 0.75)
        roi_mask = np.zeros_like(bw)
        roi_mask[:separation_line, :] = 255
        
        character_only = cv2.bitwise_and(char_mask, roi_mask)
        result = np.ones_like(bw) * 255
        
        contours, _ = cv2.findContours(character_only, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        min_contour_area = 500
        char_contours = [c for c in contours if cv2.contourArea(c) > min_contour_area]
        cv2.drawContours(result, char_contours, -1, 0, -1)
    
    return result

@app.get("/")
async def root():
    """Health check endpoint."""
    return {"message": "Custom Font Image Processor is running", "status": "healthy"}

@app.get("/health")
async def health_check():
    """Detailed health check."""
    return {
        "status": "healthy",
        "service": "Custom Font Image Processor",
        "version": "1.0.0"
    }

@app.post("/process-image")
async def process_image_endpoint(file: UploadFile = File(...)):
    """Process uploaded image for font generation."""
    try:
        # Read uploaded file
        contents = await file.read()
        image = cv2.imdecode(np.frombuffer(contents, np.uint8), cv2.IMREAD_UNCHANGED)
        
        if image is None:
            return JSONResponse(
                content={"error": "Invalid image format", "details": "Could not decode image"},
                status_code=400
            )
        
        # Process the image
        result = process_image(image)
        
        # Convert result to base64
        _, buffer = cv2.imencode('.png', result)
        result_base64 = base64.b64encode(buffer).decode('utf-8')
        
        return {
            "success": True,
            "processed_image": f"data:image/png;base64,{result_base64}",
            "message": "Image processed successfully",
            "original_filename": file.filename
        }
        
    except Exception as e:
        return JSONResponse(
            content={
                "error": "Processing failed",
                "details": str(e)
            },
            status_code=500
        )

@app.post("/batch-process")
async def batch_process_images(files: list[UploadFile] = File(...)):
    """Process multiple images at once."""
    results = []
    
    for file in files:
        try:
            contents = await file.read()
            image = cv2.imdecode(np.frombuffer(contents, np.uint8), cv2.IMREAD_UNCHANGED)
            
            if image is None:
                results.append({
                    "filename": file.filename,
                    "success": False,
                    "error": "Invalid image format"
                })
                continue
            
            result = process_image(image)
            _, buffer = cv2.imencode('.png', result)
            result_base64 = base64.b64encode(buffer).decode('utf-8')
            
            results.append({
                "filename": file.filename,
                "success": True,
                "processed_image": f"data:image/png;base64,{result_base64}"
            })
            
        except Exception as e:
            results.append({
                "filename": file.filename,
                "success": False,
                "error": str(e)
            })
    
    return {"results": results}

if __name__ == "__main__":
    # Run server
    uvicorn.run(
        "image_processing:app",
        host="0.0.0.0",
        port=8000,
        reload=True, 
        log_level="info"
    )