
import { Card, CardContent } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ZAxis, Cell } from "recharts";
import { chartConfig } from "./chartConfig";

const RiskAssessmentMatrix = () => {
  // Sample risk assessment data
  const riskData = [
    { x: 2450, y: 5, z: 100, name: "Shanghai → Panama → LA → Chicago", riskLevel: "medium", label: "Standard Ocean Route" },
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
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Risk Assessment Matrix</h3>
      <p className="text-sm text-muted-foreground">
        Compare routes based on cost vs. risk factors to find your optimal balance
      </p>
      
      <Card>
        <CardContent className="p-6">
          <div className="h-96">
            <ChartContainer config={chartConfig}>
              <ScatterChart
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 30,
                  left: 20,
                }}
              >
                <CartesianGrid />
                <XAxis 
                  type="number"
                  dataKey="x"
                  name="Cost ($)"
                  label={{ value: 'Cost ($)', position: 'bottom', offset: 0 }}
                  domain={['dataMin - 500', 'dataMax + 500']}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name="Risk Score"
                  label={{ value: 'Risk Score (1-10)', angle: -90, position: 'insideLeft' }}
                  domain={[0, 10]}
                />
                <ZAxis
                  type="number"
                  dataKey="z"
                  range={[60, 400]}
                  name="Reliability"
                />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  cursor={{ strokeDasharray: '3 3' }}
                />
                <Scatter name="Risk Matrix" data={riskData}>
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

      <div className="flex items-center justify-center gap-8 mt-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-500"></div>
          <span className="text-sm">High Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-amber-500"></div>
          <span className="text-sm">Medium Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
          <span className="text-sm">Low Risk</span>
        </div>
      </div>

      <div className="text-sm">
        <p className="font-medium">Risk Assessment Insights:</p>
        <ul className="list-disc pl-5 pt-2 space-y-1">
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
