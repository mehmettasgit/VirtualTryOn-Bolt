import React from 'react';
import { Shirt } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl text-white shadow-lg">
          <Shirt size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Virtual Try-On
        </h1>
      </div>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto">
        Upload your portrait and clothing image to see how they look together with AI-powered virtual fitting
      </p>
    </header>
  );
};

export default Header;