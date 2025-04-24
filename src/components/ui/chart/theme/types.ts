
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
  lines: {
    freight: string;
    cost: string;
    risk: string;
  };
}

export interface ChartTypography {
  fontFamily: string;
  fontSize: {
    title: number;
    subtitle: number;
    axis: number;
    label: number;
    tick: number;
  };
  sizes: {
    legend: number;
    axis: number;
    label: number;
  };
  fontWeight: {
    normal: number;
    bold: number;
  };
}

export interface ChartSpacing {
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  padding: {
    chart: number;
    tooltip: number;
    legend: number;
  };
  axisOffset: {
    x: number;
    y: number;
  };
  chartMargin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export interface ChartGrid {
  stroke: string;
  strokeDasharray: string;
  opacity: number;
}

export interface ChartTooltip {
  background: string;
  border: string;
  shadow: string;
  borderRadius: number;
}

export interface ChartAxisTitle {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  color: string;
}

export interface ChartTheme {
  colors: ChartColors;
  typography: ChartTypography;
  spacing: ChartSpacing;
  grid: ChartGrid;
  tooltip: ChartTooltip;
  animation: {
    duration: number;
    easing: string;
  };
  axisTitle: ChartAxisTitle;
}
