
import React from 'react';

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<"light" | "dark", string> }
  )
}

export type ExtendedChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<"light" | "dark", string> }
  )
} | {
  colors: {
    background: string;
    gridLines: string;
    text: string;
    tooltipBackground: string;
    tooltipText: string;
    tooltipBorder: string;
    axisColor: string;
    primary: string[];
    categorical: string[];
    sequential: string[];
    [key: string]: any;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      title: number;
      axisLabel?: number;
      tickLabel?: number;
      legend?: number;
      tooltip?: number;
      subtitle?: number;
      axis?: number;
      label?: number;
      tick?: number;
    };
    fontWeight: {
      title?: number;
      axisLabel?: number;
      tickLabel?: number;
      legend?: number;
      tooltip?: number;
      light?: number;
      normal?: number;
      medium?: number;
      semibold?: number;
      bold?: number;
    };
  };
  spacing: any;
  animation: any;
  formatters: any;
};

export type ChartContextProps = {
  config: ChartConfig | ExtendedChartConfig;
}

export type AxisTitleConfig = {
  fontFamily: string;
  fontSize: string;
  fontWeight: number;
  color: string;
  padding: number;
  offset: {
    x: number;
    y: number;
  };
}

// Format: { THEME_NAME: CSS_SELECTOR }
export const THEMES = { light: "", dark: ".dark" } as const

// Type guard to check if an object is an ExtendedChartConfig with colors property
export function isExtendedConfig(config: ChartConfig | ExtendedChartConfig): config is ExtendedChartConfig & {colors: any} {
  return config && 'colors' in config && typeof config.colors === 'object';
}
