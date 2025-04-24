
import { useEffect, useState } from 'react';

interface ComputedStyles {
  backgroundColor?: string;
  border?: string;
  boxShadow?: string;
  color?: string;
  opacity?: string;
}

export const StyleDebugger = () => {
  const [tooltipStyles, setTooltipStyles] = useState<ComputedStyles | null>(null);
  
  useEffect(() => {
    const checkStyles = () => {
      const tooltipElements = document.querySelectorAll('.recharts-tooltip-wrapper');
      
      if (tooltipElements.length) {
        const computedStyle = window.getComputedStyle(tooltipElements[0]);
        setTooltipStyles({
          backgroundColor: computedStyle.backgroundColor,
          border: computedStyle.border,
          boxShadow: computedStyle.boxShadow,
          color: computedStyle.color,
          opacity: computedStyle.opacity,
        });
      }
    };

    // Initial check
    checkStyles();

    // Set up mutation observer to watch for tooltip appearance
    const observer = new MutationObserver(checkStyles);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });

    return () => observer.disconnect();
  }, []);
  
  if (!tooltipStyles) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 max-w-[300px] z-50">
      <h3 className="font-semibold mb-2 text-sm">Tooltip Computed Styles:</h3>
      <pre className="text-xs whitespace-pre-wrap overflow-auto max-h-[200px]">
        {JSON.stringify(tooltipStyles, null, 2)}
      </pre>
    </div>
  );
};

