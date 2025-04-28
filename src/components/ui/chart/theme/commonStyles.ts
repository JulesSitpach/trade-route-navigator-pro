
import { lightTheme } from '../chartTheme';

export const tooltipStyles = {
  wrapper: {
    backgroundColor: '#FFFFFF',   // White
    border: '1px solid #BDC3C7',  // Mid Gray border
    borderRadius: '6px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    padding: '10px 12px',
    opacity: 1,  // Ensure full opacity
    fontSize: lightTheme.typography.fontSize.label,
    fontFamily: lightTheme.typography.fontFamily,
  },
  contentStyle: {
    backgroundColor: '#FFFFFF',
    fontSize: '12px',
    opacity: 1
  },
  title: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#2C3E50', // Navy Blue
    marginBottom: '8px',
    borderBottom: '1px solid #ECF0F1', // Light Gray
    paddingBottom: '4px',
  },
  content: {
    fontSize: '13px',
    color: '#2C3E50', // Navy Blue
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
    color: '#2C3E50', // Navy Blue
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
    stroke: '#BDC3C7', // Mid Gray
    strokeDasharray: '3 3' 
  },
  line: { 
    stroke: '#BDC3C7', // Mid Gray
    strokeDasharray: '3 3' 
  },
  scatter: { 
    fill: 'transparent',
    stroke: '#BDC3C7', // Mid Gray
    strokeDasharray: '3 3'
  },
  area: { 
    fill: 'transparent', 
    stroke: '#BDC3C7', // Mid Gray
    strokeDasharray: '3 3' 
  }
};

export const chartGridStyles = {
  stroke: '#ECF0F1', // Light Gray
  strokeDasharray: '4 4',
  opacity: 0.5,
};

export const axisStyles = {
  line: {
    stroke: '#7F8C8D', // Dark Gray
    strokeWidth: 1,
  },
  tick: {
    fill: '#2C3E50', // Navy Blue
    fontSize: 12,
  },
  label: {
    fill: '#2C3E50', // Navy Blue
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
