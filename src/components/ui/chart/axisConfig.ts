
import { CSSProperties } from 'react';
import { chartTheme } from './chartTheme';

export type AxisTitleConfig = {
  value: string;
  position: 'insideLeft' | 'insideRight' | 'insideTop' | 'insideBottom';
  offset: number;
  style: CSSProperties;
}

/**
 * Creates axis title configuration for Recharts components
 */
export const createAxisTitle = (
  text: string, 
  axis: 'x' | 'y',
  options: {
    offset?: number;
    position?: string;
  } = {}
): AxisTitleConfig => {
  const { axisTitle } = chartTheme;
  
  // Default positions based on axis
  const defaultPosition = axis === 'x' ? 'insideBottom' : 'insideLeft';
  const defaultOffset = axis === 'x' ? 10 : 0;
  
  // Use options or defaults
  const position = options.position || defaultPosition;
  const offset = options.offset !== undefined ? options.offset : defaultOffset;
  
  return {
    value: text,
    position: position as 'insideLeft' | 'insideRight' | 'insideTop' | 'insideBottom',
    offset: offset,
    style: {
      fontFamily: axisTitle.fontFamily,
      fontSize: axisTitle.fontSize,
      fontWeight: axisTitle.fontWeight,
      fill: axisTitle.color,
    }
  };
};
