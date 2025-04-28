
import { ChartConfig, ExtendedChartConfig, isExtendedConfig } from "./types";

export function getPayloadConfigFromPayload(
  config: ChartConfig | ExtendedChartConfig,
  payload: any,
  key: string
) {
  if (!config) {
    return null;
  }
  
  // Handle the ExtendedChartConfig case with colors
  if (isExtendedConfig(config)) {
    // For extended config, we create an ad-hoc compatible config item
    if (payload && payload.color) {
      return {
        label: payload.name || key,
        color: payload.color,
        // Add icon property to prevent TypeScript errors
        icon: undefined
      }
    }
    return null;
  }
  
  // Handle the standard ChartConfig case
  return config[key as keyof typeof config] || config[payload?.dataKey as keyof typeof config] || null;
}
