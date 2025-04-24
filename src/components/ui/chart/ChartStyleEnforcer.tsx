import React, { useEffect, ReactNode } from 'react';
import { tooltipStyles, legendStyles } from './theme/commonStyles';
import { lightTheme } from './chartTheme';
import './theme/chartOverrides.css';

interface ChartStyleEnforcerProps {
  children: ReactNode;
}

export const ChartStyleEnforcer = ({ children }: ChartStyleEnforcerProps) => {
  useEffect(() => {
    const applyStyles = () => {
      // Apply tooltip styles
      document.querySelectorAll('.recharts-tooltip-wrapper').forEach(tooltip => {
        if (tooltip instanceof HTMLElement) {
          Object.assign(tooltip.style, {
            backgroundColor: tooltipStyles.wrapper.backgroundColor,
            border: tooltipStyles.wrapper.border,
            borderRadius: '6px',
            boxShadow: tooltipStyles.wrapper.boxShadow,
            opacity: "1",
            fontSize: `${lightTheme.typography.fontSize.label}px`,
            fontFamily: lightTheme.typography.fontFamily,
          });
        }
      });
      
      // Apply legend styles
      document.querySelectorAll('.recharts-legend-wrapper').forEach(legend => {
        if (legend instanceof HTMLElement) {
          // Position the legend
          Object.assign(legend.style, {
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '16px',
            padding: `${legendStyles.wrapper.padding}px`,
            gap: legendStyles.wrapper.gap
          });
          
          // Style legend items
          legend.querySelectorAll('.recharts-legend-item').forEach(item => {
            if (item instanceof HTMLElement) {
              item.style.marginRight = '16px';
            }
          });
        }
      });

      // Apply chart text styles
      document.querySelectorAll('.recharts-text').forEach(text => {
        if (text instanceof HTMLElement) {
          Object.assign(text.style, {
            fontFamily: lightTheme.typography.fontFamily,
            fontSize: `${lightTheme.typography.fontSize.tick}px`,
            fill: lightTheme.colors.text,
          });
        }
      });
    };
    
    // Apply initial styles
    applyStyles();
    
    // Set up observer to apply styles when charts are updated
    const observer = new MutationObserver(applyStyles);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    });
    
    return () => observer.disconnect();
  }, []);
  
  return <>{children}</>;
};
