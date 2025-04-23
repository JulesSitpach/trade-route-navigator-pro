
import { Card, CardContent } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ZAxis, Cell, ResponsiveContainer } from "recharts";
import { chartConfig } from "./chartConfig";

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
      <p className="text-sm text-muted-foreground">
        Compare routes based on cost vs. risk factors to find your optimal balance
      </p>
      
      <Card>
        <CardContent className="p-6">
          <div className="h-[400px] w-full">
            <ChartContainer config={chartConfig}>
              <ScatterChart
                margin={{
                  top: 20,
                  right: 40,
                  left: 20,
                  bottom: 40, // Increased bottom margin to accommodate X axis labels
                }}
              >
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                <XAxis 
                  type="number"
                  dataKey="x"
                  name="Cost ($)"
                  domain={[2000, 6000]}
                  tickCount={5}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, dy: 10 }} // Added dy to push labels down
                  label={{ 
                    value: 'Cost ($)', 
                    position: 'bottom',
                    offset: 20, // Increased offset to position label further below
                    style: { 
                      textAnchor: 'middle',
                      fontSize: 12,
                      fill: '#64748b'
                    }
                  }}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name="Risk Score"
                  domain={[0, 10]}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                  label={{ 
                    value: 'Risk Score (1-10)', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { 
                      textAnchor: 'middle',
                      fontSize: 12,
                      fill: '#64748b'
                    },
                    offset: 10
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
                  content={
                    <ChartTooltipContent 
                      className="bg-[#f3f3f3] border border-border/50 shadow-md" 
                    />
                  }
                />
                <Scatter 
                  data={riskData}
                  shape="circle"
                >
                  {riskData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={getRiskColor(entry.riskLevel)}
                      r={6}
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
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ea384c" }}></div>
          <span className="text-sm">High Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#f97316" }}></div>
          <span className="text-sm">Medium Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#22c55e" }}></div>
          <span className="text-sm">Low Risk</span>
        </div>
      </div>

      <div className="text-sm mt-4">
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
