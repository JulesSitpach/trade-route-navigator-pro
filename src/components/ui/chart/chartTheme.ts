
import { ChartTheme } from './theme/types';
import { lightColors, darkColors } from './theme/colors';
import { typography } from './theme/typography';
import { spacing } from './theme/spacing';
import { LabelPosition } from 'recharts/types/component/Label';

// Light theme default configuration
export const lightTheme: ChartTheme = {
  colors: lightColors,
  typography,
  spacing,
  grid: {
    stroke: '#e5e7eb',     // Gray 200
    strokeDasharray: '4 4',
    opacity: 0.3,
  },
  tooltip: {
    background: '#ffffff',  // White
    border: '#e5e7eb',      // Gray 200
    shadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
  },
  animation: {
    duration: 500,
    easing: 'ease',
  },
  axisTitle: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: 12,
    fontWeight: 500,
    color: '#64748b',
  },
};

// Dark theme configuration
export const darkTheme: ChartTheme = {
  ...lightTheme,
  colors: darkColors,
  grid: {
    stroke: '#374151',     // Gray 700
    strokeDasharray: '4 4',
    opacity: 0.4,
  },
  tooltip: {
    background: '#1f2937',   // Gray 800
    border: '#374151',       // Gray 700
    shadow: '0px 2px 8px rgba(0, 0, 0, 0.25)',
    borderRadius: 4,
  },
};

// Export chartTheme as lightTheme for backward compatibility
export const chartTheme = lightTheme;

// Export a function to get appropriate theme based on mode
export const getChartTheme = (mode: 'light' | 'dark' = 'light'): ChartTheme => {
  return mode === 'dark' ? darkTheme : lightTheme;
};

// Utility functions
export const getMargins = (
  customMargins?: Partial<ChartTheme['spacing']['margin']>, 
  mode: 'light' | 'dark' = 'light'
): ChartTheme['spacing']['margin'] => {
  const theme = getChartTheme(mode);
  if (!customMargins) return theme.spacing.margin;
  
  return {
    ...theme.spacing.margin,
    ...customMargins,
  };
};

// Common chart element styling
export const chartElements = {
  axisTitle: (text: string, axis: 'x' | 'y', options?: { offset?: number; position?: LabelPosition; angle?: number }) => {
    const theme = getChartTheme();
    const defaultOffset = axis === 'x' ? theme.spacing.axisOffset.x : theme.spacing.axisOffset.y;
    const defaultPosition = axis === 'x' ? 'insideBottom' : 'insideLeft' as LabelPosition;
    const defaultAngle = axis === 'y' ? -90 : 0;
    
    return {
      value: text,
      offset: options?.offset ?? defaultOffset,
      position: options?.position ?? defaultPosition,
      style: {
        fontSize: theme.typography.fontSize.axis,
        fill: theme.colors.text,
        fontWeight: theme.typography.fontWeight.normal,
        textAnchor: 'middle',
      },
      angle: options?.angle ?? defaultAngle,
    };
  },
  
  grid: {
    stroke: lightTheme.grid.stroke,
    strokeDasharray: lightTheme.grid.strokeDasharray,
    opacity: lightTheme.grid.opacity,
  },
  
  axis: {
    line: {
      stroke: lightTheme.colors.text,
      strokeWidth: 1,
    },
    tick: {
      fontSize: lightTheme.typography.fontSize.tick,
      fill: lightTheme.colors.text,
    },
  },
};

export default {
  lightTheme,
  darkTheme,
  chartTheme,
  getChartTheme,
  getMargins,
  chartElements,
};
