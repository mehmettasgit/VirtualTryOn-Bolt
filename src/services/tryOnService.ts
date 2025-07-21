/**
 * Service for handling virtual try-on API calls
 */

export interface TryOnResponse {
  imageUrl: string;
}

export class TryOnError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'TryOnError';
  }
}

/**
 * Validates image file before upload
 */
const validateImageFile = (file: File): void => {
  // Check file type
  if (!file.type.startsWith('image/')) {
    throw new TryOnError('Invalid file format. Please upload an image file.');
  }

  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB in bytes
  if (file.size > maxSize) {
    throw new TryOnError('File size too large. Please upload an image smaller than 10MB.');
  }
};

/**
 * Calls the backend try-on API with portrait and clothing images
 */
export async function tryOnPortrait(portraitFile: File, clothingFile: File): Promise<TryOnResponse> {
  try {
    // Validate files before sending
    validateImageFile(portraitFile);
    validateImageFile(clothingFile);

    // Prepare form data
    const formData = new FormData();
    formData.append('portrait', portraitFile);
    formData.append('clothing', clothingFile);

    // Make API call
    const response = await fetch('/api/try-on', {
      method: 'POST',
      body: formData,
    });

    // Handle response
    if (!response.ok) {
      let errorMessage = 'Server error occurred';
      
      try {
        const errorText = await response.text();
        errorMessage = errorText || `HTTP ${response.status}: ${response.statusText}`;
      } catch {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }

      throw new TryOnError(errorMessage, response.status);
    }

    const result = await response.json();

    // Validate response structure
    if (!result.imageUrl) {
      throw new TryOnError('Invalid response from server: missing image URL');
    }

    return result;
  } catch (error) {
    // Re-throw TryOnError instances as-is
    if (error instanceof TryOnError) {
      throw error;
    }

    // Handle network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new TryOnError('Network error: Unable to connect to server. Please check your connection.');
    }

    // Handle other errors
    throw new TryOnError('An unexpected error occurred. Please try again.');
  }
}