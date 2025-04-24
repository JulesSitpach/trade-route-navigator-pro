
import { Card, CardContent } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  createAxisTitle,
  getChartMargins
} from "@/components/ui/chart";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Cell, ResponsiveContainer } from "recharts";
import { chartConfig } from "./chartConfig";
import { chartCommonConfig } from "@/utils/chartUtils";
import { useTariffData } from "./tariff/useTariffData";
import TariffLegend from "./tariff/TariffLegend";
import TariffInsights from "./tariff/TariffInsights";

const TariffHeatmap = () => {
  const { tariffData, getTariffColor } = useTariffData();
  
  // Enhanced margins to ensure X-axis labels are visible
  const margins = {
    top: 20,
    right: 30,
    bottom: 120, // Increased bottom margin for rotated country names
    left: 60     // Increased left margin for Y-axis labels
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Tariff Heatmap Analysis</h3>
        <p className="text-sm text-muted-foreground">
          Visualize tariff rates across different countries and identify opportunities for tariff optimization
        </p>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="h-[500px]"> {/* Increased height for better visualization */}
            <ChartContainer 
              config={chartConfig} 
              height={500}
              title="Country Tariff Comparison"
              subtitle="Bubble size represents trade volume - larger bubbles indicate higher volume"
            >
              <ScatterChart margin={margins}>
                <CartesianGrid 
                  strokeDasharray={chartCommonConfig.grid.strokeDasharray}
                  stroke={chartCommonConfig.grid.stroke}
                  opacity={0.2}
                />
                <ChartLegend 
                  content={<ChartLegendContent />}
                  verticalAlign="top"
                  align="center"
                  layout="horizontal"
                  wrapperStyle={{ paddingBottom: "20px" }}
                />
                <XAxis 
                  type="category"
                  dataKey="country"
                  name="Country"
                  tick={{
                    fontSize: 12,
                    angle: -45,
                    textAnchor: 'end',
                    dy: 10
                  }}
                  axisLine={chartCommonConfig.axis.line}
                  tickLine={false}
                  height={100}
                  interval={0} // Show all country names
                  label={createAxisTitle('Countries', 'x', { offset: 70, position: 'insideBottom' })}
                />
                <YAxis
                  type="number"
                  dataKey="tariffRate"
                  name="Tariff Rate"
                  tick={{
                    fontSize: 12,
                  }}
                  axisLine={chartCommonConfig.axis.line}
                  tickLine={false}
                  domain={[0, 'dataMax + 2']} // Add some padding at the top
                  label={createAxisTitle('Tariff Rate (%)', 'y', { offset: 45, position: 'insideLeft' })}
                  tickFormatter={(value) => `${value}%`}
                />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  cursor={{ strokeDasharray: '3 3' }}
                />
                <Scatter 
                  data={tariffData} 
                  fill="#8884d8"
                >
                  {tariffData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={getTariffColor(entry.tariffRate)}
                      stroke={getTariffColor(entry.tariffRate)}
                      strokeWidth={1}
                      // Enhanced bubble sizing to make the volume representation clearer
                      radius={Math.max(4, Math.sqrt(entry.volume) / 1.5)} 
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <TariffLegend />
      <TariffInsights />
    </div>
  );
};

export default TariffHeatmap;
