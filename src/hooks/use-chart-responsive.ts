
import { useState, useEffect } from 'react';

interface ChartDimensions {
  width: number;
  height: number;
  margins: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  tickCount: number;
  legendPosition: "top" | "bottom";
}

export const useChartResponsive = (): ChartDimensions => {
  const [dimensions, setDimensions] = useState<ChartDimensions>({
    width: window.innerWidth,
    height: window.innerHeight,
    margins: { top: 20, right: 30, bottom: 50, left: 50 },
    tickCount: 12,
    legendPosition: "top"
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      setDimensions({
        width,
        height: window.innerHeight,
        margins: width < 768 
          ? { top: 10, right: 10, bottom: 30, left: 30 }
          : width < 1024 
          ? { top: 15, right: 20, bottom: 40, left: 40 }
          : { top: 20, right: 30, bottom: 50, left: 50 },
        tickCount: width < 768 
          ? 3 
          : width < 1024 
          ? 6 
          : 12,
        legendPosition: width < 768 ? "bottom" : "top"
      });
    };

    handleResize(); // Set initial values
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return dimensions;
};
