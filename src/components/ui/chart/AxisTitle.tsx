
import React from 'react';
import { useChart } from './ChartContext';

interface AxisTitleProps {
  text: string;
  axis: 'x' | 'y';
  offset?: {x?: number; y?: number};
  position?: 'insideLeft' | 'insideRight' | 'bottom' | 'top';
  theme?: {
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: number;
    color?: string;
    padding?: number;
    offset?: {x: number; y: number};
  };
}

// This function returns a configuration object for Recharts axis labels
export const AxisTitle = ({ 
  text, 
  axis, 
  offset,
  position = axis === 'x' ? 'bottom' : 'insideLeft',
  theme: customTheme
}: AxisTitleProps) => {
  // Try to get theme from context, but don't fail if not available
  let contextTheme;
  try {
    const chart = useChart();
    contextTheme = chart?.theme?.axisTitle;
  } catch (e) {
    // Context not available, will use default or custom theme
  }
  
  // Default theme values
  const defaultTheme = {
    fontFamily: 'sans-serif',
    fontSize: '0.75rem',
    fontWeight: 400,
    color: '#64748b', // tailwind slate-500
    padding: 0,
    offset: { x: 0, y: 0 }
  };
  
  // Use context theme if available, otherwise use custom theme or default
  const theme = contextTheme || customTheme || defaultTheme;
  
  const defaultOffset = theme.offset || defaultTheme.offset;
  const combinedOffset = {
    x: (offset?.x !== undefined) ? offset.x : defaultOffset.x,
    y: (offset?.y !== undefined) ? offset.y : defaultOffset.y
  };

  // Return proper label props that Recharts can use
  return {
    value: text,
    position,
    offset: axis === 'x' ? combinedOffset.y : combinedOffset.x,
    style: {
      fontFamily: theme.fontFamily || defaultTheme.fontFamily,
      fontSize: theme.fontSize || defaultTheme.fontSize,
      fontWeight: theme.fontWeight || defaultTheme.fontWeight,
      fill: theme.color || defaultTheme.color,
      padding: theme.padding || defaultTheme.padding
    }
  };
};
