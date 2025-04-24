
import { lightTheme } from '@/components/ui/chart/chartTheme';
import { getChartTheme, getMargins } from '@/components/ui/chart/chartTheme';

// Common chart configuration settings
export const chartCommonConfig = {
  margins: {
    default: getMargins(),
    withXLabels: getMargins({ bottom: 80 }) // Extra space for rotated x-axis labels
  },
  legend: {
    position: {
      vertical: "top" as const,
      align: "center" as const
    }
  },
  grid: {
    strokeDasharray: lightTheme.grid.strokeDasharray,
    strokeOpacity: lightTheme.grid.opacity,
    stroke: lightTheme.grid.stroke,
    vertical: true,
    horizontal: true
  },
  axis: {
    tick: {
      fontSize: getChartTheme().typography.fontSize.tick,
      fill: getChartTheme().colors.text,
      fontWeight: getChartTheme().typography.fontWeight.normal,
    },
    label: {
      fontSize: getChartTheme().typography.fontSize.axis,
      fill: getChartTheme().colors.text,
      fontWeight: getChartTheme().typography.fontWeight.bold,
    },
    line: {
      stroke: getChartTheme().colors.text,
      strokeWidth: 1
    },
    format: {
      percentage: (value: number) => `${value}%`,
      currency: (value: number) => `$${value}`,
      number: (value: number) => value.toLocaleString()
    }
  },
  tooltip: {
    style: getChartTheme().tooltip
  }
};

// Formatter functions
export const formatters = {
  currency: (value: number) => `$${value.toLocaleString()}`,
  percentage: (value: number) => `${value}%`,
  number: (value: number) => value.toLocaleString()
};

// Common chart dimensions
export const chartDimensions = {
  height: {
    default: 350,
    large: 450
  },
  pieChart: {
    innerRadius: 60,
    outerRadius: 120
  }
};
