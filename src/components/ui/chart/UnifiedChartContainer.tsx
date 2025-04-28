
import React from 'react';
import { ResponsiveContainer } from 'recharts';
import { useChartTheme } from './ChartThemeProvider';
import { fontStyles } from '@/utils/fontStyles';
import { cn } from '@/lib/utils';

interface UnifiedChartContainerProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  height?: number | string;
  width?: number | string;
  className?: string;
  legendPosition?: 'top' | 'bottom' | 'right';
}

export const UnifiedChartContainer: React.FC<UnifiedChartContainerProps> = ({
  children,
  title,
  subtitle,
  height = 400,
  width = '100%',
  className,
  legendPosition = 'top'
}) => {
  const { theme } = useChartTheme();
  
  const heightStyle = typeof height === 'number' ? `${height}px` : height;
  const widthStyle = typeof width === 'number' ? `${width}px` : width;
  
  return (
    <div 
      className={cn(
        "chart-container",
        "relative flex flex-col",
        "text-[length:var(--chart-text-size,0.75rem)]",
        "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground",
        "[&_.recharts-cartesian-grid_line]:stroke-border/50",
        "[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border",
        "[&_.recharts-polar-grid]:stroke-border",
        "[&_.recharts-radar-grid]:stroke-border",
        "[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted/50",
        "[&_.recharts-reference-line]:stroke-border",
        "[&_[data-legend-position=right]_.recharts-legend-wrapper]:right-0",
        "[&_[data-legend-position=bottom]_.recharts-legend-wrapper]:bottom-0",
        className
      )}
      data-legend-position={legendPosition}
      style={{
        '--chart-font-family': fontStyles.family,
        '--chart-text-size': fontStyles.sizes.axisLabel,
        width: widthStyle,
      } as React.CSSProperties}
    >
      {title && (
        <h3 
          className="text-lg font-medium mb-2"
          style={{ fontSize: fontStyles.sizes.chartTitle }}
        >
          {title}
        </h3>
      )}
      {subtitle && (
        <p 
          className="text-sm text-muted-foreground mb-4"
          style={{ fontSize: fontStyles.sizes.tooltipBody }}
        >
          {subtitle}
        </p>
      )}
      <div 
        className="chart-wrapper w-full h-full overflow-visible"
        style={{ 
          minHeight: '300px',
          maxHeight: '600px',
          aspectRatio: heightStyle ? undefined : '16/9',
          height: heightStyle,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          {/* The key fix: Ensure children is a valid React element */}
          {React.Children.only(children)}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
