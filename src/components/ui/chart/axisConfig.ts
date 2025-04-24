
import { CSSProperties } from 'react';
import { chartTheme } from './chartTheme';
import { LabelPosition } from 'recharts/types/component/Label';

export type AxisTitleConfig = {
  value: string;
  position: LabelPosition;
  angle?: number;
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
    position?: LabelPosition;
    angle?: number;
  } = {}
): AxisTitleConfig => {
  // Default styling for axis titles
  const axisTitle = {
    fontFamily: chartTheme.typography.fontFamily,
    fontSize: chartTheme.typography.fontSize.axis,
    fontWeight: chartTheme.typography.fontWeight.normal,
    color: chartTheme.colors.text
  };
  
  // Default positions and angles based on axis
  const defaultPosition = axis === 'x' ? 'insideBottom' : 'insideLeft';
  const defaultOffset = axis === 'x' ? 0 : 0;
  const defaultAngle = axis === 'x' ? 0 : -90;
  
  // Use options or defaults
  const position = options.position || defaultPosition;
  const offset = options.offset !== undefined ? options.offset : defaultOffset;
  const angle = options.angle !== undefined ? options.angle : defaultAngle;
  
  return {
    value: text,
    position: position as LabelPosition,
    offset: offset,
    angle: angle,
    style: {
      fontFamily: axisTitle.fontFamily,
      fontSize: axisTitle.fontSize,
      fontWeight: axisTitle.fontWeight,
      fill: axisTitle.color,
      textAnchor: 'middle',
    }
  };
};

/**
 * Get optimal margin configuration based on chart type and settings
 */
export const getChartMargins = (
  options: {
    hasXAxisTitle?: boolean;
    hasYAxisTitle?: boolean;
    hasRotatedLabels?: boolean;
    hasLegend?: boolean;
    legendPosition?: 'top' | 'bottom' | 'right';
  } = {}
) => {
  const baseMargin = { ...chartTheme.spacing.margin };
  
  // Adjust bottom margin for X axis title or rotated labels
  if (options.hasXAxisTitle) {
    baseMargin.bottom += 20;
  }
  
  if (options.hasRotatedLabels) {
    baseMargin.bottom += 25;
  }
  
  // Adjust left margin for Y axis title
  if (options.hasYAxisTitle) {
    baseMargin.left += 15;
  }
  
  // Adjust margins for legend based on position
  if (options.hasLegend && options.legendPosition) {
    switch (options.legendPosition) {
      case 'top':
        baseMargin.top += 20;
        break;
      case 'bottom':
        baseMargin.bottom += 20;
        break;
      case 'right':
        baseMargin.right += 80;
        break;
    }
  }
  
  return baseMargin;
};
