
export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<"light" | "dark", string> }
  )
}

export type ChartContextProps = {
  config: ChartConfig
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

