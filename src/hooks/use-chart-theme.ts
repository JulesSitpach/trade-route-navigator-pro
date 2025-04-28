
import { useContext } from 'react';
import { ChartThemeContext } from '@/components/ui/chart/ChartThemeProvider';

export const useChartTheme = () => {
  const context = useContext(ChartThemeContext);
  if (!context) {
    throw new Error('useChartTheme must be used within a ChartThemeProvider');
  }
  return context;
};

export const useChartColors = () => {
  const { colors } = useChartTheme();
  return colors;
};

export const useChartConfig = () => {
  const { theme } = useChartTheme();
  
  return {
    grid: {
      stroke: theme.grid.stroke,
      strokeDasharray: theme.grid.strokeDasharray,
      opacity: theme.grid.opacity,
    },
    axis: {
      line: { stroke: theme.colors.grid, strokeWidth: 1 },
      tick: { 
        fill: theme.colors.text, 
        fontSize: theme.typography.fontSize.tick 
      },
      title: {
        fill: theme.colors.text,
        fontSize: theme.typography.fontSize.axis,
        fontWeight: theme.typography.fontWeight.medium,
      }
    },
    tooltip: {
      background: theme.tooltip.background,
      border: theme.tooltip.border,
      shadow: theme.tooltip.shadow,
      borderRadius: theme.tooltip.borderRadius,
    }
  };
};
