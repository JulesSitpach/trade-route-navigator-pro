
/**
 * Chart configuration exports
 */

// Export base configuration
export { defaultChartConfig, createChartConfig } from './baseConfig';
export { default as defaultChartConfig } from './baseConfig';

// Export color configurations
export { 
  primaryColors, 
  categoricalColors, 
  sequentialColors, 
  uiColors,
  getColorByIndex 
} from './colors';

// Export typography configuration
export { typography } from './typography';
export { default as typography } from './typography';

// Export spacing configuration
export { spacing } from './spacing';
export { default as spacing } from './spacing';

// Export animation configuration
export { animation } from './animation';
export { default as animation } from './animation';

// Export formatter utilities
export { formatters } from './formatters';
export { default as formatters } from './formatters';

// Export chart type configurations
export {
  pieChartConfig,
  barChartConfig,
  lineChartConfig,
  areaChartConfig
} from './chartTypes';

// Create a chartConfig constant for easier imports
import defaultChartConfig from './baseConfig';
export const chartConfig = defaultChartConfig;
