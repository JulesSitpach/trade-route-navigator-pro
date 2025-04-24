
import { ReactElement } from 'react';

export interface BaseChartProps {
  children: ReactElement;  // Changed from ReactNode to ReactElement
  title?: string;
  subtitle?: string;
  height?: number | string;
  width?: number | string;
  className?: string;
  legendPosition?: 'top' | 'bottom' | 'right';
}

export interface AxisTitleProps {
  text: string;
  axis: 'x' | 'y';
  offset?: number;
  position?: 'insideLeft' | 'insideRight' | 'insideTop' | 'insideBottom' | 'outside';
  angle?: number;
}

export interface SeasonalityDataPoint {
  month: string;
  freight: number;
  congestion: number;
  risk: number;
}

export interface SeasonalityChartProps {
  data: SeasonalityDataPoint[];
  title?: string;
  subtitle?: string;
}
