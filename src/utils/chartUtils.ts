
import { chartTheme } from './chartTheme';

// Common chart configuration settings
export const chartCommonConfig = {
  margins: {
    default: chartTheme.spacing.chartMargin,
    withXLabels: {
      ...chartTheme.spacing.chartMargin,
      bottom: 80 // Extra space for rotated x-axis labels
    }
  },
  legend: {
    position: {
      vertical: "top" as const,
      align: "center" as const
    }
  },
  grid: {
    strokeDasharray: chartTheme.grid.strokeDasharray,
    strokeOpacity: 0.15,
    stroke: chartTheme.grid.stroke,
    vertical: true,
    horizontal: true
  },
  axis: {
    tick: {
      fontSize: parseInt(chartTheme.typography.sizes.axis),
      fill: chartTheme.colors.text,
      fontWeight: chartTheme.typography.weights.normal,
      dy: chartTheme.spacing.tickSize
    },
    label: {
      fontSize: parseInt(chartTheme.typography.sizes.label),
      fill: chartTheme.colors.text,
      fontWeight: chartTheme.typography.weights.medium,
      offset: chartTheme.spacing.axisOffset,
      margin: chartTheme.spacing.chartPadding
    },
    line: {
      stroke: chartTheme.colors.axisLine,
      strokeWidth: 1
    },
    format: {
      percentage: (value: number) => `${value}%`,
      currency: (value: number) => `$${value}`,
      number: (value: number) => value.toLocaleString()
    }
  },
  tooltip: {
    style: {
      background: chartTheme.tooltip.background,
      border: chartTheme.tooltip.border,
      borderRadius: chartTheme.tooltip.borderRadius,
      padding: chartTheme.tooltip.padding,
      boxShadow: chartTheme.tooltip.boxShadow
    }
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

