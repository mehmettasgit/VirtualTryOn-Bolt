import React from 'react';
import { Download, ImageIcon } from 'lucide-react';

interface ResultCanvasProps {
  imageUrl: string;
}

const ResultCanvas: React.FC<ResultCanvasProps> = ({ imageUrl }) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `virtual-try-on-result-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download image:', error);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <ImageIcon size={24} />
          Try-On Result
        </h2>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 transform hover:scale-105 active:scale-95"
          aria-label="Download result image"
        >
          <Download size={18} />
          Download
        </button>
      </div>

      <div className="relative overflow-hidden rounded-xl shadow-lg">
        <img
          src={imageUrl}
          alt="Virtual try-on result showing portrait with clothing applied"
          className="w-full h-auto max-h-[600px] object-contain bg-gray-100"
          loading="lazy"
        />
        
        {/* Subtle overlay gradient for visual enhancement */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
      </div>

      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Your virtual try-on is complete! Click download to save the result.
        </p>
      </div>
    </div>
  );
};

export default ResultCanvas;