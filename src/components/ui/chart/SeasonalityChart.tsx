
import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend
} from 'recharts';
import { BaseChart } from './BaseChart';
import { chartTheme } from './chartTheme';
import { createAxisTitle } from './axisConfig';
import { SeasonalityChartProps } from './types/chartTypes';
import { SeasonalityTooltip } from '@/components/trade/visualizations/seasonality/SeasonalityTooltip';
import { ChartCustomLegend } from './ChartCustomLegend';
import { cursorStyles, tooltipStyles } from './theme/commonStyles';

export const SeasonalityChart: React.FC<SeasonalityChartProps> = ({ 
  data, 
  title, 
  subtitle,
  legendProps 
}) => {
  const defaultLegendProps = {
    verticalAlign: "top" as const, 
    align: "center" as const,
    height: 36,
    wrapperStyle: { paddingBottom: '20px' }
  };

  // Correctly merge legend props
  const mergedLegendProps = legendProps ? { ...defaultLegendProps, ...legendProps } : defaultLegendProps;

  return (
    <BaseChart 
      title={title || "Annual Shipping Trends"} 
      subtitle={subtitle}
      height={400}
    >
      <LineChart
        data={data}
        margin={chartTheme.spacing.margin}
      >
        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke={chartTheme.grid.stroke} 
          opacity={0.15}
        />
        
        <XAxis 
          dataKey="month" 
          label={createAxisTitle("Month", "x")}
          tick={{ 
            fontSize: chartTheme.typography.fontSize.axis,
            fill: chartTheme.colors.text 
          }}
        />
        
        <YAxis 
          yAxisId="left"
          label={createAxisTitle("Freight Cost Index", "y")}
          tick={{ 
            fontSize: chartTheme.typography.fontSize.axis,
            fill: chartTheme.colors.text 
          }}
        />
        
        <YAxis 
          yAxisId="right" 
          orientation="right"
          label={createAxisTitle("Risk/Congestion (%)", "y", { position: "insideRight" })}
          tick={{ 
            fontSize: chartTheme.typography.fontSize.axis,
            fill: chartTheme.colors.text 
          }}
        />
        
        <Tooltip 
          content={<SeasonalityTooltip />}
          cursor={cursorStyles.line}
          wrapperStyle={tooltipStyles.wrapper}
          contentStyle={tooltipStyles.contentStyle}
        />
        
        <Legend 
          content={(props) => <ChartCustomLegend {...props} {...mergedLegendProps} />}
        />
        
        <Line 
          yAxisId="left" 
          type="monotone" 
          dataKey="freight" 
          stroke={chartTheme.colors.lines?.freight || '#3b82f6'} 
          activeDot={{ r: 6 }} 
          name="Freight"
          strokeWidth={2}
        />
        
        <Line 
          yAxisId="right" 
          type="monotone" 
          dataKey="congestion" 
          stroke={chartTheme.colors.lines?.cost || '#f59e0b'} 
          activeDot={{ r: 6 }} 
          name="Congestion"
          strokeWidth={2}
        />
        
        <Line 
          yAxisId="right" 
          type="monotone" 
          dataKey="risk" 
          stroke={chartTheme.colors.lines?.risk || '#ef4444'} 
          activeDot={{ r: 6 }} 
          name="Risk"
          strokeWidth={2}
        />
      </LineChart>
    </BaseChart>
  );
};
