
import { Card, CardContent } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { chartConfig } from "./chartConfig";

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
      <h3 className="text-lg font-medium">Route Comparison Timeline</h3>
      <p className="text-sm text-muted-foreground">
        Compare transit times across different shipping routes and methods
      </p>
      
      <Card>
        <CardContent className="pt-4">
          {/* Adjusted height */}
          <div className="h-[400px]">
            <ChartContainer config={chartConfig}>
              <BarChart
                data={routeData}
                /* Adjusted margins */
                margin={{ top: 10, right: 30, left: 40, bottom: 60 }}
                /* Increased bar size */
                barSize={30}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  /* Increased height for labels */
                  height={60}
                  /* Angled text for better readability */
                  angle={-25}
                  textAnchor="end"
                />
                <YAxis 
                  label={{ 
                    value: 'Days', 
                    angle: -90, 
                    position: 'insideLeft',
                    offset: -15
                  }}
                  tickLine={false}
                />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                />
                <ChartLegend 
                  content={<ChartLegendContent />}
                  verticalAlign="top"
                  height={36}
                />
                <Bar dataKey="shipping" stackId="a" name="Shipping" fill={chartConfig.primaryRoute.color} />
                <Bar dataKey="customs" stackId="a" name="Customs" fill={chartConfig.customs.color} />
                <Bar dataKey="distribution" stackId="a" name="Distribution" fill={chartConfig.lastMile.color} />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <div className="text-sm mt-4">
        <p className="font-medium">Key Insights:</p>
        <ul className="list-disc pl-5 pt-2 space-y-1">
          <li>Air shipping reduces transit time by 85% but increases costs by 130%</li>
          <li>Panama Canal route offers the best balance of cost and speed</li>
          <li>USMCA triangular trade route requires additional processing time but reduces tariffs</li>
        </ul>
      </div>
    </div>
  );
};

export default RouteComparisonTimeline;
