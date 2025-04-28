
/**
 * Base chart configuration that combines all configuration modules
 */

import { primaryColors, categoricalColors, sequentialColors, uiColors } from './colors';
import typography from './typography';
import spacing from './spacing';
import animation from './animation';
import formatters from './formatters';

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

// Helper function to create a full chart configuration object with overrides
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

export default defaultChartConfig;
