import { lightTheme } from '../chartTheme';

export const tooltipStyles = {
  wrapper: {
    backgroundColor: '#ffffff',   // Pure white
    border: '1px solid rgba(229, 231, 235, 1)',  // Light gray border
    borderRadius: '6px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    padding: '10px 12px',
    opacity: 1,  // Ensure full opacity
    fontSize: lightTheme.typography.fontSize.label,
    fontFamily: lightTheme.typography.fontFamily,
  },
  contentStyle: {
    backgroundColor: '#ffffff',
    fontSize: '12px',
    opacity: 1
  },
  title: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#374151',
    marginBottom: '8px',
    borderBottom: '1px solid #f3f4f6',
    paddingBottom: '4px',
  },
  content: {
    fontSize: '13px',
    color: '#4b5563',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '4px',
  },
};

export const legendStyles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '16px'
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '24px'
  },
  icon: {
    width: '12px',
    height: '12px',
    marginRight: '8px',
    borderRadius: '2px'
  },
  text: {
    fontSize: '14px',
    color: '#4b5563',
    fontWeight: 400
  },
  wrapper: {
    padding: '8px',
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap' as const,
    justifyContent: 'center',
  }
};

export const cursorStyles = {
  bar: { 
    fill: 'transparent',
    stroke: '#e5e7eb', 
    strokeDasharray: '3 3' 
  },
  line: { 
    stroke: '#e5e7eb', 
    strokeDasharray: '3 3' 
  },
  scatter: { 
    fill: 'transparent',
    stroke: '#e5e7eb',
    strokeDasharray: '3 3'
  },
  area: { 
    fill: 'transparent', 
    stroke: '#e5e7eb', 
    strokeDasharray: '3 3' 
  }
};

export const chartGridStyles = {
  stroke: '#e5e7eb',
  strokeDasharray: '4 4',
  opacity: 0.3,
};

export const axisStyles = {
  line: {
    stroke: '#9ca3af',
    strokeWidth: 1,
  },
  tick: {
    fill: '#6b7280',
    fontSize: 12,
  },
  label: {
    fill: '#4b5563',
    fontSize: 13,
    fontWeight: 500,
  },
};

export const calculateBubbleSize = (value: number, minValue: number, maxValue: number): number => {
  const minRadius = 5;
  const maxRadius = 20;
  
  if (minValue === maxValue) return (minRadius + maxRadius) / 2;
  
  const scale = (value - minValue) / (maxValue - minValue);
  return minRadius + scale * (maxRadius - minRadius);
};
