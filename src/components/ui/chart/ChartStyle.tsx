
import * as React from "react"
import { ChartConfig, ExtendedChartConfig, THEMES } from "./types"

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

  const rules = Object.entries(config).flatMap(([key, value]) => {
    // If it's from the expanded config (with colors, typography, etc.)
    if (key === 'colors' || key === 'typography' || key === 'spacing' || 
        key === 'animation' || key === 'formatters') {
      return []
    }

    // If it's a traditional ChartConfig entry
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
