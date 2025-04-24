
// Common chart configuration settings
export const chartCommonConfig = {
  margins: {
    default: {
      top: 40,
      right: 30,
      left: 40,
      bottom: 40
    },
    withXLabels: {
      top: 40,
      right: 30,
      left: 40,
      bottom: 60 // Extra space for rotated x-axis labels
    }
  },
  legend: {
    position: {
      vertical: "top" as const,
      align: "center" as const
    }
  },
  grid: {
    strokeDasharray: "3 3",
    strokeOpacity: 0.3
  },
  axis: {
    tick: {
      fontSize: 11,
      fill: "#666"
    },
    label: {
      fontSize: 12,
      fill: "#64748b",
      offset: 10
    }
  },
  tooltip: {
    style: {
      background: "#ffffff",
      border: "1px solid rgba(0,0,0,0.1)",
      borderRadius: "6px",
      padding: "8px 12px"
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
    default: 400,
    large: 500
  },
  pieChart: {
    innerRadius: 70,
    outerRadius: 140
  }
};
