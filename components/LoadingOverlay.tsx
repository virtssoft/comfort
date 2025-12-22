
import React from 'react';

const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
        {/* Animated Ring */}
        <div className="w-32 h-32 border-4 border-comfort-blue/10 border-t-comfort-blue rounded-full animate-spin"></div>
        
        {/* Logo in Center */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <img 
            src="https://api.comfortasbl.org/assets/images/logo1.png" 
            alt="COMFORT Asbl" 
            className="w-20 h-20 object-contain animate-pulse"
          />
        </div>
      </div>
      
      <div className="mt-8 text-comfort-blue font-serif font-bold text-xl tracking-widest animate-pulse">
        COMFORT ASBL
      </div>
      <div className="mt-2 text-gray-400 text-xs uppercase tracking-[0.3em]">
        Chargement de l'impact...
      </div>
    </div>
  );
};

export default LoadingOverlay;
