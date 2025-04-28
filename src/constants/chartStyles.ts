
// Basic chart colors - use these exact colors in all charts
export const CHART_COLORS = {
  // Primary colors for pie charts and categorical data
  primary: [
    '#4a8cca', // Blue
    '#e97a32', // Orange
    '#5bae6a', // Green
    '#cb4b4b', // Red
    '#9b5dc4', // Purple
    '#d9803f', // Amber
    '#4db1b1', // Teal
    '#7a7a7a', // Gray
  ],
  
  // UI elements colors
  ui: {
    background: '#FFFFFF',
    gridLines: '#E0E0E0',
    text: '#333333',
    tooltipBackground: '#FFFFFF',
    tooltipBorder: '#E0E0E0',
  }
};

// Typography settings - use these exact settings in all charts
export const TYPOGRAPHY = {
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  sizes: {
    title: 16,
    label: 12,
    legend: 12,
    tooltip: 12,
    tick: 10,
  },
  weights: {
    bold: 600,
    medium: 500,
    normal: 400,
  }
};

// Consistent formatting functions
export const FORMATTERS = {
  // Format as percentage (e.g., 0.75 -> 75%)
  percentage: (value: number) => `${Math.round(value * 100)}%`,
  
  // Format as currency (e.g., 1000 -> $1,000)
  currency: (value: number, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0
    }).format(value);
  }
};
