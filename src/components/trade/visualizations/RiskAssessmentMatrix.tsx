
import { Card, CardContent } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ZAxis, Cell } from "recharts";
import { chartConfig } from "./chartConfig";
import { chartCommonConfig } from "@/utils/chartUtils";
import { lightTheme } from "@/components/ui/chart/chartTheme";
import { formatCurrency } from "@/components/ui/chart/chartUtils";
import { createAxisTitle } from "@/components/ui/chart/axisConfig";
import { LabelPosition } from "recharts/types/component/Label";

const RiskAssessmentMatrix = () => {
  // Sample risk assessment data
  const riskData = [
    { x: 2450, y: 7, z: 100, name: "Shanghai → Panama → LA → Chicago", riskLevel: "medium", label: "Standard Ocean Route" },
    { x: 5650, y: 2, z: 80, name: "Shanghai → LA → Chicago (Air)", riskLevel: "low", label: "Express Air Route" },
    { x: 2200, y: 7, z: 90, name: "Vietnam → Singapore → LA → Chicago", riskLevel: "high", label: "Alternative Ocean Route" },
    { x: 3100, y: 4, z: 70, name: "China → Mexico → US (USMCA)", riskLevel: "medium", label: "Triangular Trade Route" },
    { x: 2800, y: 3, z: 60, name: "Shanghai → Rotterdam → US East Coast", riskLevel: "low", label: "East Coast Route" }
  ];

  // Function to determine color based on risk level
  const getRiskColor = (riskLevel: string) => {
    switch(riskLevel) {
      case "high": return chartConfig.highRisk.color;
      case "medium": return chartConfig.mediumRisk.color;
      case "low": return chartConfig.lowRisk.color;
      default: return "#ccc";
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Risk Assessment Matrix</h3>
        <p className="text-sm text-muted-foreground">
          Compare routes based on cost vs. risk factors to find your optimal balance
        </p>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="h-[450px]">
            <ChartContainer config={chartConfig}>
              <ScatterChart margin={{ top: 20, right: 30, bottom: 60, left: 50 }}>
                <CartesianGrid 
                  strokeDasharray={chartCommonConfig.grid.strokeDasharray} 
                  stroke={chartCommonConfig.grid.stroke}
                  opacity={0.15}
                />
                <ChartLegend 
                  content={<ChartLegendContent />}
                  verticalAlign="top"
                  align="center"
                />
                <XAxis 
                  type="number"
                  dataKey="x"
                  name="Cost"
                  domain={[2000, 6000]}
                  tickCount={5}
                  tickFormatter={(value) => formatCurrency(value)}
                  tick={{
                    fontSize: 12,
                    fill: lightTheme.colors.text,
                  }}
                  axisLine={chartCommonConfig.axis.line}
                  tickLine={false}
                  label={createAxisTitle('Total Route Cost', 'x', { offset: 40 })}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name="Risk Score"
                  domain={[0, 10]}
                  tickCount={6}
                  tick={{
                    fontSize: 12,
                    fill: lightTheme.colors.text,
                  }}
                  axisLine={chartCommonConfig.axis.line}
                  tickLine={false}
                  label={createAxisTitle('Risk Level (0-10)', 'y', { offset: 35 })}
                />
                <ZAxis
                  type="number"
                  dataKey="z"
                  range={[60, 200]}
                  name="Reliability"
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Scatter 
                  data={riskData}
                  fill={lightTheme.colors.primary}
                >
                  {riskData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={getRiskColor(entry.riskLevel)}
                      stroke={getRiskColor(entry.riskLevel)}
                      strokeWidth={2}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center gap-8 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: chartConfig.lowRisk.color }}></div>
          <span className="text-sm text-muted-foreground">Low Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: chartConfig.mediumRisk.color }}></div>
          <span className="text-sm text-muted-foreground">Medium Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: chartConfig.highRisk.color }}></div>
          <span className="text-sm text-muted-foreground">High Risk</span>
        </div>
      </div>

      <div className="text-sm mt-6">
        <p className="font-medium mb-2">Risk Assessment Insights:</p>
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
          <li>Air freight offers the lowest risk profile but at significant cost premium</li>
          <li>East Coast route provides a balanced risk-cost profile</li>
          <li>Alternative ocean routes may save costs but introduce higher risks</li>
          <li>Bubble size indicates reliability score (larger = more reliable)</li>
        </ul>
      </div>
    </div>
  );
};

export default RiskAssessmentMatrix;
