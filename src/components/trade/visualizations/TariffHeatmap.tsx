
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";
import { chartConfig } from "./chartConfig";

const TariffHeatmap = () => {
  // Sample tariff data
  const tariffData = [
    { country: "USA", tariffRate: 25, productCategory: "Electronics", volume: 120 },
    { country: "EU", tariffRate: 5, productCategory: "Electronics", volume: 90 },
    { country: "Canada", tariffRate: 0, productCategory: "Electronics", volume: 70 },
    { country: "Mexico", tariffRate: 0, productCategory: "Electronics", volume: 50 },
    { country: "Japan", tariffRate: 8, productCategory: "Electronics", volume: 60 },
    { country: "Vietnam", tariffRate: 10, productCategory: "Electronics", volume: 40 },
    { country: "China", tariffRate: 15, productCategory: "Electronics", volume: 150 },
    { country: "India", tariffRate: 20, productCategory: "Electronics", volume: 70 },
    { country: "Brazil", tariffRate: 35, productCategory: "Electronics", volume: 30 },
    { country: "Australia", tariffRate: 5, productCategory: "Electronics", volume: 25 }
  ];

  // Helper function to determine color based on tariff rate
  const getTariffColor = (rate: number) => {
    if (rate <= 5) return "#22C55E"; // Green for low tariffs
    if (rate <= 15) return "#F59E0B"; // Amber for medium tariffs
    return "#EF4444"; // Red for high tariffs
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Tariff Heatmap Analysis</h3>
      <p className="text-sm text-muted-foreground">
        Visualize tariff rates across different countries and identify opportunities for tariff optimization
      </p>
      
      <Card>
        <CardContent className="p-6">
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid />
                <XAxis 
                  type="category" 
                  dataKey="country" 
                  name="Country" 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  type="number"
                  dataKey="tariffRate"
                  name="Tariff Rate (%)"
                  label={{ 
                    value: 'Tariff Rate (%)', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { textAnchor: 'middle' }
                  }}
                />
                <Tooltip 
                  formatter={(value, name, props) => {
                    if (name === "tariffRate") return [`${value}%`, "Tariff Rate"];
                    if (name === "volume") return [`$${value}k`, "Trade Volume"];
                    return [value, name];
                  }}
                  labelFormatter={(value) => `Country: ${value}`}
                  cursor={{ strokeDasharray: '3 3' }}
                />
                <Scatter name="Tariff Rates" data={tariffData} fill="#8884d8">
                  {tariffData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={getTariffColor(entry.tariffRate)} 
                      radius={Math.sqrt(entry.volume) / 2} // Size based on volume
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center gap-8 mt-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
          <span className="text-sm">Low Tariff (0-5%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-amber-500"></div>
          <span className="text-sm">Medium Tariff (6-15%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-500"></div>
          <span className="text-sm">High Tariff (>15%)</span>
        </div>
      </div>

      <div className="text-sm">
        <p className="font-medium">Key Insights:</p>
        <ul className="list-disc pl-5 pt-2 space-y-1">
          <li>USMCA countries (Mexico, Canada) offer 0% tariffs for many product categories</li>
          <li>Consider Vietnam as alternative manufacturing location to reduce tariff burden</li>
          <li>Brazil has high tariffs but can be mitigated through regional trade agreements</li>
        </ul>
      </div>
    </div>
  );
};

export default TariffHeatmap;
