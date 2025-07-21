import React from 'react';
import Header from './components/Header';
import PhotoUploader from './components/PhotoUploader';
import ClothingUploader from './components/ClothingUploader';
import TryOnButton from './components/TryOnButton';
import ResultCanvas from './components/ResultCanvas';
import ErrorBanner from './components/ErrorBanner';
import { useTryOn } from './hooks/useTryOn';

function App() {
  const {
    portraitFile,
    clothingFile,
    resultUrl,
    isLoading,
    error,
    setPortraitFile,
    setClothingFile,
    handleTryOn,
    clearError
  } = useTryOn();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        {error && (
          <ErrorBanner 
            message={error} 
            onClose={clearError}
          />
        )}

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Upload Section */}
          <div className="grid md:grid-cols-2 gap-6">
            <PhotoUploader
              file={portraitFile}
              onFileSelect={setPortraitFile}
              disabled={isLoading}
            />
            <ClothingUploader
              file={clothingFile}
              onFileSelect={setClothingFile}
              disabled={isLoading}
            />
          </div>

          {/* Try-On Button */}
          <div className="flex justify-center">
            <TryOnButton
              disabled={!portraitFile || !clothingFile || isLoading}
              isLoading={isLoading}
              onClick={handleTryOn}
            />
          </div>

          {/* Result Display */}
          {resultUrl && (
            <ResultCanvas
              imageUrl={resultUrl}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;