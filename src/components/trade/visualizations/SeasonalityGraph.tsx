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
import { chartCommonConfig } from "@/utils/chartUtils";

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
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Seasonality Analysis</h3>
        <p className="text-sm text-muted-foreground">
          Track how shipping costs, transit times, and risks fluctuate throughout the year
        </p>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="h-[400px]">
            <ChartContainer config={chartConfig}>
              <LineChart
                data={seasonalityData}
                margin={chartCommonConfig.margins.withXLabels}
              >
                <CartesianGrid 
                  strokeDasharray={chartCommonConfig.grid.strokeDasharray}
                  stroke="#e6e6e6"
                  horizontal={true}
                  vertical={false}
                />
                <ChartLegend 
                  content={<ChartLegendContent />}
                  verticalAlign={chartCommonConfig.legend.position.vertical}
                  align={chartCommonConfig.legend.position.align}
                />
                <XAxis 
                  dataKey="month"
                  tick={chartCommonConfig.axis.tick}
                  tickLine={{ stroke: '#e6e6e6' }}
                  axisLine={{ stroke: '#e6e6e6' }}
                  height={30}
                />
                <YAxis 
                  yAxisId="left"
                  label={{ 
                    value: 'Freight Cost Index', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { textAnchor: 'middle', fill: '#666', fontSize: 12 },
                    offset: 0
                  }}
                  tickLine={{ stroke: '#e6e6e6' }}
                  axisLine={{ stroke: '#e6e6e6' }}
                  tick={{ fontSize: 11, fill: '#666' }}
                  domain={[90, 240]}
                  ticks={[90, 120, 150, 180, 210, 240]}
                  padding={{ top: 0, bottom: 0 }}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  domain={[0, 100]}
                  ticks={[0, 25, 50, 75, 100]}
                  label={{ 
                    value: 'Risk/Congestion (%)', 
                    angle: 90, 
                    position: 'insideRight',
                    style: { textAnchor: 'middle', fill: '#666', fontSize: 12 },
                    offset: 0
                  }}
                  tickLine={{ stroke: '#e6e6e6' }}
                  axisLine={{ stroke: '#e6e6e6' }}
                  tick={{ fontSize: 11, fill: '#666' }}
                  padding={{ top: 0, bottom: 0 }}
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
                  activeDot={{ r: 5 }}
                  connectNulls={true}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="congestion"
                  name="Congestion"
                  stroke={chartConfig.handling.color}
                  strokeWidth={2}
                  dot={{ fill: chartConfig.handling.color, r: 4 }}
                  connectNulls={true}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="risk"
                  name="Risk"
                  stroke={chartConfig.risk.color}
                  strokeWidth={2}
                  dot={{ fill: chartConfig.risk.color, r: 4 }}
                  connectNulls={true}
                />
              </LineChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-50 mt-6">
        <CardContent className="p-4">
          <p className="font-medium mb-2">Key Seasonal Factors:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>Q4 shipping rates peak during holiday season (October-December)</li>
            <li>Chinese New Year (January-February) causes manufacturing delays</li>
            <li>Summer months show increased port congestion</li>
            <li>Consider shipping in Q2 for optimal balance of cost and efficiency</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default SeasonalityGraph;
