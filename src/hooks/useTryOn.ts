import { useState, useCallback } from 'react';
import { tryOnPortrait, TryOnError } from '../services/tryOnService';

/**
 * Custom hook for managing virtual try-on state and operations
 */
export const useTryOn = () => {
  const [portraitFile, setPortraitFile] = useState<File | null>(null);
  const [clothingFile, setClothingFile] = useState<File | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Clear any existing error messages
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Handle try-on API call with error handling
   */
  const handleTryOn = useCallback(async () => {
    if (!portraitFile || !clothingFile) {
      setError('Please upload both a portrait and clothing image');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResultUrl(null);

    try {
      const response = await tryOnPortrait(portraitFile, clothingFile);
      setResultUrl(response.imageUrl);
    } catch (err) {
      if (err instanceof TryOnError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      console.error('Try-on failed:', err);
    } finally {
      setIsLoading(false);
    }
  }, [portraitFile, clothingFile]);

  /**
   * Reset all state to initial values
   */
  const reset = useCallback(() => {
    setPortraitFile(null);
    setClothingFile(null);
    setResultUrl(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    portraitFile,
    clothingFile,
    resultUrl,
    isLoading,
    error,
    setPortraitFile,
    setClothingFile,
    handleTryOn,
    clearError,
    reset
  };
};