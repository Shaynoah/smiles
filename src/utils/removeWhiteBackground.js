/**
 * Removes white background from an image using Canvas API
 * @param {HTMLImageElement} img - The image element
 * @param {number} threshold - Threshold for white detection (0-255)
 * @returns {string} - Data URL of the processed image
 */
export function removeWhiteBackground(img, threshold = 240) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = img.width;
  canvas.height = img.height;
  
  // Draw the image
  ctx.drawImage(img, 0, 0);
  
  // Get image data
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  // Process each pixel
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // Check if pixel is white (or near white)
    if (r > threshold && g > threshold && b > threshold) {
      // Make it transparent
      data[i + 3] = 0; // Set alpha to 0
    }
  }
  
  // Put the processed data back
  ctx.putImageData(imageData, 0, 0);
  
  // Return as data URL
  return canvas.toDataURL('image/png');
}

/**
 * Processes an image and replaces the src with transparent version
 * @param {string} imageSrc - Source of the image
 * @param {number} threshold - Threshold for white detection
 * @returns {Promise<string>} - Promise that resolves to the processed image data URL
 */
export async function processImage(imageSrc, threshold = 240) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      try {
        const processedImage = removeWhiteBackground(img, threshold);
        resolve(processedImage);
      } catch (error) {
        reject(error);
      }
    };
    
    img.onerror = reject;
    img.src = imageSrc;
  });
}
