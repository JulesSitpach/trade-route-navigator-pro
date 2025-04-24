
import { useState, useEffect } from 'react';
import { useIsMobile } from './use-mobile';

export const useAxisTicks = () => {
  const [tickCount, setTickCount] = useState(10);
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      if (width < 768) { // Mobile
        setTickCount(3);
      } else if (width < 1024) { // Tablet
        setTickCount(6);
      } else { // Desktop
        setTickCount(12);
      }
    };

    handleResize(); // Set initial tick count
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return tickCount;
};
