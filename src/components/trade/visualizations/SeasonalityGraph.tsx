
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
    <div className="space-y-2">
      <h3 className="text-lg font-medium">Seasonality Analysis</h3>
      <p className="text-sm text-muted-foreground mb-0">
        Track how shipping costs, transit times, and risks fluctuate throughout the year
      </p>
      
      <div className="relative chart-container" style={{ paddingBottom: '40px', overflow: 'visible', marginBottom: '60px' }}>
        <div className="seasonality-chart" style={{ height: '400px', minHeight: '350px', marginBottom: '30px' }}>
          <ChartContainer config={chartConfig}>
            <LineChart
              data={seasonalityData}
              margin={{
                top: 20,
                right: 40,
                left: 10,
                bottom: 80,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month"
                tick={{ fontSize: 12 }}
                tickLine={true}
                axisLine={true}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis 
                yAxisId="left"
                label={{ 
                  value: 'Freight Cost Index', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle' },
                  offset: 0
                }}
                tickLine={true}
                axisLine={true}
                domain={[60, 250]}
                ticks={[60, 90, 120, 150, 180, 210, 240]}
                padding={{ top: 20, bottom: 20 }}
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
                  style: { textAnchor: 'middle' },
                  offset: 0
                }}
                tickLine={true}
                axisLine={true}
                padding={{ top: 20, bottom: 20 }}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
              />
              <ChartLegend 
                content={<ChartLegendContent />}
                verticalAlign="top"
                height={36}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="freight"
                name="Freight"
                stroke={chartConfig.freight.color}
                strokeWidth={2}
                dot={{ fill: chartConfig.freight.color, r: 4 }}
                activeDot={{ r: 6 }}
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

        <div className="text-sm footer-container" style={{ position: 'relative', zIndex: 1, marginTop: '10px' }}>
          <p className="font-medium">Key Seasonal Factors:</p>
          <ul className="list-disc pl-5 pt-1 space-y-1">
            <li>Q4 shipping rates peak during holiday season (October-December)</li>
            <li>Chinese New Year (January-February) causes manufacturing delays</li>
            <li>Summer months show increased port congestion</li>
            <li>Consider shipping in Q2 for optimal balance of cost and efficiency</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SeasonalityGraph;
