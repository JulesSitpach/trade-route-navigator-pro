
import { Card, CardContent } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { chartConfig } from "./chartConfig";
import { chartCommonConfig } from "@/utils/chartUtils";
import { BarChart as BarChartIcon } from "lucide-react";

const RouteComparisonTimeline = () => {
  // Sample route comparison data
  const routeData = [
    {
      name: "Shanghai → Panama → LA → Chicago",
      shipping: 18,
      customs: 3,
      distribution: 3,
      label: "Primary Route"
    },
    {
      name: "Shanghai → LA → Chicago (Air)",
      shipping: 2,
      customs: 0.5,
      distribution: 0.5,
      label: "Express Air Route"
    },
    {
      name: "Vietnam → Singapore → LA → Chicago",
      shipping: 22,
      customs: 2,
      distribution: 3,
      label: "Alternative Route"
    },
    {
      name: "China → Mexico → US (USMCA)",
      shipping: 14,
      customs: 5, // Processing time in Mexico
      distribution: 2,
      label: "Triangular Trade Route"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <BarChartIcon className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-medium">Route Comparison Timeline</h3>
      </div>
      <p className="text-sm text-muted-foreground">
        Compare transit times across different shipping routes and methods
      </p>
      
      <Card>
        <CardContent className="p-6">
          <div className="h-[450px]">
            <ChartContainer config={chartConfig}>
              <BarChart
                data={routeData}
                margin={chartCommonConfig.margins.withXLabels}
                barSize={32}
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
                  dataKey="name"
                  tick={chartCommonConfig.axis.tick}
                  axisLine={chartCommonConfig.axis.line}
                  tickLine={false}
                  height={80}
                  angle={-35}
                  textAnchor="end"
                />
                <YAxis 
                  label={{ 
                    value: 'Days', 
                    angle: -90, 
                    position: 'insideLeft',
                    ...chartCommonConfig.axis.label
                  }}
                  tickLine={false}
                  axisLine={chartCommonConfig.axis.line}
                  tick={chartCommonConfig.axis.tick}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="shipping" 
                  stackId="a" 
                  name="Shipping" 
                  fill={chartConfig.primaryRoute.color}
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="customs" 
                  stackId="a" 
                  name="Customs" 
                  fill={chartConfig.customs.color}
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="distribution" 
                  stackId="a" 
                  name="Distribution" 
                  fill={chartConfig.lastMile.color}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <div className="text-sm mt-6">
        <p className="font-medium mb-2">Key Insights:</p>
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
          <li>Air shipping reduces transit time by 85% but increases costs by 130%</li>
          <li>Panama Canal route offers the best balance of cost and speed</li>
          <li>USMCA triangular trade route requires additional processing time but reduces tariffs</li>
        </ul>
      </div>
    </div>
  );
};

export default RouteComparisonTimeline;
