
export interface ChartColors {
  primary: string;
  secondary: string;
  tertiary: string;
  quaternary: string;
  background: string;
  text: string;
  grid: string;
  accent: string[];
  tariff: {
    low: string;
    medium: string;
    high: string;
  };
  risk: {
    low: string;
    medium: string;
    high: string;
    critical: string;
  };
  lines?: {
    freight: string;
    cost: string;
    risk: string;
  };
  categories?: {
    shipping: string;
    customs: string;
    distribution: string;
    importDuty: string;
    freight: string;
    insurance: string;
    documentation: string;
    warehousing: string;
    [key: string]: string;
  };
}

export interface Typography {
  fontFamily: string;
  fontSize: {
    title: number;
    subtitle: number;
    axis: number;
    label: number;
    legend: number;
    tick: number;
  };
  fontWeight: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
}

export interface Spacing {
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  padding: {
    container: number;
    legend: number;
    tooltip: number;
  };
  axisOffset: {
    x: number;
    y: number;
  };
}

export interface ChartGridConfig {
  stroke: string;
  strokeDasharray: string;
  opacity: number;
}

export interface ChartTooltipConfig {
  background: string;
  border: string;
  shadow: string;
  borderRadius: number;
}

export interface ChartAnimationConfig {
  duration: number;
  easing: string;
}

export interface AxisTitleConfig {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  color: string;
}

export interface ChartTheme {
  colors: ChartColors;
  typography: Typography;
  spacing: Spacing;
  grid: ChartGridConfig;
  tooltip: ChartTooltipConfig;
  animation: ChartAnimationConfig;
  axisTitle: AxisTitleConfig;
}
