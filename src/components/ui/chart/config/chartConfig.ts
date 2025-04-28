
/**
 * Global chart configuration module to ensure consistency
 * across all visualizations in the application.
 */

// Primary color palette (for main data series)
export const primaryColors = [
  '#4a8cca', // Blue
  '#e97a32', // Orange
  '#5bae6a', // Green
  '#cb4b4b', // Red
  '#9b5dc4', // Purple
  '#d9803f', // Amber
  '#4db1b1', // Teal
  '#7a7a7a', // Gray
  '#d0ba39', // Yellow
  '#677ce0'  // Indigo
];

// Categorical color palette (for categorical data)
export const categoricalColors = [
  '#4a8cca', // Blue
  '#e97a32', // Orange
  '#5bae6a', // Green
  '#cb4b4b', // Red
  '#9b5dc4', // Purple
  '#d9803f', // Amber
  '#4db1b1', // Teal
  '#7a7a7a', // Gray
  '#d0ba39', // Yellow
  '#677ce0'  // Indigo
];

// Sequential color palette (for continuous data)
export const sequentialColors = [
  '#deedf7', // Lightest Blue
  '#c5dfef', 
  '#9cc7e1', 
  '#73aed2', 
  '#4a95c4', 
  '#2a75ad', 
  '#0d5696', 
  '#003b80'  // Darkest Blue
];

// UI Element colors
export const uiColors = {
  background: '#FFFFFF',
  gridLines: '#E0E0E0',
  text: '#333333',
  tooltipBackground: '#FFFFFF',
  tooltipText: '#333333',
  tooltipBorder: '#E0E0E0',
  axisColor: '#666666'
};

// Typography configuration
export const typography = {
  fontFamily: "'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontSize: {
    title: 16,
    axisLabel: 12,
    tickLabel: 10,
    legend: 12,
    tooltip: 12
  },
  fontWeight: {
    title: 600,
    axisLabel: 400,
    tickLabel: 400,
    legend: 400,
    tooltip: 400
  }
};

// Spacing configuration
export const spacing = {
  margin: {
    top: 20,
    right: 30,
    bottom: 50, // Increased for better axis label visibility
    left: 50    // Increased for better axis label visibility
  },
  padding: {
    top: 8,
    right: 8,
    bottom: 8,
    left: 8
  },
  legend: {
    iconSize: 14,
    iconType: 'rect' as const,
    layout: 'horizontal' as const,
    verticalAlign: 'bottom' as const,
    align: 'center' as const
  }
};

// Animation configuration
export const animation = {
  enabled: true,
  duration: 500,
  easing: 'ease'
};

// Data formatters
export const formatters = {
  // Format percentage values (e.g., 0.75 -> 75%)
  percentage: (value: number): string => {
    return `${Math.round(value * 100)}%`;
  },
  
  // Format currency values (e.g., 1000 -> $1,000)
  currency: (value: number, currency = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0
    }).format(value);
  },
  
  // Format large numbers with K, M abbreviations (e.g., 1500 -> 1.5K)
  shortNumber: (value: number): string => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  },
  
  // Format dates consistently
  date: (value: Date | number | string): string => {
    const date = new Date(value);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  },
  
  // Format durations (e.g., 25 -> 1d 1h)
  duration: (value: number): string => {
    if (value >= 24) {
      return `${Math.floor(value / 24)}d ${value % 24}h`;
    }
    return `${value}h`;
  }
};

// Default configuration for Recharts components
export const defaultChartConfig = {
  colors: {
    primary: primaryColors,
    categorical: categoricalColors,
    sequential: sequentialColors,
    ...uiColors
  },
  typography,
  spacing,
  animation,
  formatters
};

// Specific chart type configurations
export const pieChartConfig = {
  ...defaultChartConfig,
  innerRadius: 0,
  outerRadius: '80%',
  paddingAngle: 0,
  labelLine: true,
  startAngle: 90,
  endAngle: 450
};

export const barChartConfig = {
  ...defaultChartConfig,
  barSize: 20,
  barGap: 4,
  barCategoryGap: '20%',
  maxBarSize: 50
};

export const lineChartConfig = {
  ...defaultChartConfig,
  strokeWidth: 2,
  activeDot: {
    r: 6,
    strokeWidth: 1,
    stroke: '#FFFFFF'
  },
  dot: {
    r: 4,
    strokeWidth: 1,
    stroke: '#FFFFFF'
  }
};

export const areaChartConfig = {
  ...defaultChartConfig,
  strokeWidth: 2,
  fillOpacity: 0.6,
  stackOffset: 'none'
};

// Helper function to get color by index
export const getColorByIndex = (index: number, type: 'primary' | 'categorical' | 'sequential' = 'primary'): string => {
  const colorArray = type === 'primary' 
    ? primaryColors 
    : type === 'categorical' 
      ? categoricalColors 
      : sequentialColors;
      
  return colorArray[index % colorArray.length];
};

// Helper function to create a full chart configuration object
export const createChartConfig = (overrides: any = {}) => {
  return {
    ...defaultChartConfig,
    ...overrides,
    colors: {
      ...defaultChartConfig.colors,
      ...(overrides.colors || {})
    },
    typography: {
      ...defaultChartConfig.typography,
      ...(overrides.typography || {}),
      fontSize: {
        ...defaultChartConfig.typography.fontSize,
        ...(overrides.typography?.fontSize || {})
      }
    },
    spacing: {
      ...defaultChartConfig.spacing,
      ...(overrides.spacing || {}),
      margin: {
        ...defaultChartConfig.spacing.margin,
        ...(overrides.spacing?.margin || {})
      }
    }
  };
};

// Export default configuration
export default defaultChartConfig;
