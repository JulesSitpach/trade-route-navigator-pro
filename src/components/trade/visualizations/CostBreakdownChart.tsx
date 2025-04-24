
import { Card, CardContent } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartLegend,
  ChartLegendContent, 
  ChartTooltip, 
  ChartTooltipContent
} from "@/components/ui/chart";
import { PieChart, Pie } from "recharts";
import { chartConfig } from "./chartConfig";
import { Donut } from "lucide-react";

const CostBreakdownChart = () => {
  // Removed hardcoded cost data
  const costData: any[] = [];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Donut className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-medium">Cost Breakdown Analysis</h3>
      </div>
      <p className="text-sm text-muted-foreground">
        Visualize the distribution of costs across different components in your supply chain
      </p>
      
      <Card>
        <CardContent className="p-6">
          {costData.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              No cost breakdown data available
            </div>
          ) : (
            <ChartContainer 
              config={chartConfig} 
              height={400}
              className="w-full"
              title="Cost Distribution"
            >
              <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <ChartLegend 
                  content={<ChartLegendContent />}
                  verticalAlign="top"
                  align="center"
                  layout="horizontal"
                  wrapperStyle={{ paddingBottom: "20px" }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie
                  data={costData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={140}
                  innerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                  cornerRadius={4}
                  isAnimationActive={true}
                  animationBegin={0}
                  animationDuration={800}
                />
              </PieChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CostBreakdownChart;
