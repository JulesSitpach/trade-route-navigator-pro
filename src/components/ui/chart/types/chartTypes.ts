
import { ReactElement } from 'react';

// Define the alignment types explicitly instead of importing them
type VerticalAlignment = 'top' | 'middle' | 'bottom'; 
type HorizontalAlignment = 'left' | 'center' | 'right';
type Layout = 'horizontal' | 'vertical';

export interface BaseChartProps {
  children: ReactElement;
  title?: string;
  subtitle?: string;
  height?: number | string;
  width?: string | number;
  className?: string;
  legendPosition?: 'top' | 'bottom' | 'right';
}

export interface SeasonalityChartProps {
  data: {
    month: string;
    freight: number;
    congestion: number;
    risk: number;
  }[];
  title?: string;
  subtitle?: string;
  legendProps?: {
    verticalAlign?: VerticalAlignment;
    align?: HorizontalAlignment;
    height?: number;
    wrapperStyle?: React.CSSProperties;
  };
}
