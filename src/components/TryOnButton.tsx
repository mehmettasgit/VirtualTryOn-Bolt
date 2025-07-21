import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';

interface TryOnButtonProps {
  disabled: boolean;
  isLoading: boolean;
  onClick: () => void;
}

const TryOnButton: React.FC<TryOnButtonProps> = ({ 
  disabled, 
  isLoading, 
  onClick 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform
        ${disabled 
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
          : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
        }
        focus:outline-none focus:ring-4 focus:ring-indigo-300
      `}
      aria-label={isLoading ? 'Processing virtual try-on' : 'Start virtual try-on'}
    >
      <div className="flex items-center gap-3">
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" size={24} />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <Sparkles size={24} />
            <span>Try On Now</span>
          </>
        )}
      </div>

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-indigo-600/20 rounded-full animate-pulse" />
      )}
    </button>
  );
};

export default TryOnButton;