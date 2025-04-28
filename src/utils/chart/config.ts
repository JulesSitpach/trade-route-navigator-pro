
// Chart configuration constants
export const chartCommonConfig = {
  margins: {
    default: { top: 30, right: 20, bottom: 60, left: 60 },
    withXLabels: { top: 30, right: 20, bottom: 80, left: 60 }
  },
  // Grid styling
  grid: {
    stroke: '#e2e8f0',
    strokeDasharray: '3 3',
    opacity: 0.7,
  },
  
  // Axis styling
  axis: {
    line: { stroke: '#94a3b8', strokeWidth: 1 },
    tick: { stroke: '#94a3b8', strokeWidth: 1 },
  },
  
  // Responsive behavior
  responsive: {
    aspect: 4.0 / 3.0,
    width: '100%',
    minHeight: 300,
  },
};

export default chartCommonConfig;
