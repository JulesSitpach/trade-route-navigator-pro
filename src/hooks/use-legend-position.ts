
import { useState, useEffect } from 'react';

export const useLegendPosition = () => {
  const [position, setPosition] = useState<"top" | "bottom">("top");
  
  useEffect(() => {
    const handleResize = () => {
      setPosition(window.innerWidth < 768 ? "bottom" : "top");
    };

    handleResize(); // Set initial position
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return position;
};
