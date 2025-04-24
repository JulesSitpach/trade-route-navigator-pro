
import { Card, CardContent } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartLegend,
  ChartLegendContent, 
  ChartTooltip, 
  ChartTooltipContent
} from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";
import { chartConfig } from "./chartConfig";
import { Donut } from "lucide-react";

const CostBreakdownChart = () => {
  // Sample cost breakdown data
  const costData = [
    { name: "freight", value: 1200, label: "Freight" },
    { name: "customs", value: 650, label: "Customs & Duties" },
    { name: "handling", value: 450, label: "Handling" },
    { name: "insurance", value: 320, label: "Insurance" },
    { name: "documentation", value: 180, label: "Documentation" },
    { name: "compliance", value: 250, label: "Compliance" },
    { name: "lastMile", value: 380, label: "Last Mile" }
  ];

  // Calculate total for percentages
  const totalCost = costData.reduce((sum, item) => sum + item.value, 0);
  
  // Add percentage to the data
  const costDataWithPercentage = costData.map(item => ({
    ...item,
    percentage: ((item.value / totalCost) * 100).toFixed(1)
  }));

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
          <ChartContainer 
            config={chartConfig} 
            aspectRatio={16/9} 
            minHeight={400}
            className="w-full"
          >
            <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <ChartLegend 
                content={<ChartLegendContent />}
                verticalAlign="top"
                align="center"
                layout="horizontal"
                wrapperStyle={{ paddingBottom: "20px" }}
              />
              <ChartTooltip 
                content={({ payload }) => {
                  if (payload && payload[0]) {
                    const data = payload[0].payload;
                    return (
                      <ChartTooltipContent>
                        <div className="flex flex-col gap-2">
                          <span>{data.label}</span>
                          <span>${data.value.toLocaleString()}</span>
                          <span>{data.percentage}% of total</span>
                        </div>
                      </ChartTooltipContent>
                    );
                  }
                  return null;
                }}
              />
              <Pie
                data={costDataWithPercentage}
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
              >
                {costDataWithPercentage.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={chartConfig[entry.name]?.color}
                    stroke={chartConfig[entry.name]?.color}
                    strokeWidth={1}
                  />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="text-sm mt-6">
        <p className="font-medium mb-2">Key Insights:</p>
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
          <li>Freight costs represent the largest portion of your total shipping expenses (35%)</li>
          <li>Consider insurance optimization to reduce premiums while maintaining coverage</li>
          <li>Documentation costs can be reduced by leveraging electronic filing systems</li>
        </ul>
      </div>
    </div>
  );
};

export default CostBreakdownChart;
