
/**
 * Chart configuration exports
 */

// Export all configurations from chartConfig
export * from './chartConfig';
export { default as defaultChartConfig } from './chartConfig';

// Export specific chart type configurations
export { pieChartConfig } from './chartConfig';
export { barChartConfig } from './chartConfig';
export { lineChartConfig } from './chartConfig';
export { areaChartConfig } from './chartConfig';

// Export helper functions
export { getColorByIndex, createChartConfig } from './chartConfig';
