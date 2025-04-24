
import React, { useEffect, useState } from 'react';

interface ComputedStyles {
  fontFamily?: string;
  fontSize?: string;
  backgroundColor?: string;
  color?: string;
  border?: string;
  boxShadow?: string;
  opacity?: string;
}

interface StyleDebuggerProps {
  targetSelector?: string;
  showInConsole?: boolean;
  customTitle?: string;
}

export const StyleDebugger: React.FC<StyleDebuggerProps> = ({ 
  targetSelector = '.recharts-tooltip-wrapper',
  showInConsole = false,
  customTitle = 'Chart Styles'
}) => {
  const [styles, setStyles] = useState<ComputedStyles | null>(null);
  
  useEffect(() => {
    const checkStyles = () => {
      const elements = document.querySelectorAll(targetSelector);
      
      if (elements.length) {
        const computedStyle = window.getComputedStyle(elements[0]);
        const extractedStyles: ComputedStyles = {
          backgroundColor: computedStyle.backgroundColor,
          border: computedStyle.border,
          boxShadow: computedStyle.boxShadow,
          color: computedStyle.color,
          fontFamily: computedStyle.fontFamily,
          fontSize: computedStyle.fontSize,
          opacity: computedStyle.opacity,
        };
        
        setStyles(extractedStyles);
        
        if (showInConsole) {
          console.log(`StyleDebugger - ${customTitle} (${targetSelector}):`, extractedStyles);
        }
      }
    };

    // Initial check
    checkStyles();

    // Set up mutation observer to watch for dynamic elements
    const observer = new MutationObserver(checkStyles);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });

    // Check when hovering to capture tooltip styles
    document.addEventListener('mouseover', checkStyles);

    return () => {
      observer.disconnect();
      document.removeEventListener('mouseover', checkStyles);
    };
  }, [targetSelector, showInConsole, customTitle]);
  
  if (!styles) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 max-w-[300px] z-50">
      <h3 className="font-semibold mb-2 text-sm">{customTitle} Computed Styles:</h3>
      <pre className="text-xs whitespace-pre-wrap overflow-auto max-h-[200px]">
        {JSON.stringify(styles, null, 2)}
      </pre>
    </div>
  );
};
