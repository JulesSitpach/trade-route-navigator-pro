
/**
 * Chart configuration exports
 */

// Export all configurations from chartConfig
export * from './chartConfig';
export { default as defaultChartConfig } from './chartConfig';

// Export specific chart type configurations
export { 
  pieChartConfig,
  barChartConfig,
  lineChartConfig,
  areaChartConfig,
  primaryColors,
  categoricalColors,
  sequentialColors,
  typography,
  spacing,
  animation,
  formatters,
  uiColors
} from './chartConfig';

// Export helper functions
export { getColorByIndex, createChartConfig } from './chartConfig';

// Create a chartConfig constant for easier imports
export const chartConfig = defaultChartConfig;
