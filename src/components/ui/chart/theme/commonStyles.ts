
import { lightTheme } from '../chartTheme';

export const tooltipStyles = {
  wrapper: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    padding: '10px 12px',
    opacity: 1,
    fontSize: lightTheme.typography.fontSize.label,
    fontFamily: lightTheme.typography.fontFamily,
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

export const chartGridStyles = {
  stroke: '#e5e7eb',
  strokeDasharray: '4 4',
  opacity: 0.3,
};

export const legendStyles = {
  wrapper: {
    padding: '8px',
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap' as const,
    justifyContent: 'center',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: '#4b5563',
  },
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

