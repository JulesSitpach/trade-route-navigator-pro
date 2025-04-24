
import { Card, CardContent } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  AxisTitle
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { chartConfig } from "./chartConfig";
import { chartCommonConfig } from "@/utils/chartUtils";
import { LineChart as LineChartIcon } from "lucide-react";

const SeasonalityGraph = () => {
  // Sample seasonality data
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
          <div className="h-[450px]">
            <ChartContainer config={chartConfig}>
              <LineChart
                data={seasonalityData}
                margin={chartCommonConfig.margins.withXLabels}
              >
                <CartesianGrid 
                  strokeDasharray={chartCommonConfig.grid.strokeDasharray}
                  stroke={chartCommonConfig.grid.stroke}
                  strokeOpacity={chartCommonConfig.grid.strokeOpacity}
                />
                <ChartLegend 
                  content={<ChartLegendContent />}
                  verticalAlign="top"
                  align="center"
                />
                <XAxis 
                  dataKey="month"
                  tick={chartCommonConfig.axis.tick}
                  axisLine={chartCommonConfig.axis.line}
                  tickLine={false}
                  label={AxisTitle({ 
                    text: 'Month', 
                    axis: 'x',
                    offset: { y: 10 }
                  })}
                />
                <YAxis 
                  yAxisId="left"
                  label={AxisTitle({ 
                    text: 'Freight Cost Index', 
                    axis: 'y',
                    position: 'insideLeft',
                    offset: { x: 5 }
                  })}
                  tickLine={false}
                  axisLine={chartCommonConfig.axis.line}
                  tick={chartCommonConfig.axis.tick}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  label={AxisTitle({ 
                    text: 'Risk/Congestion (%)', 
                    axis: 'y',
                    position: 'insideRight', 
                    offset: { x: 5 }
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
                  strokeWidth={2}
                  dot={{ fill: chartConfig.freight.color, r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="congestion"
                  name="Congestion"
                  stroke={chartConfig.handling.color}
                  strokeWidth={2}
                  dot={{ fill: chartConfig.handling.color, r: 4 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="risk"
                  name="Risk"
                  stroke={chartConfig.risk.color}
                  strokeWidth={2}
                  dot={{ fill: chartConfig.risk.color, r: 4 }}
                />
              </LineChart>
            </ChartContainer>
          </div>
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
