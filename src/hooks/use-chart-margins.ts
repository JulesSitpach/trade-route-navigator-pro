
import { useState, useEffect } from 'react';
import { useIsMobile } from './use-mobile';

type ChartMargins = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export const useChartMargins = () => {
  const [margins, setMargins] = useState<ChartMargins>({
    top: 20,
    right: 30,
    bottom: 50,
    left: 50,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      if (width < 768) { // Mobile
        setMargins({ top: 10, right: 10, bottom: 30, left: 30 });
      } else if (width < 1024) { // Tablet
        setMargins({ top: 15, right: 20, bottom: 40, left: 40 });
      } else { // Desktop
        setMargins({ top: 20, right: 30, bottom: 50, left: 50 });
      }
    };

    handleResize(); // Set initial margins
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return margins;
};
