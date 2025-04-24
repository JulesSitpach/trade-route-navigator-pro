
import { useState, useEffect } from 'react';

interface ChartStyles {
  dot: {
    radius: number;
    activeRadius: number;
  };
  strokeWidth: number;
  gridOpacity: number;
}

export const useChartResponsiveStyles = (): ChartStyles => {
  const [styles, setStyles] = useState<ChartStyles>({
    dot: {
      radius: 4,
      activeRadius: 6
    },
    strokeWidth: 2,
    gridOpacity: 0.15
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      setStyles({
        dot: width < 768 
          ? { radius: 2, activeRadius: 4 }
          : width < 1024 
          ? { radius: 3, activeRadius: 5 }
          : { radius: 4, activeRadius: 6 },
        strokeWidth: width < 768 ? 1.5 : 2,
        gridOpacity: width < 768 ? 0.1 : 0.15
      });
    };

    handleResize(); // Set initial values
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return styles;
};
