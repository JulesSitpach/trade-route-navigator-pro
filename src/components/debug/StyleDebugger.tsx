
import React, { useEffect, useState } from 'react';

interface ComputedStyles {
  fontFamily?: string;
  fontSize?: string;
  backgroundColor?: string;
  color?: string;
  border?: string;
  boxShadow?: string;
  tooltip?: {
    backgroundColor: string;
    border: string;
    boxShadow: string;
  };
}

interface StyleDebuggerProps {
  targetSelector?: string;
}

export const StyleDebugger: React.FC<StyleDebuggerProps> = ({ 
  targetSelector = '.recharts-wrapper' 
}) => {
  const [styles, setStyles] = useState<Record<string, ComputedStyles>>({});
  
  useEffect(() => {
    const updateStyles = () => {
      // Find elements matching selector
      const elements = document.querySelectorAll(targetSelector);
      const styleInfo: Record<string, ComputedStyles> = {};
      
      elements.forEach((el, index) => {
        const computedStyle = window.getComputedStyle(el);
        const elStyles: ComputedStyles = {};
        
        // Log important style properties
        ['fontFamily', 'fontSize', 'backgroundColor', 'color', 'border', 'boxShadow'].forEach(prop => {
          elStyles[prop as keyof ComputedStyles] = computedStyle[prop];
        });
        
        // Log tooltip styles if present
        const tooltips = el.querySelectorAll('.recharts-tooltip-wrapper');
        if (tooltips.length) {
          const tooltipStyle = window.getComputedStyle(tooltips[0]);
          elStyles.tooltip = {
            backgroundColor: tooltipStyle.backgroundColor,
            border: tooltipStyle.border,
            boxShadow: tooltipStyle.boxShadow
          };
        }
        
        styleInfo[`element-${index}`] = elStyles;
      });
      
      setStyles(styleInfo);
    };

    // Initial check
    updateStyles();
    
    // Set up mutation observer to watch for dynamic changes
    const observer = new MutationObserver(updateStyles);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });

    return () => observer.disconnect();
  }, [targetSelector]);
  
  if (Object.keys(styles).length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 max-w-[300px] z-50">
      <h3 className="font-semibold mb-2 text-sm">Computed Styles:</h3>
      <pre className="text-xs whitespace-pre-wrap overflow-auto max-h-[200px]">
        {JSON.stringify(styles, null, 2)}
      </pre>
    </div>
  );
};
