
import { TextAnchor } from '@/components/ui/chart/types/textTypes';
import { Props as LabelProps } from 'recharts/types/component/Label';
import { LabelPosition } from 'recharts/types/component/Label';

/**
 * Creates a standard axis title with consistent styling
 */
export const createAxisTitle = (
  text: string, 
  axis: 'x' | 'y', 
  options?: { 
    offset?: number; 
    position?: LabelPosition; 
    angle?: number;
  }
): LabelProps => {
  const defaultStyle = {
    textAnchor: 'middle' as TextAnchor,
    fill: '#64748b',
    fontSize: 14,
    fontWeight: 500,
  };
  
  const defaultPosition = axis === 'x' ? 'insideBottom' : 'insideLeft';
  const defaultAngle = axis === 'x' ? 0 : -90;
  const defaultOffset = axis === 'x' ? 20 : -10;
  
  return {
    value: text,
    position: options?.position || defaultPosition as LabelPosition,
    offset: options?.offset ?? defaultOffset,
    angle: options?.angle ?? defaultAngle,
    style: defaultStyle
  };
};

/**
 * Generates Y-axis ticks with rounded, pleasant intervals
 */
export const generateYAxisTicks = (maxValue: number, tickCount: number = 5): number[] => {
  const roundToNearestNice = (value: number): number => {
    const magnitude = Math.pow(10, Math.floor(Math.log10(value)));
    const normalized = value / magnitude;
    
    if (normalized < 1.5) return magnitude;
    if (normalized < 3) return 2 * magnitude;
    if (normalized < 7) return 5 * magnitude;
    return 10 * magnitude;
  };
  
  const tickInterval = roundToNearestNice(maxValue / (tickCount - 1));
  const ticks = [];
  
  for (let i = 0; i < tickCount; i++) {
    ticks.push(i * tickInterval);
  }
  
  return ticks;
};

/**
 * Gets appropriate chart margins based on chart type
 */
export const getChartMargins = (
  chartType: 'bar' | 'line' | 'scatter' | 'area' | 'pie' | 'radar' | 'heatmap',
  customMargins?: { 
    top?: number; 
    right?: number; 
    bottom?: number; 
    left?: number; 
  }
) => {
  const baseMargins = {
    bar: { top: 30, right: 20, bottom: 60, left: 60 },
    line: { top: 30, right: 20, bottom: 60, left: 60 },
    scatter: { top: 40, right: 40, bottom: 100, left: 80 },
    area: { top: 30, right: 20, bottom: 60, left: 60 },
    pie: { top: 20, right: 20, bottom: 20, left: 20 },
    radar: { top: 30, right: 30, bottom: 30, left: 30 },
    heatmap: { top: 40, right: 40, bottom: 100, left: 80 },
  };

  const margins = baseMargins[chartType];
  
  return {
    top: customMargins?.top ?? margins.top,
    right: customMargins?.right ?? margins.right,
    bottom: customMargins?.bottom ?? margins.bottom,
    left: customMargins?.left ?? margins.left,
  };
};
