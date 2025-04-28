
// Export all chart components from this file
export * from './chart/UnifiedChartContainer';
export * from './chart/ChartThemeProvider';
export * from './chart/ChartTooltip';
export * from './chart/ChartLegend';
export * from './chart/types/chartTypes';

// Export chart configuration
export * from './chart/config';
export { defaultChartConfig } from './chart/config';

// Re-export hooks
export { useChartTheme, useChartColors } from '@/hooks/use-chart-theme';
export { default as useChartConfig } from '@/hooks/use-chart-config';

// Export types
export type { ChartThemeContextType } from './chart/ChartThemeProvider';
