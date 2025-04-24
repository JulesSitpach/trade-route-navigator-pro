
import { ReactElement } from 'react';

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
}
