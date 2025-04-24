// Common chart configuration settings
export const chartCommonConfig = {
  margins: {
    default: {
      top: 60, // Increased top margin for legend
      right: 30,
      left: 60, // Increased left margin for y-axis label
      bottom: 60 // Increased bottom margin for x-axis label
    },
    withXLabels: {
      top: 60,
      right: 30,
      left: 60,
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
    strokeDasharray: "3 3",
    strokeOpacity: 0.15,
    stroke: "#8E9196",
    vertical: true,
    horizontal: true
  },
  axis: {
    tick: {
      fontSize: 12,
      fill: "#8E9196",
      fontWeight: 400,
      dy: 8
    },
    label: {
      fontSize: 13,
      fill: "#403E43",
      fontWeight: 500,
      offset: 45,
      margin: 10
    },
    line: {
      stroke: "#E5E7EB",
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
      background: "#ffffff",
      border: "1px solid rgba(0,0,0,0.1)",
      borderRadius: "6px",
      padding: "8px 12px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
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
    default: 350, // Reduced from 400 for better window fit
    large: 450    // Reduced from 500 for better window fit
  },
  pieChart: {
    innerRadius: 60,  // Adjusted for better proportions
    outerRadius: 120  // Adjusted for better proportions
  }
};
