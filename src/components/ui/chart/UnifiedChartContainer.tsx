
import React, { ReactElement } from 'react';
import { ResponsiveContainer } from 'recharts';
import { useChartTheme } from './ChartThemeProvider';
import { fontStyles } from '@/utils/fontStyles';
import { cn } from '@/lib/utils';
import { defaultChartConfig } from './config';

interface UnifiedChartContainerProps {
  children: ReactElement; // Changed from ReactNode to ReactElement for Recharts compatibility
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
        '--chart-font-family': theme.typography?.fontFamily || fontStyles.family,
        '--chart-text-size': theme.typography?.fontSize?.tick || fontStyles.sizes.axisLabel,
        width: widthStyle,
      } as React.CSSProperties}
    >
      {title && (
        <h3 
          className="text-lg font-medium mb-2"
          style={{ 
            fontSize: theme.typography?.fontSize?.title || fontStyles.sizes.chartTitle,
            fontWeight: theme.typography?.fontWeight?.semibold || fontStyles.weights.semibold
          }}
        >
          {title}
        </h3>
      )}
      {subtitle && (
        <p 
          className="text-sm text-muted-foreground mb-4"
          style={{ 
            fontSize: theme.typography?.fontSize?.subtitle || fontStyles.sizes.tooltipBody
          }}
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
          {children}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
