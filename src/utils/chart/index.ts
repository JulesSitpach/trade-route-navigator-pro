
// Export everything from individual files
export * from './enhancedColors';
export * from './config';
export * from './axisUtils';
export * from './bubbleUtils';
export * from './colorUtils';
export * from './formatters';
export * from './payloadUtils';

// Re-export enhancedColors as default for backward compatibility
import { enhancedColors } from './enhancedColors';
import chartCommonConfig from './config';

// Create a default export that matches the original structure
export default {
  enhancedColors,
  chartCommonConfig,
  createAxisTitle: require('./axisUtils').createAxisTitle,
  getChartMargins: require('./axisUtils').getChartMargins,
  calculateBubbleSize: require('./bubbleUtils').calculateBubbleSize,
  getColorByThreshold: require('./colorUtils').getColorByThreshold,
  getTariffColor: require('./colorUtils').getTariffColor,
  getCategoryColor: require('./colorUtils').getCategoryColor,
  formatCurrency: require('./formatters').formatCurrency,
  formatPercent: require('./formatters').formatPercent,
  formatNumber: require('./formatters').formatNumber,
  getPayloadConfigFromPayload: require('./payloadUtils').getPayloadConfigFromPayload,
};
