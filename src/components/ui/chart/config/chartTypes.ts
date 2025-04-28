
/**
 * Chart type-specific configurations
 */

import { defaultChartConfig } from './baseConfig';

export const pieChartConfig = {
  ...defaultChartConfig,
  innerRadius: 0,
  outerRadius: '80%',
  paddingAngle: 0,
  labelLine: true,
  startAngle: 90,
  endAngle: 450
};

export const barChartConfig = {
  ...defaultChartConfig,
  barSize: 20,
  barGap: 4,
  barCategoryGap: '20%',
  maxBarSize: 50
};

export const lineChartConfig = {
  ...defaultChartConfig,
  strokeWidth: 2,
  activeDot: {
    r: 6,
    strokeWidth: 1,
    stroke: '#FFFFFF'
  },
  dot: {
    r: 4,
    strokeWidth: 1,
    stroke: '#FFFFFF'
  }
};

export const areaChartConfig = {
  ...defaultChartConfig,
  strokeWidth: 2,
  fillOpacity: 0.6,
  stackOffset: 'none'
};

export default {
  pieChartConfig,
  barChartConfig,
  lineChartConfig,
  areaChartConfig
};
