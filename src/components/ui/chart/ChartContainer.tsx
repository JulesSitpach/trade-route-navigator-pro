
import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { cn } from "@/lib/utils"
import { ChartContext } from "./ChartContext"
import { ChartStyle } from "./ChartStyle"
import { ChartConfig } from "./types"
import { chartTheme } from "./chartTheme"

export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"]
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`
  const [theme, setTheme] = React.useState(chartTheme)
  
  const updateTheme = (newTheme: Partial<typeof chartTheme>) => {
    setTheme({
      ...theme,
      ...newTheme,
    })
  }

  return (
    <ChartContext.Provider value={{ theme, updateTheme, config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "relative flex aspect-video justify-center",
          "text-[length:var(--chart-text-size,0.75rem)]",
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground",
          "[&_.recharts-cartesian-grid_line]:stroke-border/50",
          "[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border",
          "[&_.recharts-dot]:stroke-background",
          "[&_.recharts-layer]:outline-none",
          "[&_.recharts-polar-grid]:stroke-border",
          "[&_.recharts-radar-grid]:stroke-border",
          "[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted/50",
          "[&_.recharts-reference-line]:stroke-border",
          "[&_.recharts-sector]:outline-none",
          "[&_.recharts-surface]:outline-none",
          className
        )}
        style={{
          '--chart-font-family': theme.typography.fontFamily,
          '--chart-text-size': theme.typography.sizes.axis,
        } as React.CSSProperties}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "ChartContainer"
