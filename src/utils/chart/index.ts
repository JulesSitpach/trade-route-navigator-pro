
// Export everything from individual files
export * from './enhancedColors';
export * from './config';
export * from './axisUtils';
export * from './bubbleUtils';
export * from './colorUtils';
export * from './formatters';
export * from './payloadUtils';

// Import specific functions to re-export
import { enhancedColors } from './enhancedColors';
import chartCommonConfig from './config';
import { createAxisTitle, getChartMargins } from './axisUtils';
import { calculateBubbleSize } from './bubbleUtils';
import { getColorByThreshold, getTariffColor, getCategoryColor } from './colorUtils';
import { formatCurrency, formatPercent, formatNumber } from './formatters';
import { getPayloadConfigFromPayload } from './payloadUtils';

// Create a default export that matches the original structure
export default {
  enhancedColors,
  chartCommonConfig,
  createAxisTitle,
  getChartMargins,
  calculateBubbleSize,
  getColorByThreshold,
  getTariffColor,
  getCategoryColor,
  formatCurrency,
  formatPercent,
  formatNumber,
  getPayloadConfigFromPayload,
};

// Re-export enhancedColors directly to maintain backward compatibility
export { enhancedColors };

// Re-export chartCommonConfig directly to maintain backward compatibility
export { chartCommonConfig };
