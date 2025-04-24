
import { Card, CardContent } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  createAxisTitle
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { chartConfig } from "./chartConfig";
import { chartCommonConfig } from "@/utils/chartUtils";
import { LineChart as LineChartIcon } from "lucide-react";
import { useChartResponsive } from "@/hooks/use-chart-responsive";
import { useChartResponsiveStyles } from "@/hooks/use-chart-responsive-styles";

const SeasonalityGraph = () => {
  const { margins, tickCount, legendPosition } = useChartResponsive();
  const styles = useChartResponsiveStyles();
  
  const seasonalityData = [
    { month: "Jan", freight: 100, congestion: 40, risk: 30 },
    { month: "Feb", freight: 105, congestion: 45, risk: 35 },
    { month: "Mar", freight: 110, congestion: 50, risk: 30 },
    { month: "Apr", freight: 120, congestion: 55, risk: 25 },
    { month: "May", freight: 130, congestion: 60, risk: 20 },
    { month: "Jun", freight: 125, congestion: 65, risk: 15 },
    { month: "Jul", freight: 140, congestion: 75, risk: 20 },
    { month: "Aug", freight: 155, congestion: 80, risk: 25 },
    { month: "Sep", freight: 165, congestion: 70, risk: 30 },
    { month: "Oct", freight: 180, congestion: 65, risk: 35 },
    { month: "Nov", freight: 200, congestion: 60, risk: 40 },
    { month: "Dec", freight: 190, congestion: 50, risk: 45 }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <LineChartIcon className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-medium">Seasonality Analysis</h3>
      </div>
      <p className="text-sm text-muted-foreground">
        Track how shipping costs, transit times, and risks fluctuate throughout the year
      </p>
      
      <Card>
        <CardContent className="p-6">
          <ChartContainer 
            config={chartConfig}
            height={400}
            className="w-full"
            title="Annual Shipping Trends"
          >
            <LineChart
              data={seasonalityData}
              margin={margins}
            >
              <CartesianGrid 
                strokeDasharray={chartCommonConfig.grid.strokeDasharray}
                stroke={chartCommonConfig.grid.stroke}
                strokeOpacity={styles.gridOpacity}
              />
              <ChartLegend 
                content={<ChartLegendContent />}
                verticalAlign={legendPosition}
                align="center"
                wrapperStyle={{ 
                  paddingTop: legendPosition === "bottom" ? "10px" : "0" 
                }}
              />
              <XAxis 
                dataKey="month"
                tick={chartCommonConfig.axis.tick}
                axisLine={chartCommonConfig.axis.line}
                tickLine={false}
                label={createAxisTitle('Month', 'x', { offset: 10 })}
                tickCount={tickCount}
              />
              <YAxis 
                yAxisId="left"
                label={createAxisTitle('Freight Cost Index', 'y', { offset: 5 })}
                tickLine={false}
                axisLine={chartCommonConfig.axis.line}
                tick={chartCommonConfig.axis.tick}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                label={createAxisTitle('Risk/Congestion (%)', 'y', { 
                  position: 'insideRight',
                  offset: 5 
                })}
                tickLine={false}
                axisLine={chartCommonConfig.axis.line}
                tick={chartCommonConfig.axis.tick}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="freight"
                name="Freight"
                stroke={chartConfig.freight.color}
                strokeWidth={styles.strokeWidth}
                dot={{ fill: chartConfig.freight.color, r: styles.dot.radius }}
                activeDot={{ r: styles.dot.activeRadius }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="congestion"
                name="Congestion"
                stroke={chartConfig.handling.color}
                strokeWidth={styles.strokeWidth}
                dot={{ fill: chartConfig.handling.color, r: styles.dot.radius }}
                activeDot={{ r: styles.dot.activeRadius }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="risk"
                name="Risk"
                stroke={chartConfig.risk.color}
                strokeWidth={styles.strokeWidth}
                dot={{ fill: chartConfig.risk.color, r: styles.dot.radius }}
                activeDot={{ r: styles.dot.activeRadius }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="text-sm mt-6">
        <p className="font-medium mb-2">Key Seasonal Factors:</p>
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
          <li>Q4 shipping rates peak during holiday season (October-December)</li>
          <li>Chinese New Year (January-February) causes manufacturing delays</li>
          <li>Summer months show increased port congestion</li>
          <li>Consider shipping in Q2 for optimal balance of cost and efficiency</li>
        </ul>
      </div>
    </div>
  );
};

export default SeasonalityGraph;
