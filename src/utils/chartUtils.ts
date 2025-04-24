
import { getChartTheme, chartElements } from '@/components/ui/chart/chartTheme';
import { LabelProps } from 'recharts';
import { ChartConfig } from '@/components/ui/chart/types';

// Common chart configuration for consistent styling
export const chartCommonConfig = {
  margins: {
    default: { top: 20, right: 30, bottom: 60, left: 60 },
    withXLabels: { top: 20, right: 30, bottom: 80, left: 60 },
  },
  legend: {
    position: {
      vertical: "top" as const,
      align: "center" as const
    }
  },
  grid: {
    stroke: chartElements.grid.stroke,
    strokeDasharray: chartElements.grid.strokeDasharray,
    opacity: chartElements.grid.opacity,
  },
  axis: {
    line: chartElements.axis.line,
    tick: chartElements.axis.tick,
  },
  responsive: {
    aspect: 4.0 / 3.0,
    width: '100%',
    minHeight: 300,
  }
};

// Function to generate a standard axis title with consistent styling
export const createAxisTitle = (
  text: string, 
  axis: 'x' | 'y', 
  options?: { 
    offset?: number; 
    position?: string; 
    angle?: number;
  }
): LabelProps => {
  return chartElements.axisTitle(text, axis, options);
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

// Generate Y-axis ticks with nice intervals
export const generateYAxisTicks = (maxValue: number, tickCount: number = 5): number[] => {
  const roundToNearestNice = (value: number): number => {
    const magnitude = Math.pow(10, Math.floor(Math.log10(value)));
    const normalized = value / magnitude;
    
    if (normalized < 1.5) return magnitude;
    if (normalized < 3) return 2 * magnitude;
    if (normalized < 7) return 5 * magnitude;
    return 10 * magnitude;
  };
  
  const tickInterval = roundToNearestNice(maxValue / (tickCount - 1));
  return Array.from({ length: tickCount }, (_, i) => i * tickInterval);
};

