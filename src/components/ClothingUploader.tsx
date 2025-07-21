import React, { useRef, useState } from 'react';
import { Upload, Shirt, X } from 'lucide-react';

interface ClothingUploaderProps {
  file: File | null;
  onFileSelect: (file: File | null) => void;
  disabled?: boolean;
}

const ClothingUploader: React.FC<ClothingUploaderProps> = ({ 
  file, 
  onFileSelect, 
  disabled = false 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      onFileSelect(selectedFile);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    handleFileChange(selectedFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) return;
    
    const droppedFile = e.dataTransfer.files[0];
    handleFileChange(droppedFile);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const removeFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openFilePicker = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
      <label htmlFor="clothing-upload" className="block text-lg font-semibold text-gray-800 mb-4">
        <Shirt className="inline mr-2" size={20} />
        Upload Clothing
      </label>
      
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer
          ${isDragOver && !disabled ? 'border-purple-500 bg-purple-50' : 'border-gray-300'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-purple-400 hover:bg-gray-50'}
          ${file ? 'border-green-400 bg-green-50' : ''}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={openFilePicker}
        role="button"
        tabIndex={0}
        aria-label="Upload clothing image"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openFilePicker();
          }
        }}
      >
        <input
          ref={fileInputRef}
          id="clothing-upload"
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
          disabled={disabled}
          aria-describedby="clothing-upload-description"
        />

        {previewUrl ? (
          <div className="relative">
            <img
              src={previewUrl}
              alt="Clothing preview"
              className="max-h-48 mx-auto rounded-lg shadow-md"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
              aria-label="Remove clothing image"
            >
              <X size={16} />
            </button>
            <p className="mt-2 text-sm text-gray-600">{file?.name}</p>
          </div>
        ) : (
          <div className="space-y-4">
            <Upload className="mx-auto text-gray-400" size={48} />
            <div>
              <p className="text-lg font-medium text-gray-700">
                Upload clothing image
              </p>
              <p id="clothing-upload-description" className="text-sm text-gray-500 mt-1">
                Drag and drop or click to select clothing item
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClothingUploader;