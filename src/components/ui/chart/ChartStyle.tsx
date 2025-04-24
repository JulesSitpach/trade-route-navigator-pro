
import * as React from "react"
import { ChartConfig, THEMES } from "./types"
import { useChart } from "./ChartContext"

export const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const { theme } = useChart()
  const colorConfig = Object.entries(config).filter(
    ([_, config]) => config.theme || config.color
  )

  const generateThemeStyles = (themeName: keyof typeof THEMES) => {
    return colorConfig
      .map(([key, itemConfig]) => {
        const color =
          itemConfig.theme?.[themeName] ||
          itemConfig.color ||
          theme.colors.primary[0]
        return color ? `  --color-${key}: ${color};` : null
      })
      .filter(Boolean)
      .join("\n")
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([themeName, prefix]) => `
${prefix} [data-chart=${id}] {
${generateThemeStyles(themeName as keyof typeof THEMES)}
}
`
          )
          .join("\n"),
      }}
    />
  )
}
