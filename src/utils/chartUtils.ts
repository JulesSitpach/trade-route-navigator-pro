import { getChartTheme, chartElements } from '@/components/ui/chart/chartTheme';
import { Props as LabelProps } from 'recharts/types/component/Label';
import { LabelPosition } from 'recharts/types/component/Label';
import { TextAnchor } from '@/components/ui/chart/types/textTypes';

// Updated with consistent chart margins
export const chartCommonConfig = {
  margins: {
    default: { top: 30, right: 20, bottom: 60, left: 60 },
    withXLabels: { top: 30, right: 20, bottom: 80, left: 60 }
  },
  // Grid styling
  grid: {
    stroke: chartElements.grid.stroke,
    strokeDasharray: chartElements.grid.strokeDasharray,
    opacity: chartElements.grid.opacity,
  },
  
  // Axis styling
  axis: {
    line: chartElements.axis.line,
    tick: chartElements.axis.tick,
  },
  
  // Responsive behavior
  responsive: {
    aspect: 4.0 / 3.0,
    width: '100%',
    minHeight: 300,
  },
};

// Function to generate a standard axis title with consistent styling
export const createAxisTitle = (
  text: string, 
  axis: 'x' | 'y', 
  options?: { 
    offset?: number; 
    position?: LabelPosition; 
    angle?: number;
  }
): LabelProps => {
  // We use the chartElements.axisTitle function but modify the return value to match the expected LabelProps type
  const axisConfig = chartElements.axisTitle(text, axis, options);
  
  // Return the config that matches the expected LabelProps type
  return {
    value: axisConfig.value,
    position: axisConfig.position,
    offset: axisConfig.offset,
    angle: axisConfig.angle,
    style: {
      ...axisConfig.style,
      textAnchor: axisConfig.style.textAnchor as TextAnchor,
    }
  };
};

// Function to get appropriate chart margins based on chart type
export const getChartMargins = (
  chartType: 'bar' | 'line' | 'scatter' | 'area' | 'pie' | 'radar' | 'heatmap',
  customMargins?: { 
    top?: number; 
    right?: number; 
    bottom?: number; 
    left?: number; 
  }
) => {
  const baseMargins = {
    bar: chartCommonConfig.margins.default,
    line: chartCommonConfig.margins.default,
    scatter: { top: 40, right: 40, bottom: 100, left: 80 },
    area: chartCommonConfig.margins.default,
    pie: { top: 20, right: 20, bottom: 20, left: 20 },
    radar: { top: 30, right: 30, bottom: 30, left: 30 },
    heatmap: { top: 40, right: 40, bottom: 100, left: 80 },
  };

  const margins = baseMargins[chartType];
  
  return {
    top: customMargins?.top ?? margins.top,
    right: customMargins?.right ?? margins.right,
    bottom: customMargins?.bottom ?? margins.bottom,
    left: customMargins?.left ?? margins.left,
  };
};

// Bubble size calculation for scatter plots
export const calculateBubbleSize = (
  value: number, 
  allValues: number[], 
  options?: { 
    minRadius?: number; 
    maxRadius?: number; 
  }
): number => {
  const minRadius = options?.minRadius ?? 5;
  const maxRadius = options?.maxRadius ?? 20;
  
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);
  
  if (minValue === maxValue) return (minRadius + maxRadius) / 2;
  
  const scale = (value - minValue) / (maxValue - minValue);
  return minRadius + scale * (maxRadius - minRadius);
};

// Color utilities based on thresholds and chart theme
export const getColorByThreshold = (
  value: number, 
  thresholds: { low: number; medium: number; high: number; }
): string => {
  const theme = getChartTheme();
  
  if (value <= thresholds.low) return theme.colors.risk.low;
  if (value <= thresholds.medium) return theme.colors.risk.medium;
  if (value <= thresholds.high) return theme.colors.risk.high;
  return theme.colors.risk.critical;
};

export const getTariffColor = (tariffRate: number): string => {
  const theme = getChartTheme();
  
  if (tariffRate <= 5) return theme.colors.tariff.low;
  if (tariffRate <= 15) return theme.colors.tariff.medium;
  return theme.colors.tariff.high;
};

// Formatting utilities
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatPercent = (value: number): string => {
  return `${value}%`;
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(value);
};

export default {
  chartCommonConfig,
  createAxisTitle,
  getChartMargins,
  calculateBubbleSize,
  getColorByThreshold,
  getTariffColor,
  formatCurrency, 
  formatPercent,
  formatNumber,
};
