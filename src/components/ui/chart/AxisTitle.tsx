
import React from 'react';
import { useChart } from './ChartContext';

interface AxisTitleProps {
  text: string;
  axis: 'x' | 'y';
  offset?: {x?: number; y?: number};
  position?: 'insideLeft' | 'insideRight' | 'bottom' | 'top';
}

// This function returns a configuration object for Recharts axis labels
export const AxisTitle = ({ 
  text, 
  axis, 
  offset,
  position = axis === 'x' ? 'bottom' : 'insideLeft'
}: AxisTitleProps) => {
  const { theme } = useChart();
  const { axisTitle } = theme;
  
  const defaultOffset = axisTitle.offset;
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
      fontFamily: axisTitle.fontFamily,
      fontSize: axisTitle.fontSize,
      fontWeight: axisTitle.fontWeight,
      fill: axisTitle.color,
      padding: axisTitle.padding
    }
  };
};
