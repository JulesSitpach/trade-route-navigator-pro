
import { Card, CardContent } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ZAxis, Cell, ResponsiveContainer } from "recharts";
import { chartConfig } from "./chartConfig";
import { chartCommonConfig, chartDimensions } from "@/utils/chartUtils";

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
      case "high": return "#ea384c";
      case "medium": return "#f97316";
      case "low": return "#22c55e";
      default: return "#ccc";
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Risk Assessment Matrix</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Compare routes based on cost vs. risk factors to find your optimal balance
      </p>
      
      <Card>
        <CardContent className="p-4">
          <div style={{ height: chartDimensions.height.default }} className="flex justify-center">
            <ChartContainer config={chartConfig}>
              <ScatterChart margin={chartCommonConfig.margins.withXLabels}>
                <CartesianGrid 
                  strokeDasharray={chartCommonConfig.grid.strokeDasharray} 
                  stroke={chartCommonConfig.grid.stroke}
                  strokeOpacity={chartCommonConfig.grid.strokeOpacity}
                />
                <XAxis 
                  type="number"
                  dataKey="x"
                  name="Cost ($)"
                  domain={[2000, 6000]}
                  tickCount={5}
                  tick={chartCommonConfig.axis.tick}
                  axisLine={chartCommonConfig.axis.line}
                  tickLine={false}
                  label={{ 
                    value: 'Cost ($)', 
                    position: 'bottom',
                    ...chartCommonConfig.axis.label
                  }}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name="Risk Score"
                  domain={[0, 10]}
                  tick={chartCommonConfig.axis.tick}
                  axisLine={chartCommonConfig.axis.line}
                  tickLine={false}
                  label={{ 
                    value: 'Risk Score (1-10)', 
                    angle: -90, 
                    position: 'insideLeft',
                    ...chartCommonConfig.axis.label
                  }}
                />
                <ZAxis
                  type="number"
                  dataKey="z"
                  range={[60, 200]}
                  name="Reliability"
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Scatter 
                  data={riskData}
                  shape="circle"
                >
                  {riskData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={getRiskColor(entry.riskLevel)}
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
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#22c55e" }}></div>
          <span className="text-sm text-muted-foreground">Low Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#f97316" }}></div>
          <span className="text-sm text-muted-foreground">Medium Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ea384c" }}></div>
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
