
export interface ChartTheme {
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    quaternary: string;
    background: string;
    text: string;
    grid: string;
    accent: string[];
    tariff: {
      low: string;
      medium: string;
      high: string;
    };
    risk: {
      low: string;
      medium: string;
      high: string;
      critical: string;
    };
    lines?: {
      freight: string;
      cost: string;
      risk: string;
    };
  };
  typography: {
    fontFamily: string;
    fontSize: {
      title: number;
      subtitle: number;
      axis: number;
      label: number;
      tick: number;
    };
    sizes?: {
      legend: number;
      axis: number;
      label: number;
    };
    fontWeight: {
      normal: number;
      bold: number;
    };
  };
  spacing: {
    margin: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
    padding: {
      chart: number;
      tooltip: number;
      legend: number;
    };
    axisOffset: {
      x: number;
      y: number;
    };
    chartMargin?: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
  };
  grid: {
    stroke: string;
    strokeDasharray: string;
    opacity: number;
  };
  tooltip: {
    background: string;
    border: string;
    shadow: string;
    borderRadius: number;
  };
  animation: {
    duration: number;
    easing: string;
  };
  axisTitle?: {
    fontFamily: string;
    fontSize: number;
    fontWeight: number;
    color: string;
  };
}

// Light theme default configuration
export const lightTheme: ChartTheme = {
  colors: {
    primary: '#4f46e5',      // Indigo
    secondary: '#f59e0b',    // Amber
    tertiary: '#10b981',     // Emerald
    quaternary: '#ec4899',   // Pink
    background: '#ffffff',   // White
    text: '#374151',         // Gray 700
    grid: '#e5e7eb',         // Gray 200
    accent: [
      '#4f46e5',  // Indigo
      '#f59e0b',  // Amber
      '#10b981',  // Emerald
      '#ec4899',  // Pink
      '#ef4444',  // Red
      '#8b5cf6',  // Purple
      '#3b82f6',  // Blue
      '#f97316',  // Orange
    ],
    tariff: {
      low: '#10b981',      // Green (Low tariff)
      medium: '#f59e0b',   // Amber (Medium tariff)
      high: '#ef4444',     // Red (High tariff)
    },
    risk: {
      low: '#10b981',      // Green (Low risk)
      medium: '#f59e0b',   // Amber (Medium risk)
      high: '#ef4444',     // Red (High risk)
      critical: '#b91c1c',  // Dark red (Critical risk)
    },
    lines: {
      freight: '#3b82f6',  // Blue
      cost: '#f59e0b',     // Amber
      risk: '#ef4444',     // Red
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: {
      title: 16,
      subtitle: 14,
      axis: 14,
      label: 13,
      tick: 12,
    },
    sizes: {
      legend: 14,
      axis: 12,
      label: 13,
    },
    fontWeight: {
      normal: 400,
      bold: 600,
    },
  },
  spacing: {
    margin: {
      top: 40,
      right: 40,
      bottom: 100,
      left: 80,
    },
    padding: {
      chart: 16,
      tooltip: 12,
      legend: 8,
    },
    axisOffset: {
      x: 60,
      y: 60,
    },
    chartMargin: {
      top: 40,
      right: 40,
      bottom: 100,
      left: 80,
    },
  },
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
  colors: {
    ...lightTheme.colors,
    background: '#1f2937',   // Gray 800
    text: '#f3f4f6',         // Gray 100
    grid: '#374151',         // Gray 700
    accent: [
      '#6366f1',  // Lighter Indigo
      '#fbbf24',  // Lighter Amber
      '#34d399',  // Lighter Emerald
      '#f472b6',  // Lighter Pink
      '#f87171',  // Lighter Red
      '#a78bfa',  // Lighter Purple
      '#60a5fa',  // Lighter Blue
      '#fb923c',  // Lighter Orange
    ],
    lines: lightTheme.colors.lines,
  },
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
export const getMargins = (customMargins?: Partial<ChartTheme['spacing']['margin']>, mode: 'light' | 'dark' = 'light'): ChartTheme['spacing']['margin'] => {
  const theme = getChartTheme(mode);
  if (!customMargins) return theme.spacing.margin;
  
  return {
    ...theme.spacing.margin,
    ...customMargins,
  };
};

// Common chart element styling
export const chartElements = {
  // For custom axis title creation
  axisTitle: (text: string, axis: 'x' | 'y', options?: { offset?: number; position?: string; angle?: number }) => {
    const theme = getChartTheme();
    const defaultOffset = axis === 'x' ? theme.spacing.axisOffset.x : theme.spacing.axisOffset.y;
    const defaultPosition = axis === 'x' ? 'insideBottom' : 'insideLeft';
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
  
  // Grid styling
  grid: {
    stroke: lightTheme.grid.stroke,
    strokeDasharray: lightTheme.grid.strokeDasharray,
    opacity: lightTheme.grid.opacity,
  },
  
  // Axis styling
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
  
  // Tooltip styling
  tooltip: {
    contentStyle: {
      backgroundColor: lightTheme.tooltip.background,
      border: `1px solid ${lightTheme.tooltip.border}`,
      boxShadow: lightTheme.tooltip.shadow,
      borderRadius: `${lightTheme.tooltip.borderRadius}px`,
      padding: `${lightTheme.spacing.padding.tooltip}px`,
    },
    labelStyle: {
      fontWeight: lightTheme.typography.fontWeight.bold,
      marginBottom: '4px',
    },
    itemStyle: {
      padding: '2px 0',
    },
  },
  
  // Legend styling
  legend: {
    contentStyle: {
      padding: `${lightTheme.spacing.padding.legend}px`,
    },
    itemStyle: {
      padding: '0 10px',
    },
  },
};

// Add new utility functions for color selection
export const getTariffColor = (rate: number, mode: 'light' | 'dark' = 'light'): string => {
  const theme = getChartTheme(mode);
  if (rate <= 5) return theme.colors.tariff.low;
  if (rate <= 15) return theme.colors.tariff.medium;
  return theme.colors.tariff.high;
};

export const getRiskColor = (level: 'low' | 'medium' | 'high' | 'critical', mode: 'light' | 'dark' = 'light'): string => {
  const theme = getChartTheme(mode);
  return theme.colors.risk[level];
};

export const getAccentColor = (index: number, mode: 'light' | 'dark' = 'light'): string => {
  const theme = getChartTheme(mode);
  return theme.colors.accent[index % theme.colors.accent.length];
};

// Common chart configurations
export const commonChartConfig = (mode: 'light' | 'dark' = 'light') => {
  const theme = getChartTheme(mode);
  
  return {
    margin: theme.spacing.margin,
    fontSize: theme.typography.fontSize,
    fontFamily: theme.typography.fontFamily,
    colors: theme.colors,
    grid: theme.grid,
    tooltip: theme.tooltip,
    animation: theme.animation,
  };
};

export default {
  lightTheme,
  darkTheme,
  chartTheme,
  getChartTheme,
  getMargins,
  chartElements,
  getTariffColor,
  getRiskColor,
  getAccentColor,
  commonChartConfig,
};
