
export const chartTheme = {
  colors: {
    // Core palette matching your existing charts
    primary: ['#8257e6', '#f97316', '#10b981', '#06b6d4', '#6366f1'],
    categorical: {
      freight: '#8257e6',      // Purple
      customs: '#f97316',      // Orange
      handling: '#06b6d4',     // Blue
      insurance: '#e879f9',    // Pink
      documentation: '#6b7280', // Gray
      compliance: '#6366f1',   // Indigo
      lastMile: '#fbbf24',     // Yellow
    },
    risk: {
      low: '#10b981',          // Green
      medium: '#f97316',       // Orange
      high: '#ef4444',         // Red
    },
    lines: {
      freight: '#8257e6',      // Purple
      cost: '#06b6d4',         // Blue  
      risk: '#ef4444',         // Red
    },
    background: '#ffffff',
    grid: '#e5e7eb',
    text: '#111827',
    axisLine: '#d1d5db',
  },
  
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    sizes: {
      title: '1.125rem',       // 18px
      subtitle: '0.875rem',    // 14px 
      axis: '0.75rem',         // 12px
      label: '0.75rem',        // 12px
      legend: '0.75rem',       // 12px
    },
    weights: {
      normal: 400,
      medium: 500,
      semibold: 600,
    },
  },
  
  spacing: {
    chartMargin: { top: 20, right: 30, bottom: 50, left: 50 },
    chartPadding: 16,
    legendSpacing: 12,
    tickSize: 5,
    axisOffset: 5,
  },
  
  borders: {
    chartBorder: '1px solid #f3f4f6',
    radius: '0.375rem',        // 6px
  },
  
  grid: {
    show: true,
    stroke: '#e5e7eb',
    strokeWidth: 1,
    strokeDasharray: '0',
  },
  
  tooltip: {
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '0.25rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    padding: '0.5rem 0.75rem',
    fontSize: '0.75rem',
  },
  
  animation: {
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

