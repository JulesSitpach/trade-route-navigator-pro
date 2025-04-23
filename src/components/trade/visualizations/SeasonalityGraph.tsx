
import { Card, CardContent } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { chartConfig } from "./chartConfig";

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
      <h3 className="text-lg font-medium">Seasonality Analysis</h3>
      <p className="text-sm text-muted-foreground">
        Track how shipping costs, transit times, and risks fluctuate throughout the year
      </p>
      
      <Card>
        <CardContent className="p-6">
          <div className="h-96">
            <ChartContainer config={chartConfig}>
              <LineChart
                data={seasonalityData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  yAxisId="left"
                  label={{ 
                    value: 'Freight Cost Index', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { textAnchor: 'middle' }
                  }}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  domain={[0, 100]}
                  label={{ 
                    value: 'Risk/Congestion (%)', 
                    angle: 90, 
                    position: 'insideRight',
                    style: { textAnchor: 'middle' }
                  }}
                />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                />
                <ChartLegend 
                  content={<ChartLegendContent />}
                  verticalAlign="top"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="freight"
                  name="freight"
                  stroke={chartConfig.freight.color}
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="congestion"
                  name="handling"
                  stroke={chartConfig.handling.color}
                  strokeWidth={2}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="risk"
                  name="risk"
                  stroke={chartConfig.risk.color}
                  strokeWidth={2}
                />
              </LineChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <div className="text-sm">
        <p className="font-medium">Key Seasonal Factors:</p>
        <ul className="list-disc pl-5 pt-2 space-y-1">
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
