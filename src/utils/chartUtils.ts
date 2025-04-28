
// This file is kept for backward compatibility
// It simply re-exports from the new modular structure

import chartUtils from './chart';
export * from './chart';
export default chartUtils;

// Re-export enhancedColors directly to maintain backward compatibility
export const enhancedColors = chartUtils.enhancedColors;

// Re-export chartCommonConfig directly to maintain backward compatibility
export const chartCommonConfig = chartUtils.chartCommonConfig;
