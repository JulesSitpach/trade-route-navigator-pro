
import * as React from "react"
import { ChartConfig, ExtendedChartConfig, THEMES, isExtendedConfig } from "./types"

function getVarName(key: string) {
  return `--chart-${key.replace(/[A-Z]/g, "-$&").toLowerCase()}`
}

export function ChartStyle({
  id,
  config,
}: {
  id: string
  config: ChartConfig | ExtendedChartConfig
}) {
  if (!config || Object.keys(config).length === 0) {
    return null
  }

  // If it's an extended config with colors property
  if (isExtendedConfig(config)) {
    // We don't generate styles for this type of config
    // Those styles are applied directly via style props
    return null;
  }

  // Standard ChartConfig handling
  const rules = Object.entries(config).flatMap(([key, value]) => {
    const label = typeof value === "object" && "label" in value ? value.label : key
    const color =
      typeof value === "object" && "color" in value && value.color
        ? value.color
        : null
    const theme =
      typeof value === "object" && "theme" in value && value.theme
        ? value.theme
        : null

    if (!color && !theme) {
      return []
    }

    if (color) {
      return [
        {
          selector: `[data-chart="${id}"] .chart-${key}`,
          rule: { [getVarName("color")]: color },
        },
      ]
    }

    if (theme) {
      return Object.entries(theme).map(([themeKey, themeValue]) => ({
        selector: `${THEMES[themeKey as keyof typeof THEMES]} [data-chart="${id}"] .chart-${key}`,
        rule: { [getVarName("color")]: themeValue },
      }))
    }

    return []
  })

  if (!rules.length) {
    return null
  }

  const styles = rules
    .map(
      (rule) =>
        `${rule.selector} { ${Object.entries(rule.rule)
          .map(([key, value]) => `${key}: ${value};`)
          .join(" ")} }`
    )
    .join("\n")

  return <style dangerouslySetInnerHTML={{ __html: styles }} />
}
