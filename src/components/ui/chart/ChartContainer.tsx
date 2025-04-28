
import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { cn } from "@/lib/utils"
import { ChartContext } from "./ChartContext"
import { ChartStyle } from "./ChartStyle"
import { ChartConfig, ExtendedChartConfig } from "./types"
import { chartTheme } from "./chartTheme"
import { fontStyles } from "@/utils/fontStyles"
import { defaultChartConfig } from "./config"

interface ChartContainerProps extends React.ComponentProps<"div"> {
  config?: ChartConfig | ExtendedChartConfig;
  children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
  aspectRatio?: string | number;
  minHeight?: number;
  maxHeight?: number;
  title?: string;
  subtitle?: string;
  height?: string | number;
  width?: string | number;
  legendPosition?: 'top' | 'bottom' | 'right';
}

export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  ChartContainerProps
>(({ 
  id, 
  className, 
  children, 
  config = defaultChartConfig, 
  aspectRatio = "16/9", 
  minHeight = 300,
  maxHeight = 600,
  title,
  subtitle,
  height,
  width = "100%",
  legendPosition = 'top',
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
    ? String(aspectRatio) 
    : aspectRatio;
    
  const heightStyle = height 
    ? (typeof height === 'number' ? `${height}px` : height) 
    : undefined;
  
  const widthStyle = typeof width === 'number' ? `${width}px` : width;

  return (
    <ChartContext.Provider value={{ theme, updateTheme, config }}>
      <div
        ref={ref}
        data-chart={chartId}
        data-legend-position={legendPosition}
        className={cn(
          "relative flex flex-col",
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
          "[&_.recharts-legend-item]:mb-2",
          "[&_[data-legend-position=right]_.recharts-legend-wrapper]:right-0",
          "[&_[data-legend-position=bottom]_.recharts-legend-wrapper]:bottom-0",
          className
        )}
        style={{
          '--chart-font-family': fontStyles.family,
          '--chart-text-size': fontStyles.sizes.axisLabel,
          width: widthStyle,
        } as React.CSSProperties}
        {...props}
      >
        {title && (
          <h3 
            className="text-lg font-medium mb-2"
            style={{ fontSize: fontStyles.sizes.chartTitle }}
          >
            {title}
          </h3>
        )}
        {subtitle && (
          <p 
            className="text-sm text-muted-foreground mb-4"
            style={{ fontSize: fontStyles.sizes.tooltipBody }}
          >
            {subtitle}
          </p>
        )}
        <ChartStyle id={chartId} config={config} />
        <div 
          ref={containerRef}
          className="chart-wrapper w-full h-full overflow-visible"
          style={{ 
            minHeight: `${minHeight}px`,
            maxHeight: maxHeight ? `${maxHeight}px` : undefined,
            aspectRatio: heightStyle ? undefined : aspectRatioStyle,
            height: heightStyle,
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
