
import React, { ReactElement } from 'react';
import { ResponsiveContainer } from 'recharts';
import { chartTheme } from './chartTheme';
import { BaseChartProps } from './types/chartTypes';

export const BaseChart: React.FC<BaseChartProps> = ({
  children,
  title,
  subtitle,
  height = 400,
  width = '100%',
  className = '',
  legendPosition = 'top',
}) => {
  const heightStyle = typeof height === 'number' ? `${height}px` : height;
  const widthStyle = typeof width === 'number' ? `${width}px` : width;
  
  // Ensure children is a valid React element
  const chartElement = React.isValidElement(children) 
    ? children 
    : null;
  
  return (
    <div 
      className={`chart-container ${className}`} 
      data-legend-position={legendPosition}
      style={{ marginBottom: '2rem' }}
    >
      {title && (
        <h3 
          className="chart-title text-lg font-semibold mb-1"
          style={{ fontSize: `${chartTheme.typography.fontSize.title}px` }}
        >
          {title}
        </h3>
      )}
      
      {subtitle && (
        <p 
          className="chart-subtitle text-sm text-muted-foreground mb-4"
          style={{ fontSize: `${chartTheme.typography.fontSize.subtitle}px` }}
        >
          {subtitle}
        </p>
      )}
      
      <div 
        className="chart-wrapper relative box-border"
        style={{ 
          width: widthStyle, 
          height: heightStyle,
          minHeight: '300px'
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          {chartElement}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
