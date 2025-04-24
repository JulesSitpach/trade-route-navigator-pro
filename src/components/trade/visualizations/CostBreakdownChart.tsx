
import { Card, CardContent } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartLegend,
  ChartLegendContent, 
  ChartTooltip, 
  ChartTooltipContent
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { chartConfig } from "./chartConfig";
import { chartCommonConfig, chartDimensions } from "@/utils/chartUtils";

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

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Cost Breakdown Analysis</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Visualize the distribution of costs across different components in your supply chain
      </p>
      
      <Card className="border rounded-lg shadow-sm">
        <CardContent className="p-6">
          <div className="h-[400px]">
            <ChartContainer config={chartConfig}>
              <PieChart margin={chartCommonConfig.margins.default}>
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  cursor={false}
                />
                <ChartLegend 
                  content={<ChartLegendContent />}
                  verticalAlign={chartCommonConfig.legend.position.vertical}
                  align={chartCommonConfig.legend.position.align}
                />
                <Pie
                  data={costData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={chartDimensions.pieChart.outerRadius}
                  innerRadius={chartDimensions.pieChart.innerRadius}
                  dataKey="value"
                  nameKey="name"
                >
                  {costData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={chartConfig[entry.name as keyof typeof chartConfig]?.color || "#ccc"} 
                    />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </div>
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
