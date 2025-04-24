
import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { cn } from "@/lib/utils"
import { ChartContext } from "./ChartContext"
import { ChartStyle } from "./ChartStyle"
import { ChartConfig } from "./types"
import { chartTheme } from "./chartTheme"

interface ChartContainerProps extends React.ComponentProps<"div"> {
  config: ChartConfig;
  children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
  aspectRatio?: string | number;
  minHeight?: number;
  maxHeight?: number;
}

export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  ChartContainerProps
>(({ 
  id, 
  className, 
  children, 
  config, 
  aspectRatio = "16/9", 
  minHeight = 300,
  maxHeight = 600,
  ...props 
}, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`
  const [theme, setTheme] = React.useState(chartTheme)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 })
  
  React.useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])
  
  const updateTheme = (newTheme: Partial<typeof chartTheme>) => {
    setTheme({
      ...theme,
      ...newTheme,
    })
  }

  const aspectRatioStyle = typeof aspectRatio === 'number' 
    ? aspectRatio 
    : aspectRatio.split('/').reduce((a, b) => parseFloat(a) / parseFloat(b), 0);

  return (
    <ChartContext.Provider value={{ theme, updateTheme, config }}>
      <div
        ref={ref}
        data-chart={chartId}
        className={cn(
          "relative flex justify-center",
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
        <div 
          ref={containerRef}
          className="chart-wrapper w-full h-full overflow-visible"
          style={{ 
            minHeight: `${minHeight}px`,
            maxHeight: `${maxHeight}px`,
            aspectRatio: String(aspectRatioStyle)
          }}
        >
          <RechartsPrimitive.ResponsiveContainer
            width="100%"
            height="100%"
            debounce={50}
          >
            {children}
          </RechartsPrimitive.ResponsiveContainer>
        </div>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "ChartContainer"
